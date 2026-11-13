
export type AbilityKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type ChoiceType =
  | 'SKILL_PROFICIENCY'
  | 'TOOL_PROFICIENCY'
  | 'INSTRUMENT_PROFICIENCY'
  | 'SKILL_EXPERTISE'
  | 'SKILL_PROFICIENCY_OR_EXPERTISE'
  | 'SKILL_OR_TOOL_PROFICIENCY'
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
  /**
   * Media competencia en las habilidades en las que NO tengas competencia
   * (Erudito, 'Conocimientos generales'). No es un nivel de competencia de
   * una habilidad concreta: se aplica a todas las que te falten.
   */
  halfProficiencyOnUntrainedSkills?: boolean;
  criticalHitRange?: number; // e.g., 19 or 18
  fixedProficiencies?: FixedProficiencyGrant[];

  // --- Técnicas de Combate ---
  rangedAttackBonus?: number; // +2 a las tiradas de ataque a distancia (Tiro con Arco)
  acBonusWhileArmored?: number; // +1 a la CA llevando armadura (Defensa)
  duelingDamageBonus?: number; // +2 al daño con un arma a una mano y nada más (Duelo)
  thrownDamageBonus?: number; // +2 al daño con armas Arrojadizas
  blindsight?: number; // percepción sin vista, en pies (Combate a Ciegas)

  // --- Raza ---
  size?: string; // 'Mediano'
  baseSpeed?: number; // en pies, para que speedBonus sume sobre ella
  languages?: string[]; // ['Común']
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
    /**
     * Con lo que empieza un personaje de nivel 1, en piezas de oro. Para
     * situarlo: espada larga 15, escudo 10, armadura de cuero 10, cota de
     * malla 75, paquete de explorador 10.
     */
    startingGold: 100,
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
    { key: 'equipo_aventurero', name: 'Equipo de Aventurero' },
    { key: 'herramientas_artesano', name: 'Herramientas de Artesano' },
    { key: 'herramientas_ladron', name: 'Herramientas de Ladrón' },
    { key: 'instrumento_musical', name: 'Instrumentos Musicales' },
    { key: 'material_alquimico', name: 'Material Alquímico' },
    { key: 'material_curacion', name: 'Material de Curación' },
  ],
  armors: [
    { key: 'armadura_ligera', name: 'Armadura Ligera' },
    { key: 'armadura_media', name: 'Armadura Media' },
    { key: 'armadura_pesada', name: 'Armadura Pesada' },
    { key: 'escudos', name: 'Escudos' },
  ],
  // Grupos de competencia. Los usa fixedProficiencies y no se tocan.
  weapons: [
    { key: 'armas_simples', name: 'Armas Simples' },
    { key: 'armas_marciales', name: 'Armas Marciales' },
    { key: 'armas_marciales_sutileza', name: 'Armas Marciales con Sutileza' },
    { key: 'armas_improvisadas', name: 'Armas Improvisadas' },
  ],
  // Las ocho Propiedades de Maestria, del documento EQUIPO Y TESOROS.
  // Cada arma apunta a una por su clave. Las armas concretas NO viven aqui,
  // viven en la coleccion compendiumitems.
  masteries: [
    {
      key: 'acoso',
      name: 'Acoso',
      description:
        'Cuando impactas a una criatura con un arma que posee esta propiedad y le infliges daño, obtienes Ventaja en tu siguiente tirada de ataque contra esa misma criatura, siempre que la realices antes de finalizar tu próximo turno. La Ventaja se consume al realizar la tirada, independientemente de si el ataque impacta o falla.',
    },
    {
      key: 'ataque-rapido',
      name: 'Ataque Rápido',
      description:
        'Cuando realizas el ataque adicional permitido por la propiedad Ligera utilizando un arma que posee esta Maestría, puedes efectuarlo como parte de la misma Acción Atacar, en lugar de utilizar una Acción Adicional. Solo puedes realizar este ataque adicional una vez por turno.',
    },
    {
      key: 'derribo',
      name: 'Derribo',
      description:
        'Cuando impactas a una criatura con un arma que posee esta propiedad, puedes obligarla a realizar una Tirada de Salvación de Constitución. La CD es igual a 8 + tu Bonificador de Competencia + el modificador de característica utilizado para realizar el ataque. Si falla la salvación, la criatura queda Derribada.',
    },
    {
      key: 'desequilibrar',
      name: 'Desequilibrar',
      description:
        'Cuando impactas a una criatura con un arma que posee esta propiedad, puedes imponerle Desventaja en su siguiente tirada de ataque, siempre que la realice antes del comienzo de tu próximo turno.',
    },
    {
      key: 'empuje',
      name: 'Empuje',
      description:
        'Cuando impactas a una criatura con un arma que posee esta propiedad, puedes empujarla hasta 10 pies en dirección opuesta a ti.',
    },
    {
      key: 'frenar',
      name: 'Frenar',
      description:
        'Cuando impactas a una criatura con un arma que posee esta propiedad y le infliges daño, puedes reducir su Velocidad en 10 pies hasta el comienzo de tu próximo turno. Una criatura no puede sufrir una reducción superior a 10 pies por esta propiedad, aunque reciba varios impactos.',
    },
    {
      key: 'hendedura',
      name: 'Hendedura',
      description:
        'Cuando impactas a una criatura con un ataque cuerpo a cuerpo utilizando un arma que posee esta propiedad, puedes realizar inmediatamente otra tirada de ataque con la misma arma contra una segunda criatura situada a 5 pies o menos de la primera y dentro de tu alcance. Si el segundo ataque impacta, infliges el daño normal del arma, pero sin añadir un modificador de característica positivo al daño. Puedes utilizar Hendedura una vez por turno.',
    },
    {
      key: 'refilon',
      name: 'Refilón',
      description:
        'Cuando fallas una tirada de ataque con un arma que posee esta propiedad, infliges al objetivo una cantidad de daño igual al modificador de característica utilizado para realizar el ataque. Este daño es del mismo tipo que el arma. Si el modificador es 0 o negativo, no infliges daño. El ataque sigue considerándose fallido y no activa otros efectos que requieran impactar.',
    },
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
    { key: 'SKILL_EXPERTISE', label: 'Pericia en Habilidad' },
    {
      key: 'SKILL_PROFICIENCY_OR_EXPERTISE',
      label: 'Competencia en Habilidad (o Pericia si ya es competente)',
    },
    {
      key: 'SKILL_OR_TOOL_PROFICIENCY',
      label: 'Competencia en Habilidad o Herramienta',
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
