/**
 * Integridad del seed: toda clave de `allowedOptions` tiene que existir en la
 * lista de la que el creador saca las opciones de ese tipo.
 *
 * Si no existe, el creador filtra la opción y no la ofrece. Si no queda
 * ninguna, el desplegable sale vacío y no se abre: así estuvo el Compañero
 * Animal del Alimañero desde el seed del 6 de noviembre de 2026 (permitía
 * 'animal_terrestre' y el apéndice se llama 'animal-terrestre').
 *
 * Las listas de abajo son las mismas que usa el front para construir las
 * opciones (baseOptionsForType en el creador de personajes). Si allí cambia
 * de dónde sale un tipo, se cambia aquí también.
 */
import {
  COMPENDIUM_CATALOGS,
  ChoiceType,
  CompendiumChoice,
} from '../../schema/wiki/compendium/compendium-mechanics.types';
import { DEFAULT_COMBAT_TECHNIQUES } from './combat-techniques.seed';
import { DEFAULT_GENERAL_FEATS } from './general-feats.seed';
import { DEFAULT_HUMAN_TRAITS } from './human-traits.seed';
import { ITEMS_SEED } from './items.seed';
import { DEFAULT_ORIGIN_FEATS } from './origin-feats.seed';
import { DEFAULT_RACES } from './races.seed';
import {
  DEFAULT_ARCHETYPES,
  DEFAULT_STYLES,
} from './styles-and-archetypes.seed';

const keys = (list: readonly { key: string }[]) => list.map((x) => x.key);
const slugs = (list: readonly { slug?: string }[]) =>
  list.map((x) => x.slug).filter((s): s is string => !!s);

const { abilities, skills, tools, damageTypes } = COMPENDIUM_CATALOGS;

const appendixSlugs = (
  type: string,
  field: 'maneuvers' | 'companionStats',
  onlySlug?: string,
): string[] =>
  DEFAULT_ARCHETYPES.filter((a) => !onlySlug || a.slug === onlySlug).flatMap(
    (a) => {
      const appendix = a.appendix as
        | {
            type?: string;
            maneuvers?: { slug?: string }[];
            companionStats?: { slug?: string }[];
          }
        | undefined;
      return appendix?.type === type ? slugs(appendix[field] ?? []) : [];
    },
  );

/** De dónde sale cada tipo de elección, como en el front. */
const OPTIONS: Record<ChoiceType, readonly string[]> = {
  SKILL_PROFICIENCY: keys(skills),
  SKILL_EXPERTISE: keys(skills),
  SKILL_PROFICIENCY_OR_EXPERTISE: keys(skills),
  TOOL_PROFICIENCY: keys(tools),
  SKILL_OR_TOOL_PROFICIENCY: [...keys(skills), ...keys(tools)],
  // Obsoleto: el front ya no le da opciones. Una elección de este tipo con claves concretas no se podría cumplir.
  INSTRUMENT_PROFICIENCY: [],
  WEAPON_MASTERY: slugs(ITEMS_SEED.filter((i) => i.category === 'WEAPON')),
  ORIGIN_FEAT: slugs(DEFAULT_ORIGIN_FEATS),
  GENERAL_FEAT: slugs(DEFAULT_GENERAL_FEATS),
  COMBAT_TECHNIQUE: slugs(DEFAULT_COMBAT_TECHNIQUES),
  // El front saca las maniobras del apéndice del Combatiente.
  COMBAT_MANEUVER: appendixSlugs(
    'COMBAT_MANEUVERS',
    'maneuvers',
    'combatiente',
  ),
  ANIMAL_COMPANION: appendixSlugs('ANIMAL_COMPANION', 'companionStats'),
  ABILITY_SCORE_INCREASE: keys(abilities),
  SAVING_THROW_PROFICIENCY: keys(abilities),
  PRIMARY_ABILITY: keys(abilities),
  DAMAGE_RESISTANCE: keys(damageTypes),
};

const CHOICE_TYPES = new Set(Object.keys(OPTIONS));

const isChoice = (o: unknown): o is CompendiumChoice =>
  typeof o === 'object' &&
  o !== null &&
  typeof (o as CompendiumChoice).id === 'string' &&
  typeof (o as CompendiumChoice).count === 'number' &&
  CHOICE_TYPES.has((o as CompendiumChoice).type);

/** Todas las elecciones de un documento, estén donde estén (choices, progression, features...). */
function choicesIn(
  node: unknown,
  path: string,
  out: { path: string; choice: CompendiumChoice }[],
): void {
  if (Array.isArray(node)) {
    node.forEach((n) => choicesIn(n, path, out));
    return;
  }
  if (typeof node !== 'object' || node === null) return;
  if (isChoice(node)) out.push({ path, choice: node });
  for (const value of Object.values(node)) choicesIn(value, path, out);
}

const SOURCES: [string, readonly { slug?: string }[]][] = [
  ['raza', DEFAULT_RACES],
  ['rasgo', DEFAULT_HUMAN_TRAITS],
  ['dote de origen', DEFAULT_ORIGIN_FEATS],
  ['dote general', DEFAULT_GENERAL_FEATS],
  ['técnica', DEFAULT_COMBAT_TECHNIQUES],
  ['estilo', DEFAULT_STYLES],
  ['arquetipo', DEFAULT_ARCHETYPES],
];

const ALL = SOURCES.flatMap(([kind, docs]) => {
  const out: { path: string; choice: CompendiumChoice }[] = [];
  for (const doc of docs) choicesIn(doc, `${kind} ${doc.slug}`, out);
  return out;
});

describe('seed: las claves de allowedOptions existen', () => {
  it('encuentra las elecciones del seed (si no, el recorrido está mal y el test no prueba nada)', () => {
    expect(ALL.length).toBeGreaterThan(50);
    expect(
      ALL.some(({ choice }) => choice.id === 'alimanero_lv3_companion_type'),
    ).toBe(true);
  });

  it('cada tipo tiene de dónde sacar opciones', () => {
    const empty = Object.entries(OPTIONS)
      .filter(
        ([type, list]) =>
          type !== 'INSTRUMENT_PROFICIENCY' && list.length === 0,
      )
      .map(([type]) => type);
    expect(empty).toEqual([]);
  });

  it('toda clave permitida es una opción de su tipo', () => {
    const wrong: string[] = [];
    for (const { path, choice } of ALL) {
      const allowed = choice.allowedOptions ?? [];
      if (allowed.length === 0 || allowed.includes('ANY')) continue;
      const valid = new Set(OPTIONS[choice.type]);
      for (const key of allowed) {
        if (!valid.has(key))
          wrong.push(`${path} · ${choice.id} (${choice.type}): '${key}'`);
      }
    }
    expect(wrong).toEqual([]);
  });
});
