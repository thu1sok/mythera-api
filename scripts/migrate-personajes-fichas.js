/**
 * BRIEFING-JUGADORES §8.2: cada ficha (charactersheets) pasa a colgar de un
 * personaje (characters).
 *
 * Por cada ficha sin characterId:
 *   - Se crea un personaje con su identidad: nombre, edad, genero, retrato
 *     y la descripcion como trasfondo. El jugador es el playerId de la ficha
 *     (y playerName, que de momento sigue existiendo, su nombre).
 *   - La ficha se enlaza con characterId, se marca completed: true y se le
 *     quitan name, age, gender, portraitUrl, description y playerId.
 *
 * Los personajes que ya habia en 'characters' NO se tocan.
 *
 * Al final: se borra el indice viejo de playerId y se crea el unico de
 * characterId (asi no hace falta reiniciar el API para tenerlo).
 *
 * Solo contra la base local. Sin --apply no escribe nada (simulacro). Con
 * --apply guarda antes una copia en ~/Documents/mythera-docs/backups-AAAAMMDD/.
 *
 *   MONGODB_URI=mongodb://localhost:27017/test node scripts/migrate-personajes-fichas.js
 *   MONGODB_URI=mongodb://localhost:27017/test node scripts/migrate-personajes-fichas.js --apply
 */
require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const QUITAR = ['name', 'age', 'gender', 'portraitUrl', 'description', 'playerId'];

function assertLocal(uri) {
  const host = uri.replace(/^mongodb(\+srv)?:\/\/([^@]*@)?/, '').split(/[/:?]/)[0];
  if (!['localhost', '127.0.0.1'].includes(host)) {
    throw new Error(`Este script solo se ejecuta contra la base local. Host: ${host}`);
  }
}

async function main() {
  const apply = process.argv.includes('--apply');
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta MONGODB_URI');
  assertLocal(uri);

  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const players = await db.collection('players').find().toArray();
  const sheets = await db.collection('charactersheets').find().toArray();
  const playerById = new Map(players.map((p) => [p._id.toString(), p]));

  console.log(apply ? 'APLICANDO' : 'SIMULACRO (usa --apply para escribir)');
  const ops = [];
  const problemas = [];

  for (const s of sheets) {
    const etiqueta = `${s.name ?? '(sin nombre)'} [${s._id}]`;
    if (s.characterId) {
      console.log(`  = ${etiqueta}: ya enlazada a ${s.characterId}, se salta`);
      continue;
    }
    const player = playerById.get(String(s.playerId));
    if (!player) {
      problemas.push(`${etiqueta}: su playerId (${s.playerId}) no existe en players`);
      continue;
    }
    if (!s.name) {
      problemas.push(`${etiqueta}: no tiene nombre`);
      continue;
    }

    const characterId = new ObjectId();
    const personaje = {
      _id: characterId,
      characterName: s.name,
      playerName: player.name,
      playerId: player._id,
      age: s.age ?? '',
      ...(s.gender ? { gender: s.gender } : {}),
      ...(s.portraitUrl ? { imageUrl: s.portraitUrl } : {}),
      backstory: s.description ?? '',
      deitiesIds: [],
      isDead: false,
      eventsAndAchievements: [],
      plotItems: [],
      __v: 0,
    };
    console.log(`  + ${etiqueta} · ${player.name}`);
    console.log(`      personaje ${characterId}: edad "${personaje.age}", genero ${personaje.gender ?? '-'}, retrato ${personaje.imageUrl ? 'si' : 'no'}, trasfondo "${personaje.backstory}"`);
    console.log(`      ficha: characterId, completed true, sin ${QUITAR.join(', ')}`);
    ops.push(() => db.collection('characters').insertOne(personaje));
    ops.push(() =>
      db.collection('charactersheets').updateOne(
        { _id: s._id },
        {
          $set: { characterId, completed: true },
          $unset: Object.fromEntries(QUITAR.map((k) => [k, ''])),
        },
      ),
    );
  }

  if (problemas.length) {
    console.log('\nPROBLEMAS (no se aplica nada):');
    for (const p of problemas) console.log(`  - ${p}`);
  }
  if (!apply) {
    console.log(`\n${ops.length} escrituras preparadas, mas los indices. Nada escrito.`);
    return;
  }
  if (problemas.length) throw new Error('Hay problemas: no se aplica nada.');

  const dir = path.join(os.homedir(), 'Documents', 'mythera-docs', `backups-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`);
  fs.mkdirSync(dir, { recursive: true });
  const characters = await db.collection('characters').find().toArray();
  const file = path.join(dir, `personajes-fichas-${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify({ players, characters, charactersheets: sheets }, null, 2));
  console.log(`\nCopia en ${file}`);

  for (const op of ops) await op();

  const sheetsCol = db.collection('charactersheets');
  const indices = await sheetsCol.indexes();
  if (indices.some((i) => i.name === 'playerId_1')) {
    await sheetsCol.dropIndex('playerId_1');
    console.log('Indice playerId_1 borrado');
  }
  await sheetsCol.createIndex({ characterId: 1 }, { unique: true, name: 'characterId_1' });
  console.log('Indice unico characterId_1 creado');
  console.log(`${ops.length} escrituras hechas.`);
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
