export type AbilityKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type ChoiceType =
  | 'SKILL_PROFICIENCY'
  | 'TOOL_PROFICIENCY'
  | 'INSTRUMENT_PROFICIENCY'
  | 'SKILL_EXPERTISE'
  | 'SKILL_PROFICIENCY_OR_EXPERTISE'
  | 'ABILITY_SCORE_INCREASE'
  | 'SAVING_THROW_PROFICIENCY'
  | 'WEAPON_MASTERY'
  | 'COMBAT_MANEUVER'
  | 'COMBAT_TECHNIQUE'
  | 'ORIGIN_FEAT'
  | 'GENERAL_FEAT'
  | 'ANIMAL_COMPANION'
  | 'PRIMARY_ABILITY'
  | 'DAMAGE_RESISTANCE';

export type ProficiencyCategory =
  | 'ARMOR'
  | 'SHIELD'
  | 'WEAPON'
  | 'SKILL'
  | 'TOOL'
  | 'INSTRUMENT'
  | 'SAVING_THROW';

export interface StatRequirement {
  stat: AbilityKey;
  value: number;
}

export interface ProficiencyRequirement {
  category: ProficiencyCategory;
  value: string;
}

export interface CompendiumPrerequisites {
  minLevel?: number;
  minStats?: StatRequirement[];
  requiredProficiencies?: ProficiencyRequirement[];
  customText?: string;
}

export interface CompendiumChoice {
  id: string;
  label: string;
  type: ChoiceType;
  count: number;
  amount?: number; // e.g. +1 or +2 for ABILITY_SCORE_INCREASE
  allowedOptions?: string[]; // Empty or ['ANY'] means any valid option from that catalog
  restrictToProficient?: boolean; // e.g. Expertise requires existing proficiency
  notes?: string;
}

export interface FixedProficiencyGrant {
  category: ProficiencyCategory;
  value: string;
}

export interface CompendiumDirectGrants {
  speedBonus?: number; // e.g., +5 or +10 feet
  hpPerLevelBonus?: number; // e.g., +1 (Robusto) or +2 (Duro)
  initiativeProficiency?: boolean; // e.g., Alerta
  initiativeAdvantage?: boolean; // e.g., Asesino / Hombre de Armas / Salvaje
  heroicInspirationOnLongRest?: boolean; // e.g., Ingenioso
  criticalHitRange?: number; // e.g., 19 or 18
  fixedProficiencies?: FixedProficiencyGrant[];
}

export interface FeatureBlock {
  title: string;
  description: string;
}

