/**
 * Migra las fichas de personaje al equipo del documento EQUIPO Y TESOROS.
 *
 * Toca dos campos de cada ficha:
 *   - equipment[].itemSlug
 *   - build.weaponMasterySlugs (son slugs de ARMAS de compendiumitems, no
 *     claves de maestria: se migran con el mismo mapeo que el equipo)
 *
 * Reglas:
 *   - Si el slug existe en compendiumitems, se queda.
 *   - Si tiene equivalente en ITEM_MAP, se renombra.
 *   - Si no, se QUITA. No se inventan equivalencias.
 *
 * Solo contra la base local. Sin --apply no escribe nada (simulacro).
 *
 *   MONGODB_URI=mongodb://localhost:27017/test node scripts/migrate-equipo-mesa.js
 *   MONGODB_URI=mongodb://localhost:27017/test node scripts/migrate-equipo-mesa.js --apply
 */
require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const mongoose = require('mongoose');

// Slug viejo (seed del SRD) -> slug nuevo (seed de la mesa).
// Los ocho primeros vienen del documento; el resto son el mismo objeto con
// el mismo nombre y las mismas estadisticas, solo cambia el slug.
const ITEM_MAP = {
  'armadura-de-cuero-tachonado': 'cuero-reforzado',
  'armadura-cota-de-escamas': 'escamas',
  'armadura-de-bandas': 'armadura-laminada',
  'armadura-media-placa': 'media-armadura',
  cimitarra: 'espada-curva',
  mazo: 'gran-martillo',
  'hacha-de-batalla': 'hacha-de-guerra',
  clava: 'garrote-pesado',

  'armadura-acolchada': 'acolchada',
  'armadura-de-cuero': 'cuero',
  'armadura-camisa-de-malla': 'camisa-de-malla',
  'armadura-coraza': 'coraza',
  'armadura-de-pieles': 'pieles',
  'armadura-cota-de-anillas': 'cota-de-anillas',
  'armadura-cota-de-malla': 'cota-de-malla',
  virotes: 'virotes-de-ballesta',
};

const MIN_ITEMS = 20;

function assertLocal(uri) {
  const host = uri.replace(/^mongodb(\+srv)?:\/\/([^@]*@)?/, '').split(/[/:?]/)[0];
  if (!['localhost', '127.0.0.1'].includes(host)) {
    throw new Error(`Este script solo se ejecuta contra la base local. Host: ${host}`);
  }
}

function migrateSheet(sheet, valid) {
  const removed = [];
  const renamed = [];

  const equipment = [];
  for (const entry of sheet.equipment ?? []) {
    let slug = entry.itemSlug;
    if (!valid.has(slug)) {
      const to = ITEM_MAP[slug];
      if (to && valid.has(to)) {
        renamed.push(`${slug} -> ${to}`);
        slug = to;
      } else {
        removed.push(`equipo: ${slug} (x${entry.quantity})`);
        continue;
      }
    }
    const dup = equipment.find((e) => e.itemSlug === slug);
    if (dup) {
      dup.quantity += entry.quantity;
      dup.equipped = dup.equipped || entry.equipped;
    } else {
      equipment.push({ ...entry, itemSlug: slug });
    }
  }

  const masteries = [];
  for (const slug of sheet.build?.weaponMasterySlugs ?? []) {
    let to = slug;
    if (!valid.has(slug)) {
      to = ITEM_MAP[slug] && valid.has(ITEM_MAP[slug]) ? ITEM_MAP[slug] : null;
      if (to) renamed.push(`maestria: ${slug} -> ${to}`);
      else removed.push(`maestria: ${slug}`);
    }
    if (to && !masteries.includes(to)) masteries.push(to);
  }

  return { equipment, masteries, removed, renamed };
}

async function main() {
  const apply = process.argv.includes('--apply');
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta MONGODB_URI');
  assertLocal(uri);

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const items = await db.collection('compendiumitems').find({}, { projection: { slug: 1 } }).toArray();
  if (items.length < MIN_ITEMS) {
    throw new Error(`compendiumitems solo tiene ${items.length} objetos. ¿Se ha sembrado el compendio?`);
  }
  const valid = new Set(items.map((i) => i.slug));

  const sheetsCol = db.collection('charactersheets');
  const sheets = await sheetsCol.find({}).toArray();

  if (apply) {
    const dir = path.join(os.homedir(), 'Documents', 'mythera-docs', `backups-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `charactersheets-antes-de-equipo-mesa-${Date.now()}.json`);
    fs.writeFileSync(file, JSON.stringify(sheets, null, 2));
    console.log(`Copia de las fichas: ${file}`);
  }

  console.log(apply ? 'APLICANDO' : 'SIMULACRO (usa --apply para escribir)');
  for (const sheet of sheets) {
    const r = migrateSheet(sheet, valid);
    console.log(`\n== ${sheet.name}`);
    console.log(`   renombrado: ${r.renamed.join(', ') || 'nada'}`);
    console.log(`   quitado:    ${r.removed.join(', ') || 'nada'}`);
    if (apply && (r.renamed.length || r.removed.length)) {
      await sheetsCol.updateOne(
        { _id: sheet._id },
        { $set: { equipment: r.equipment, 'build.weaponMasterySlugs': r.masteries } },
      );
    }
  }

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e.message);
  await mongoose.disconnect();
  process.exit(1);
});
