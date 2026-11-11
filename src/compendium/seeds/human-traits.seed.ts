import { HumanTrait } from '../../schema/wiki/compendium/human-trait.schema';

export const DEFAULT_HUMAN_TRAITS: Partial<HumanTrait>[] = [
  // ==========================================
  // RASGOS DE 1 PUNTO
  // ==========================================
  {
    slug: 'habilidoso',
    name: 'Habilidoso',
    pointCost: 1,
    repeatable: true,
    isDefault: true,
    icon: 'handyman',
    description:
      'Obtienes competencia con una habilidad o herramienta de tu elección. Puedes elegir este rasgo varias veces, escogiendo una competencia diferente cada vez.',
    prerequisites: {},
    grants: {},
    choices: [
      {
        id: 'habilidoso_proficiency_choice',
        label: 'Elige una habilidad o herramienta en la que obtener competencia',
        type: 'SKILL_OR_TOOL_PROFICIENCY',
        count: 1,
        allowedOptions: ['ANY'],
        notes: 'Puede ser cualquier habilidad o herramienta del catálogo.',
      },
    ],
  },
  {
    slug: 'veloz-rasgo',
    name: 'Veloz',
    pointCost: 1,
    repeatable: false,
    isDefault: true,
    icon: 'directions_run',
    description: 'Tu Velocidad aumenta en 5 pies.',
    prerequisites: {},
    grants: {
      speedBonus: 5,
    },
    choices: [],
  },
  {
    slug: 'sabedor',
    name: 'Sabedor',
    pointCost: 1,
    repeatable: false,
    isDefault: true,
    icon: 'menu_book',
    description:
      'Tienes Ventaja en las pruebas de Inteligencia (Arcana, Historia, Naturaleza y Religión).',
    prerequisites: {},
    grants: {},
    choices: [],
  },

  // ==========================================
  // RASGOS DE 2 PUNTOS
  // ==========================================
  {
    slug: 'robusto',
    name: 'Robusto',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'favorite',
    description:
      'Tu máximo de Puntos de Golpe aumenta en 1 y vuelve a aumentar en 1 cada vez que subes de nivel.',
    prerequisites: {},
    grants: {
      hpPerLevelBonus: 1,
    },
    choices: [],
  },
  {
    slug: 'escurridizo',
    name: 'Escurridizo',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'compare_arrows',
    description:
      'Puedes moverte a través del espacio ocupado por cualquier criatura de tu mismo tamaño, incluso si es hostil.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'sigiloso',
    name: 'Sigiloso',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'visibility_off',
    description:
      'Puedes realizar la acción de Esconderte cuando dispones de Cobertura Media, en lugar de necesitar Tres Cuartos de Cobertura o Cobertura Completa.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'rudo',
    name: 'Rudo',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'health_and_safety',
    description:
      'Cuando tus Puntos de Golpe se reducen a 0 o por debajo de 0, pero sin morir instantáneamente, puedes permanecer a 1 Punto de Golpe. Recuperas el uso de este rasgo al finalizar un Descanso Largo.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'instintivo',
    name: 'Instintivo',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'bolt',
    description:
      'Cuando tiras Iniciativa, puedes moverte inmediatamente hasta la mitad de tu Velocidad, siempre que no tengas Desventaja en esa tirada.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'nocturno',
    name: 'Nocturno',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'dark_mode',
    description:
      'Cuando realices una prueba de Sabiduría (Percepción) que dependa de la vista mientras te encuentres en Luz Tenue, esta no te impone Desventaja.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'poderoso',
    name: 'Poderoso',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'fitness_center',
    description:
      'Tienes Ventaja en las pruebas de característica que realices para terminar con la condición Agarrado.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'vigilante',
    name: 'Vigilante',
    pointCost: 2,
    repeatable: false,
    isDefault: true,
    icon: 'visibility',
    description:
      'Puedes completar un Descanso Largo en 4 horas en lugar de 8, lo que te permite dedicar más tiempo a realizar guardias mientras tus compañeros descansan.',
    prerequisites: {},
    grants: {},
    choices: [],
  },

  // ==========================================
  // RASGOS DE 3 PUNTOS
  // ==========================================
  {
    slug: 'valiente',
    name: 'Valiente',
    pointCost: 3,
    repeatable: false,
    isDefault: true,
    icon: 'local_fire_department',
    description:
      'Tienes Ventaja en las Tiradas de Salvación para evitar o terminar la condición Asustado.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'resistente',
    name: 'Resistente',
    pointCost: 3,
    repeatable: false,
    isDefault: true,
    icon: 'health_and_safety',
    description:
      'Tienes Ventaja en las Tiradas de Salvación para evitar o terminar la condición Envenenado.',
    prerequisites: {},
    grants: {},
    choices: [],
  },
  {
    slug: 'ingenioso',
    name: 'Ingenioso',
    pointCost: 3,
    repeatable: false,
    isDefault: true,
    icon: 'wb_incandescent',
    description: 'Obtienes Inspiración Heroica al finalizar un Descanso Largo.',
    prerequisites: {},
    grants: {
      heroicInspirationOnLongRest: true,
    },
    choices: [],
  },
  {
    slug: 'afortunado',
    name: 'Afortunado',
    pointCost: 3,
    repeatable: false,
    isDefault: true,
    icon: 'casino',
    description:
      'Cuando obtienes un 1 natural en una Prueba de d20, puedes repetir la tirada y debes utilizar el nuevo resultado. Si se trata de un ataque con arma, esta no sufre deterioro por el resultado original, salvo que la nueva tirada también sea un 1 natural.',
    prerequisites: {},
    grants: {},
    choices: [],
  },

  // ==========================================
  // RASGOS DE 4 PUNTOS
  // ==========================================
  {
    slug: 'experimentado',
    name: 'Experimentado',
    pointCost: 4,
    repeatable: false,
    isDefault: true,
    icon: 'workspace_premium',
    description:
      'Obtienes una Dote de Origen adicional de tu elección. Este rasgo consume los 4 puntos disponibles para adquirir Rasgos Humanos.',
    prerequisites: {},
    grants: {},
    choices: [
      {
        id: 'experimentado_extra_origin_feat',
        label: 'Elige una Dote de Origen adicional',
        type: 'ORIGIN_FEAT',
        count: 1,
        allowedOptions: ['ANY'],
      },
    ],
  },
];
