/**
 * Lo que se acepta al crear un tipo de herida. Las categorias son la lista
 * cerrada de los modificadores (ver el front, core/rules/modifiers.ts): una
 * linea que no tiene sentido se rechaza aqui para que el catalogo no guarde
 * basura que luego no hace nada en las fichas.
 */
import { ModifierCategory, ModifierLine } from '../schema/wiki/character-sheet.schema';

const ABILITIES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

/** Que pide cada categoria: objetivo y si admite Ventaja o Desventaja. */
const CATEGORIES: Record<ModifierCategory, { target: 'ability' | 'skill' | null; dice: boolean }> = {
  abilityScore: { target: 'ability', dice: false },
  abilityModifier: { target: 'ability', dice: true },
  save: { target: 'ability', dice: true },
  skill: { target: 'skill', dice: true },
  armorClass: { target: null, dice: false },
  speed: { target: null, dice: false },
  initiative: { target: null, dice: true },
  attack: { target: null, dice: true },
  damage: { target: null, dice: false },
  hitPointsMax: { target: null, dice: false },
};

export interface WoundTypeInput {
  name: string;
  description: string;
  modifiers: ModifierLine[];
  untilLongRest: boolean;
}

/** Devuelve el tipo limpio, o un texto con lo que falla. */
export function validateWoundType(raw: unknown): WoundTypeInput | string {
  if (!raw || typeof raw !== 'object') return 'Falta el tipo de herida.';
  const r = raw as Record<string, unknown>;
  const name = typeof r.name === 'string' ? r.name.trim() : '';
  if (!name) return 'Falta el nombre.';
  if (!Array.isArray(r.modifiers) || r.modifiers.length === 0) return 'Hace falta al menos una línea.';
  const modifiers: ModifierLine[] = [];
  for (const [i, m] of r.modifiers.entries()) {
    const line = cleanLine(m);
    if (!line) return `La línea ${i + 1} no tiene sentido.`;
    modifiers.push(line);
  }
  return {
    name,
    description: typeof r.description === 'string' ? r.description.trim() : '',
    modifiers,
    untilLongRest: r.untilLongRest === true,
  };
}

function cleanLine(m: unknown): ModifierLine | null {
  if (!m || typeof m !== 'object') return null;
  const l = m as Record<string, unknown>;
  const def = CATEGORIES[l.category as ModifierCategory];
  if (!def) return null;
  const effect = l.effect;
  const okEffect =
    effect === 'advantage' || effect === 'disadvantage'
      ? def.dice
      : typeof effect === 'number' && Number.isInteger(effect) && effect !== 0;
  if (!okEffect) return null;
  const target = typeof l.target === 'string' ? l.target : undefined;
  if (def.target === 'ability' && !ABILITIES.includes(target ?? '')) return null;
  if (def.target === 'skill' && !target) return null;
  const category = l.category as ModifierCategory;
  return def.target ? { category, target, effect: effect as ModifierLine['effect'] } : { category, effect: effect as ModifierLine['effect'] };
}