export const COMPENDIUM_CATALOGS = {
  systemRules: {
    race: 'Humano',
    multiclassingAllowed: false,
    maxCharacterLevel: 12,
    initialTraitPoints: 4,
    initialOriginFeats: 1,
    archetypeSelectionLevel: 3,
    archetypeProgressionGlobalLevels: [3, 6, 10],
    generalFeatGlobalLevels: [4, 8, 12],
  },
  abilities: [
    { key: 'STR', name: 'Fuerza', short: 'FUE' },
    { key: 'DEX', name: 'Destreza', short: 'DES' },
    { key: 'CON', name: 'Constitución', short: 'CON' },
    { key: 'INT', name: 'Inteligencia', short: 'INT' },
    { key: 'WIS', name: 'Sabiduría', short: 'SAB' },
    { key: 'CHA', name: 'Carisma', short: 'CAR' },
  ],
  skills: [
    { key: 'acrobacias', name: 'Acrobacias', ability: 'DEX' },
    { key: 'arcana', name: 'Arcana', ability: 'INT' },
    { key: 'atletismo', name: 'Atletismo', ability: 'STR' },
    { key: 'engano', name: 'Engaño', ability: 'CHA' },
    { key: 'historia', name: 'Historia', ability: 'INT' },
    { key: 'interpretacion', name: 'Interpretación', ability: 'CHA' },
    { key: 'intimidacion', name: 'Intimidación', ability: 'CHA' },
    { key: 'investigacion', name: 'Investigación', ability: 'INT' },
    { key: 'juego_de_manos', name: 'Juego de Manos', ability: 'DEX' },
    { key: 'medicina', name: 'Medicina', ability: 'WIS' },
    { key: 'naturaleza', name: 'Naturaleza', ability: 'INT' },
    { key: 'percepcion', name: 'Percepción', ability: 'WIS' },
    { key: 'perspicacia', name: 'Perspicacia', ability: 'WIS' },
    { key: 'persuasion', name: 'Persuasión', ability: 'CHA' },
    { key: 'religion', name: 'Religión', ability: 'INT' },
    { key: 'sigilo', name: 'Sigilo', ability: 'DEX' },
    { key: 'supervivencia', name: 'Supervivencia', ability: 'WIS' },
    { key: 'trato_con_animales', name: 'Trato con Animales', ability: 'WIS' },
  ],
  tools: [
    { key: 'material_alquimico', name: 'Material Alquímico' },
    { key: 'material_curacion', name: 'Material de Curación' },
    { key: 'herramientas_artesano', name: 'Herramientas de Artesano' },
    { key: 'herramientas_ladron', name: 'Herramientas de Ladrón' },
    { key: 'instrumento_musical', name: 'Instrumento Musical' },
    { key: 'herramientas_navegacion', name: 'Herramientas de Navegación' },
    { key: 'kit_herboristeria', name: 'Kit de Herboristería' },
    { key: 'kit_disfraz', name: 'Kit de Disfraz' },
    { key: 'kit_falsificacion', name: 'Kit de Falsificación' },
    { key: 'kit_venenos', name: 'Kit de Envenenador' },
  ],
  armors: [
    { key: 'armadura_ligera', name: 'Armadura Ligera' },
    { key: 'armadura_media', name: 'Armadura Media' },
    { key: 'armadura_pesada', name: 'Armadura Pesada' },
    { key: 'escudos', name: 'Escudos' },
  ],
  weapons: [
    { key: 'armas_simples', name: 'Armas Simples' },
    { key: 'armas_marciales', name: 'Armas Marciales' },
    { key: 'armas_marciales_sutileza', name: 'Armas Marciales con Sutileza' },
    { key: 'armas_improvisadas', name: 'Armas Improvisadas' },
  ],
  damageTypes: [
    { key: 'contundente', name: 'Contundente' },
    { key: 'cortante', name: 'Cortante' },
    { key: 'perforante', name: 'Perforante' },
    { key: 'veneno', name: 'Veneno' },
  ],
  choiceTypes: [
    { key: 'SKILL_PROFICIENCY', label: 'Competencia en Habilidad' },
    { key: 'TOOL_PROFICIENCY', label: 'Competencia en Herramienta' },
    { key: 'INSTRUMENT_PROFICIENCY', label: 'Competencia en Instrumento Musical' },
    { key: 'SKILL_EXPERTISE', label: 'Pericia en Habilidad' },
    {
      key: 'SKILL_PROFICIENCY_OR_EXPERTISE',
      label: 'Competencia en Habilidad (o Pericia si ya es competente)',
    },
    { key: 'ABILITY_SCORE_INCREASE', label: 'Aumento de Característica' },
    { key: 'SAVING_THROW_PROFICIENCY', label: 'Competencia en Tirada de Salvación' },
    { key: 'WEAPON_MASTERY', label: 'Maestría de Armas' },
    { key: 'COMBAT_MANEUVER', label: 'Maniobra de Combate' },
    { key: 'COMBAT_TECHNIQUE', label: 'Técnica de Combate' },
    { key: 'ORIGIN_FEAT', label: 'Dote de Origen Adicional' },
    { key: 'GENERAL_FEAT', label: 'Dote General' },
    { key: 'ANIMAL_COMPANION', label: 'Compañero Animal (Terrestre / Aéreo)' },
    { key: 'PRIMARY_ABILITY', label: 'Característica Principal (INT / SAB / CAR)' },
    { key: 'DAMAGE_RESISTANCE', label: 'Resistencia a Tipo de Daño' },
  ],
};
