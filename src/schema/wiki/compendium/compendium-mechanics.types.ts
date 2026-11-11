
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
  // Grupos de competencia. Los usa fixedProficiencies y no se tocan.
  weapons: [
    { key: 'armas_simples', name: 'Armas Simples' },
    { key: 'armas_marciales', name: 'Armas Marciales' },
    { key: 'armas_marciales_sutileza', name: 'Armas Marciales con Sutileza' },
    { key: 'armas_improvisadas', name: 'Armas Improvisadas' },
  ],
  // Las ocho Propiedades de Maestria del SRD 5.2. Son una lista fija, como
  // los tipos de dano: cada arma apunta a una por su clave. Las armas
  // concretas NO viven aqui, viven en la coleccion compendiumitems.
  // Fuente: SRD 5.2 (CC BY 4.0). Traduccion propia.
  masteries: [
    {
      key: 'hendidura',
      name: 'Hendidura',
      original: 'Cleave',
      description:
        'Al impactar con un ataque cuerpo a cuerpo con esta arma, puedes realizar un ataque adicional con ella contra otra criatura situada a 5 pies o menos de la primera y dentro de tu alcance. Si impactas, infliges el dano del arma sin anadir tu modificador de caracteristica, salvo que sea negativo. Una vez por turno.',
    },
    {
      key: 'roce',
      name: 'Roce',
      original: 'Graze',
      description:
        'Si tu tirada de ataque con esta arma falla, el objetivo recibe igualmente dano igual al modificador de caracteristica que usaste para atacar. El tipo de dano es el del arma.',
    },
    {
      key: 'tajo',
      name: 'Tajo',
      original: 'Nick',
      description:
        'El ataque adicional que concede la propiedad Ligera puedes realizarlo como parte de la accion Atacar en vez de como Accion Adicional. Una vez por turno.',
    },
    {
      key: 'empuje',
      name: 'Empuje',
      original: 'Push',
      description:
        'Al impactar, puedes empujar al objetivo hasta 10 pies en linea recta alejandolo de ti, siempre que sea de tamano Grande o menor.',
    },
    {
      key: 'mella',
      name: 'Mella',
      original: 'Sap',
      description:
        'Al impactar, el objetivo tiene Desventaja en su siguiente tirada de ataque antes del comienzo de tu proximo turno.',
    },
    {
      key: 'lentitud',
      name: 'Lentitud',
      original: 'Slow',
      description:
        'Al impactar causando dano, puedes reducir la Velocidad del objetivo en 10 pies hasta el comienzo de tu proximo turno. Varios impactos no la reducen mas de 10 pies en total.',
    },
    {
      key: 'derribo',
      name: 'Derribo',
      original: 'Topple',
      description:
        'Al impactar, puedes obligar al objetivo a realizar una salvacion de Constitucion con CD 8 + tu modificador de caracteristica + tu Bonificador de Competencia. Si falla, queda Derribado.',
    },
    {
      key: 'hostigamiento',
      name: 'Hostigamiento',
      original: 'Vex',
      description:
        'Al impactar causando dano, tienes Ventaja en tu siguiente tirada de ataque contra esa criatura antes del final de tu proximo turno.',
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
    { key: 'INSTRUMENT_PROFICIENCY', label: 'Competencia en Instrumento Musical' },
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
