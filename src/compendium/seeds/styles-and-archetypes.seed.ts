import { CompendiumStyle } from '../../schema/wiki/compendium/compendium-style.schema';
import { CompendiumArchetype } from '../../schema/wiki/compendium/compendium-archetype.schema';

export const DEFAULT_STYLES: Partial<CompendiumStyle>[] = [
  {
    slug: 'versatil',
    name: 'Versátil',
    isDefault: true,
    icon: 'shield',
    summary:
      'Destaca por su dominio de las armas, su resistencia y su capacidad para adaptarse a distintas situaciones de combate.',
    description:
      'El Estilo Versátil representa a los personajes que destacan por su preparación física, su dominio de las armas y su capacidad para adaptarse a distintas situaciones de combate.',
    initialTraits: {
      hitDie: '1d12 por nivel de personaje.',
      hpLevel1: '12 + tu modificador de Constitución.',
      hpLevel1Base: 12,
      hpHigherLevels:
        '1d12 + tu modificador de Constitución por cada nivel posterior al primero.',
      armorProficiencies: 'Armaduras Ligeras, Medias y Pesadas.',
      shieldProficiency: 'Escudos.',
      weaponProficiencies: 'Armas Simples y Marciales.',
      toolProficiencies: 'Ninguna.',
      skillProficienciesText: 'Elige dos a tu elección.',
      skillChoicesCount: 2,
    },
    grants: {
      fixedProficiencies: [
        { category: 'ARMOR', value: 'armadura_ligera' },
        { category: 'ARMOR', value: 'armadura_media' },
        { category: 'ARMOR', value: 'armadura_pesada' },
        { category: 'SHIELD', value: 'escudos' },
        { category: 'WEAPON', value: 'armas_simples' },
        { category: 'WEAPON', value: 'armas_marciales' },
      ],
    },
    choices: [
      {
        id: 'versatil_save_group_a',
        label: 'Competencia en Tirada de Salvación (Fuerza, Inteligencia o Carisma)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['STR', 'INT', 'CHA'],
      },
      {
        id: 'versatil_save_group_b',
        label: 'Competencia en Tirada de Salvación (Destreza, Constitución o Sabiduría)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['DEX', 'CON', 'WIS'],
      },
      {
        id: 'versatil_skills_choice',
        label: 'Elige dos habilidades en las que obtener competencia',
        type: 'SKILL_PROFICIENCY',
        count: 2,
        allowedOptions: ['ANY'],
      },
    ],
    progression: [
      {
        level: 1,
        title: 'Técnica de Combate',
        description: 'Obtienes una Técnica de Combate de tu elección.',
        choices: [
          {
            id: 'versatil_lv1_combat_technique',
            label: 'Elige una Técnica de Combate',
            type: 'COMBAT_TECHNIQUE',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 1,
        title: 'Segundo Aliento',
        description:
          'Como Acción Adicional, puedes recuperar Puntos de Golpe equivalentes a 1d10 + tu nivel. Puedes utilizar este rasgo dos veces. Recuperas un uso al finalizar un Descanso Corto y todos los usos al finalizar un Descanso Largo. En el nivel 4 dispones de tres usos y en el nivel 10, de cuatro.',
      },
      {
        level: 1,
        title: 'Maestría de Armas',
        description:
          'Puedes utilizar las propiedades de Maestría de tres tipos de armas simples o marciales de tu elección.',
        choices: [
          {
            id: 'versatil_lv1_weapon_mastery',
            label: 'Elige tres tipos de armas simples o marciales para Maestría de Armas',
            type: 'WEAPON_MASTERY',
            count: 3,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 2,
        title: 'Oleada de Acción',
        description:
          'Durante tu turno, puedes realizar una Acción adicional. Recuperas el uso de este rasgo al finalizar un Descanso Corto o Largo.',
      },
      {
        level: 3,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 3 del Arquetipo elegido.',
        isArchetypeSlot: true,
      },
      {
        level: 4,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'versatil_lv4_general_feat',
            label: 'Elige una Dote General (Nivel 4)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 5,
        title: 'Ataque Extra',
        description:
          'Puedes atacar dos veces, en lugar de una, cuando realizas la Acción de Ataque durante tu turno.',
      },
      {
        level: 6,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 6 de tu Arquetipo.',
        isArchetypeSlot: true,
      },
      {
        level: 7,
        title: 'Indomable',
        description:
          'Cuando fallas una Tirada de Salvación, puedes repetirla y añadir a la nueva tirada un bonificador igual a tu nivel. Debes utilizar el nuevo resultado. Recuperas el uso de este rasgo al finalizar un Descanso Largo.',
      },
      {
        level: 8,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'versatil_lv8_general_feat',
            label: 'Elige una Dote General (Nivel 8)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 9,
        title: 'Ataques Estudiados',
        description:
          'Cuando fallas una tirada de ataque contra una criatura, tienes Ventaja en tu siguiente tirada de ataque contra ella antes de que finalice tu siguiente turno.',
      },
      {
        level: 10,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 10 de tu Arquetipo.',
        isArchetypeSlot: true,
      },
      {
        level: 11,
        title: 'Ataque Extra Mejorado',
        description:
          'Puedes atacar tres veces, en lugar de dos, cuando realizas la Acción de Ataque durante tu turno.',
      },
      {
        level: 12,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'versatil_lv12_general_feat',
            label: 'Elige una Dote General (Nivel 12)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
    ],
  },

  {
    slug: 'agil',
    name: 'Ágil',
    isDefault: true,
    icon: 'bolt',
    summary:
      'Se especializa en la movilidad, la precisión y el aprovechamiento de las oportunidades, evitando los peligros mediante su destreza.',
    description:
      'El Estilo Ágil representa a los personajes que destacan por su rapidez, precisión y capacidad para aprovechar las oportunidades. Prefieren la movilidad y la astucia a la fuerza bruta, utilizando sus habilidades para superar obstáculos y evitar peligros.',
    initialTraits: {
      hitDie: '1d10 por nivel de personaje.',
      hpLevel1: '10 + tu modificador de Constitución.',
      hpLevel1Base: 10,
      hpHigherLevels:
        '1d10 + tu modificador de Constitución por cada nivel posterior al primero.',
      armorProficiencies: 'Armaduras Ligeras.',
      shieldProficiency: 'Ninguna.',
      weaponProficiencies: 'Armas Simples y armas Marciales con la propiedad Sutileza.',
      toolProficiencies: 'Ninguna.',
      skillProficienciesText: 'Elige cuatro a tu elección.',
      skillChoicesCount: 4,
    },
    grants: {
      fixedProficiencies: [
        { category: 'ARMOR', value: 'armadura_ligera' },
        { category: 'WEAPON', value: 'armas_simples' },
        { category: 'WEAPON', value: 'armas_marciales_sutileza' },
      ],
    },
    choices: [
      {
        id: 'agil_save_group_a',
        label: 'Competencia en Tirada de Salvación (Fuerza, Inteligencia o Carisma)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['STR', 'INT', 'CHA'],
      },
      {
        id: 'agil_save_group_b',
        label: 'Competencia en Tirada de Salvación (Destreza, Constitución o Sabiduría)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['DEX', 'CON', 'WIS'],
      },
      {
        id: 'agil_skills_choice',
        label: 'Elige cuatro habilidades en las que obtener competencia',
        type: 'SKILL_PROFICIENCY',
        count: 4,
        allowedOptions: ['ANY'],
      },
    ],
    progression: [
      {
        level: 1,
        title: 'Pericia',
        description:
          'Elige dos habilidades con las que tengas competencia. Duplicas tu Bonificador de Competencia en las pruebas de característica que realices con ellas. En el nivel 6 puedes elegir otras dos habilidades con las que tengas competencia para obtener este beneficio.',
        choices: [
          {
            id: 'agil_lv1_expertise',
            label: 'Elige dos habilidades con competencia para obtener Pericia (Nivel 1)',
            type: 'SKILL_EXPERTISE',
            count: 2,
            allowedOptions: ['ANY'],
            restrictToProficient: true,
          },
        ],
      },
      {
        level: 1,
        title: 'Ataque Furtivo',
        description:
          'Una vez por turno, cuando impactas a una criatura con un ataque que utilice un arma con la propiedad Sutileza o un arma a distancia, puedes infligir 1d6 de daño adicional si tienes Ventaja en la tirada de ataque.\n\nNo necesitas tener Ventaja si otro enemigo del objetivo se encuentra a 5 pies de él, ese enemigo no está Incapacitado y no tienes Desventaja en la tirada de ataque.\n\nEl daño adicional aumenta a 2d6 en el nivel 3, 3d6 en el nivel 5, 4d6 en el nivel 7, 5d6 en el nivel 9 y 6d6 en el nivel 11.',
      },
      {
        level: 1,
        title: 'Maestría de Armas',
        description:
          'Puedes utilizar las propiedades de Maestría de dos tipos de armas con las que tengas competencia.',
        choices: [
          {
            id: 'agil_lv1_weapon_mastery',
            label: 'Elige dos tipos de armas con competencia para Maestría de Armas',
            type: 'WEAPON_MASTERY',
            count: 2,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 2,
        title: 'Acción Astuta',
        description:
          'Puedes realizar las acciones de Correr, Destrabarse o Esconderse como Acción Adicional.',
      },
      {
        level: 3,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 3 del Arquetipo elegido.',
        isArchetypeSlot: true,
      },
      {
        level: 4,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'agil_lv4_general_feat',
            label: 'Elige una Dote General (Nivel 4)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 5,
        title: 'Esquiva Asombrosa',
        description:
          'Cuando una criatura que puedas ver te impacta con una tirada de ataque, puedes utilizar tu Reacción para reducir a la mitad el daño que recibes de ese ataque.',
      },
      {
        level: 6,
        title: 'Rasgo de Arquetipo y Pericia Adicional',
        description:
          'Obtienes el rasgo de nivel 6 de tu Arquetipo. Además, por tu rasgo Pericia, puedes elegir otras dos habilidades con las que tengas competencia para duplicar tu Bonificador de Competencia.',
        isArchetypeSlot: true,
        choices: [
          {
            id: 'agil_lv6_expertise',
            label: 'Elige dos habilidades adicionales con competencia para obtener Pericia (Nivel 6)',
            type: 'SKILL_EXPERTISE',
            count: 2,
            allowedOptions: ['ANY'],
            restrictToProficient: true,
          },
        ],
      },
      {
        level: 7,
        title: 'Evasión',
        description:
          'Cuando estés sometido a un efecto que te permita realizar una Tirada de Salvación de Destreza para recibir solo la mitad del daño, no recibes daño si superas la salvación y solo recibes la mitad si fallas. No puedes beneficiarte de este rasgo mientras estés Incapacitado.',
      },
      {
        level: 8,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'agil_lv8_general_feat',
            label: 'Elige una Dote General (Nivel 8)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 9,
        title: 'Talento Fiable',
        description:
          'Cuando realices una prueba de característica que utilice una habilidad o herramienta con la que tengas competencia, puedes considerar cualquier resultado de 9 o menos en el d20 como un 10.',
      },
      {
        level: 10,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 10 de tu Arquetipo.',
        isArchetypeSlot: true,
      },
      {
        level: 11,
        title: 'Escurridizo',
        description:
          'Ninguna tirada de ataque puede tener Ventaja contra ti, salvo que estés Incapacitado.',
      },
      {
        level: 12,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'agil_lv12_general_feat',
            label: 'Elige una Dote General (Nivel 12)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
    ],
  },

  {
    slug: 'apoyo',
    name: 'Apoyo',
    isDefault: true,
    icon: 'handshake',
    summary:
      'Destaca por ayudar a sus compañeros, coordinar sus acciones y proporcionar ventajas que favorecen al grupo.',
    description:
      'El Estilo Apoyo representa a los personajes que destacan por su capacidad para colaborar con sus compañeros, anticiparse a los peligros y aprovechar las oportunidades. Su mayor fortaleza consiste en mejorar las acciones del grupo y ayudar a sus aliados a superar situaciones difíciles.',
    initialTraits: {
      hitDie: '1d10 por nivel de personaje.',
      hpLevel1: '10 + tu modificador de Constitución.',
      hpLevel1Base: 10,
      hpHigherLevels:
        '1d10 + tu modificador de Constitución por cada nivel posterior al primero.',
      armorProficiencies: 'Armaduras Ligeras y Medias.',
      shieldProficiency: 'Escudos.',
      weaponProficiencies: 'Armas Simples.',
      toolProficiencies: 'Ninguna.',
      skillProficienciesText: 'Elige tres a tu elección.',
      skillChoicesCount: 3,
    },
    grants: {
      fixedProficiencies: [
        { category: 'ARMOR', value: 'armadura_ligera' },
        { category: 'ARMOR', value: 'armadura_media' },
        { category: 'SHIELD', value: 'escudos' },
        { category: 'WEAPON', value: 'armas_simples' },
      ],
    },
    choices: [
      {
        id: 'apoyo_save_group_a',
        label: 'Competencia en Tirada de Salvación (Fuerza, Inteligencia o Carisma)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['STR', 'INT', 'CHA'],
      },
      {
        id: 'apoyo_save_group_b',
        label: 'Competencia en Tirada de Salvación (Destreza, Constitución o Sabiduría)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        allowedOptions: ['DEX', 'CON', 'WIS'],
      },
      {
        id: 'apoyo_skills_choice',
        label: 'Elige tres habilidades en las que obtener competencia',
        type: 'SKILL_PROFICIENCY',
        count: 3,
        allowedOptions: ['ANY'],
      },
    ],
    progression: [
      {
        level: 1,
        title: 'Característica Principal',
        description:
          'Elige Inteligencia, Sabiduría o Carisma. La característica elegida se utiliza siempre que un rasgo de este Estilo haga referencia a tu Característica Principal. Una vez realizada esta elección, no puedes cambiarla.',
        choices: [
          {
            id: 'apoyo_lv1_primary_ability',
            label: 'Elige tu Característica Principal (Inteligencia, Sabiduría o Carisma)',
            type: 'PRIMARY_ABILITY',
            count: 1,
            allowedOptions: ['INT', 'WIS', 'CHA'],
          },
        ],
      },
      {
        level: 1,
        title: 'Hombro a Hombro',
        description:
          'Cuando realizas la acción Ayudar, puedes prestar ayuda a una criatura situada a un máximo de 10 pies de ti, siempre que pueda verte u oírte y que puedas prestarle razonablemente la ayuda desde tu posición.',
      },
      {
        level: 1,
        title: 'Dominio de Armas',
        description:
          'Puedes utilizar las propiedades de Maestría de un tipo de arma con la que tengas competencia.',
        choices: [
          {
            id: 'apoyo_lv1_weapon_mastery',
            label: 'Elige un tipo de arma con competencia para Dominio de Armas',
            type: 'WEAPON_MASTERY',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 2,
        title: 'Ayuda Rápida',
        description:
          'Puedes realizar la acción Ayudar como Acción Adicional durante tu turno.',
      },
      {
        level: 3,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 3 del Arquetipo elegido.',
        isArchetypeSlot: true,
      },
      {
        level: 4,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'apoyo_lv4_general_feat',
            label: 'Elige una Dote General (Nivel 4)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 5,
        title: 'Intervención Oportuna',
        description:
          'Cuando una criatura que puedas ver realice una tirada de ataque contra ti o contra otra criatura situada a un máximo de 30 pies de ti, puedes utilizar tu Reacción para imponer Desventaja a esa tirada.\n\nPuedes utilizar este rasgo tantas veces como indique el modificador de tu Característica Principal (mínimo una vez). Recuperas un uso al finalizar un Descanso Corto y todos los usos gastados al finalizar un Descanso Largo.',
      },
      {
        level: 6,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 6 de tu Arquetipo.',
        isArchetypeSlot: true,
      },
      {
        level: 7,
        title: 'Ayuda Coordinada',
        description:
          'Una vez por turno, cuando realizas la acción Ayudar, puedes elegir a dos criaturas diferentes en lugar de una. Debes ayudar a cada criatura en una prueba o ataque diferente.',
      },
      {
        level: 8,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'apoyo_lv8_general_feat',
            label: 'Elige una Dote General (Nivel 8)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 9,
        title: 'Sin Perder el Paso',
        description:
          'Cuando utilizas la acción Ayudar en combate, una de las criaturas a las que ayudas puede utilizar inmediatamente su Reacción para moverse hasta la mitad de su Velocidad sin provocar Ataques de Oportunidad.',
      },
      {
        level: 10,
        title: 'Rasgo de Arquetipo',
        description: 'Obtienes el rasgo de nivel 10 de tu Arquetipo.',
        isArchetypeSlot: true,
      },
      {
        level: 11,
        title: 'Apoyo Constante',
        description:
          'Una vez en cada uno de tus turnos, puedes realizar la acción Ayudar sin gastar una Acción ni una Acción Adicional.',
      },
      {
        level: 12,
        title: 'Dote General',
        description: 'Obtienes una Dote General de tu elección.',
        isGeneralFeatSlot: true,
        choices: [
          {
            id: 'apoyo_lv12_general_feat',
            label: 'Elige una Dote General (Nivel 12)',
            type: 'GENERAL_FEAT',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
    ],
  },
];

export const DEFAULT_ARCHETYPES: Partial<CompendiumArchetype>[] = [
  // 1. ALIMAÑERO
  {
    slug: 'alimanero',
    name: 'Alimañero',
    isDefault: true,
    icon: 'pets',
    description:
      'Especialista en el adiestramiento y vínculo táctico con un Compañero Animal que combate a su lado.',
    features: [
      {
        level: 3,
        title: 'Compañero animal',
        description:
          'Tienes un compañero animal especialmente bien adiestrado. Elige uno de los bloques de estadísticas de Compañero animal y determina una especie apropiada para el bloque elegido.\n\nElige Inteligencia, Sabiduría o Carisma como tu Aptitud de Alimañero. Algunos de los valores y capacidades de tu compañero utilizan el modificador de la aptitud elegida.',
        subFeatures: [
          {
            title: 'Compañero en combate',
            description:
              'Actúa durante tu turno. Puede moverse y usar su reacción por sí mismo, pero la única acción que realiza sin recibir una orden es Esquivar. Como acción adicional, puedes ordenarle que realice una acción de su bloque de estadísticas u otra acción. Si tienes la condición de Incapacitado, tu compañero actúa por su cuenta y no está limitado a realizar la acción de Esquivar.',
          },
          {
            title: 'Pérdida del compañero',
            description:
              'Si pierdes definitivamente a tu compañero, puedes adiestrar a otro animal apropiado para que ocupe su lugar, según determine el DM.',
          },
        ],
        choices: [
          {
            id: 'alimanero_lv3_companion_type',
            label: 'Elige el tipo de Compañero Animal (Animal terrestre o Animal aéreo)',
            type: 'ANIMAL_COMPANION',
            count: 1,
            allowedOptions: ['animal_terrestre', 'animal_aereo'],
          },
          {
            id: 'alimanero_lv3_ability',
            label: 'Elige tu Aptitud de Alimañero (Inteligencia, Sabiduría o Carisma)',
            type: 'PRIMARY_ABILITY',
            count: 1,
            allowedOptions: ['INT', 'WIS', 'CHA'],
          },
        ],
      },
      {
        level: 6,
        title: 'Formación excepcional',
        description:
          'Cuando utilizas una acción adicional para ordenar a tu compañero que realice una acción, también puedes ordenarle que realice Correr, Destrabarse o Ayudar como acción adicional durante ese mismo turno.',
      },
      {
        level: 10,
        title: 'Furia bestial',
        description:
          'Cuando ordenas a tu compañero que realice Golpe de la Bestia, puede realizar ese ataque dos veces en lugar de una.',
      },
    ],
    appendix: {
      type: 'ANIMAL_COMPANION',
      title: 'Compañero Animal',
      introParagraphs: [
        {
          text: 'Los Compañeros Animales son criaturas entrenadas que acompañan a los personajes con el Arquetipo Alimañero, ayudándolos durante sus aventuras y combates.',
        },
        {
          title: 'Elección del compañero',
          text: 'Al obtener el Arquetipo Alimañero en el nivel 3, eliges una Bestia Terrestre o una Bestia Voladora. Puedes determinar libremente su especie y apariencia, siempre que sean apropiadas para la ambientación y cuenten con la aprobación del Director de Juego.',
        },
        {
          title: 'Órdenes y acciones',
          text: 'El compañero actúa siguiendo las reglas del Arquetipo Alimañero. Puede moverse y utilizar su Reacción de forma independiente, pero necesita recibir órdenes para realizar determinadas acciones. Sus capacidades mejoran mediante los rasgos de Arquetipo de los niveles 6 y 10.',
        },
        {
          title: 'Naturaleza del compañero',
          text: 'Los Compañeros Animales son criaturas naturales, sin capacidades mágicas ni sobrenaturales. Su especie determina su apariencia y comportamiento narrativo, pero no concede habilidades adicionales a las indicadas en su ficha.',
        },
      ],
      companionStats: [
        {
          slug: 'animal-terrestre',
          name: 'Animal terrestre',
          examples: 'Perro, lobo, jabalí',
          type: 'Bestia',
          size: 'Mediano',
          alignment: 'Neutral',
          armorClass: '13 + Aptitud de Alimañero',
          hitPoints: '5 + (5 × nivel de personaje)',
          hitDice: '1d8 por nivel de personaje (material de curación, descanso corto,...)',
          speed: '40 pies; Trepar 40 pies',
          stats: {
            str: '14 (+2)',
            dex: '14 (+2)',
            con: '15 (+2)',
            int: '8 (−1)',
            wis: '14 (+2)',
            cha: '11 (+0)',
          },
          senses: 'Visión en la Oscuridad 60 pies; Percepción Pasiva 12',
          languages: 'Comprende los idiomas que conoces, pero no puede hablar',
          proficiencyBonus: 'Igual al tuyo',
          bondWithTrainer:
            'Añade tu Bonificador de Competencia a todas sus pruebas de característica y Tiradas de Salvación',
          flyby: '—',
          beastAttack: 'Ataque cuerpo a cuerpo; alcance 5 pies',
          attackBonus:
            'Tu Bonificador de Competencia + tu modificador de Aptitud de Alimañero',
          attackDamage: '1d8 + 2 + tu modificador de Sabiduría',
          damageType:
            'Contundente, Perforante o Cortante, elegido al obtener el compañero',
          charge:
            'Tras desplazarse al menos 20 pies en línea recta hacia el objetivo, un impacto inflige 1d6 de daño adicional del mismo tipo. Si el objetivo es Grande o inferior, también queda Derribado',
        },
        {
          slug: 'animal-aereo',
          name: 'Animal aéreo',
          examples: 'Águila, halcón, búho',
          type: 'Bestia',
          size: 'Pequeño',
          alignment: 'Neutral',
          armorClass: '13 + Aptitud de Alimañero',
          hitPoints: '4 + (4 × nivel de personaje)',
          hitDice: '1d6 por nivel de personaje (material de curación, descanso corto,...)',
          speed: '10 pies; Vuelo 60 pies',
          stats: {
            str: '6 (−2)',
            dex: '16 (+3)',
            con: '13 (+1)',
            int: '8 (−1)',
            wis: '14 (+2)',
            cha: '11 (+0)',
          },
          senses: 'Visión en la Oscuridad 60 pies; Percepción Pasiva 12',
          languages: 'Comprende los idiomas que conoces, pero no puede hablar',
          proficiencyBonus: 'Igual al tuyo',
          bondWithTrainer:
            'Añade tu Bonificador de Competencia a todas sus pruebas de característica y Tiradas de Salvación',
          flyby:
            'No provoca Ataques de Oportunidad cuando sale del alcance de un enemigo volando',
          beastAttack: 'Ataque cuerpo a cuerpo; alcance 5 pies',
          attackBonus:
            'Tu Bonificador de Competencia + tu modificador de Aptitud de Alimañero',
          attackDamage: '1d4 + 3 + tu modificador de Sabiduría',
          damageType: 'Cortante',
          charge: '—',
        },
      ],
      footerParagraphs: [
        {
          title: 'Monturas',
          text: 'Elegir un caballo u otro équido como compañero no le concede automáticamente capacidad para servir de montura. La Bestia Terrestre conserva su tamaño Mediano. Para utilizar un caballo adulto como montura, se aplican las reglas habituales de monturas.',
        },
        {
          title: 'Progresión',
          text: 'Los valores que dependen del nivel del personaje aumentan conforme este progresa.',
        },
      ],
    },
  },

  // 2. ASESINO
  {
    slug: 'asesino',
    name: 'Asesino',
    isDefault: true,
    icon: 'colorize',
    description:
      'Maestro de la infiltración, los golpes letales por sorpresa y la eliminación rápida de objetivos.',
    grants: {
      initiativeAdvantage: true,
    },
    features: [
      {
        level: 3,
        title: 'Asesinar',
        description:
          'Eres experto en actuar antes de que tus enemigos tengan oportunidad de reaccionar, lo que te otorga los siguientes beneficios.',
        subFeatures: [
          {
            title: 'Iniciativa',
            description: 'Tienes ventaja en las tiradas de Iniciativa.',
          },
          {
            title: 'Golpe sorpresa',
            description:
              'Durante la primera ronda de cada combate, tienes Ventaja en las tiradas de ataque contra cualquier criatura que todavía no haya actuado. Además, la primera vez que impactes a una criatura que todavía no haya actuado durante esa ronda, el ataque inflige daño adicional del mismo tipo que el arma igual a tu nivel y provoca una Hemorragia. Mientras sufra la hemorragia, la criatura recibe ese mismo daño adicional al comienzo de cada uno de sus turnos. La criatura afectada o un aliado puede realizar la acción de Atender Heridas para detener la hemorragia.',
          },
        ],
      },
      {
        level: 3,
        title: 'Pericia en infiltración',
        description:
          'Has aprendido a adoptar los gestos y maneras de otras personas para acercarte a lugares y objetivos que de otro modo permanecerían fuera de tu alcance.',
        subFeatures: [
          {
            title: 'Imitación Magistral',
            description:
              'Puedes imitar el habla, la escritura o ambas cosas de otra persona si has dedicado al menos 1 hora a estudiarlas.',
          },
        ],
      },
      {
        level: 6,
        title: 'Sed de sangre',
        description:
          'Cuando una criatura que puedas ver a 30 pies o menos de ti reciba daño de otra criatura y conserve al menos 1 Punto de Golpe, puedes utilizar tu Reacción para moverte hasta la mitad de tu Velocidad hacia ella. Este movimiento no provoca Ataques de Oportunidad.\n\nSi terminas este movimiento a tu alcance, puedes realizar inmediatamente un ataque cuerpo a cuerpo contra esa criatura como parte de la misma Reacción.\n\nPuedes utilizar este rasgo un número de veces igual a tu modificador de Competencia. Recuperas todos los usos gastados cuando terminas un Descanso Largo.',
      },
      {
        level: 10,
        title: 'Golpe mortal',
        description:
          'Cuando impactes a una criatura con un ataque con arma, puedes intentar asestarle un Golpe Mortal. El objetivo debe realizar una Tirada de Salvación de Constitución con una CD igual a 8 + tu Bonificador de Competencia + tu modificador de Destreza.\n\nSi falla la salvación, puedes gastar uno o más usos de este rasgo para infligir daño adicional del mismo tipo que el arma. Este daño es de 2d8 si gastas un uso, más 1d8 por cada uso adicional que gastes en el mismo golpe.\n\nSi el objetivo supera la Tirada de Salvación, no gastas ningún uso de este rasgo y puedes volver a intentarlo en un ataque posterior.\n\nUna vez que una criatura haya sufrido el daño adicional de tu Golpe Mortal, no puedes volver a utilizar este rasgo contra ella durante el mismo combate.\n\nDispones de un número de usos igual a tu Bonificador de Competencia y recuperas todos los usos gastados al finalizar un Descanso Largo.',
      },
    ],
  },

  // 3. CABALLERO
  {
    slug: 'caballero',
    name: 'Caballero',
    isDefault: true,
    icon: 'fort',
    description:
      'Líder carismático y diplomático capaz de arengar a sus aliados y dirigir la batalla con voz de mando.',
    features: [
      {
        level: 3,
        title: 'Embajador',
        description:
          'Obtienes competencia en una de las siguientes habilidades a tu elección: Interpretar, Intimidar, Perspicacia o Persuasión.',
        choices: [
          {
            id: 'caballero_lv3_embajador_skill',
            label: 'Elige una habilidad (Interpretación, Intimidación, Perspicacia o Persuasión)',
            type: 'SKILL_PROFICIENCY',
            count: 1,
            allowedOptions: [
              'interpretacion',
              'intimidacion',
              'perspicacia',
              'persuasion',
            ],
          },
        ],
      },
      {
        level: 3,
        title: 'Arenga',
        description:
          'Como acción adicional, elige un número de aliados que puedas ver a 30 pies o menos de ti igual a tu modificador de Carisma (mínimo uno). Cada aliado elegido recupera una cantidad de Puntos de Golpe igual a 1d4 + tu nivel de personaje.\n\nPuedes utilizar este rasgo un número de veces igual a tu Bonificador de Competencia y recuperas todos los usos gastados cuando terminas un Descanso Largo.',
      },
      {
        level: 6,
        title: 'Infundir temple',
        description:
          'Cuando utilizas tu Arenga, cada aliado elegido tiene Ventaja en la siguiente prueba de d20 que realice antes del comienzo de tu siguiente turno.',
      },
      {
        level: 10,
        title: 'Voz de mando',
        description:
          'Como Acción Adicional, elige un número de aliados que puedas ver a un máximo de 30 pies de ti igual a tu modificador de Carisma (mínimo uno). Cada criatura elegida puede utilizar inmediatamente su Reacción para realizar una de las siguientes acciones:\n• Atacar: Realizar un ataque con un arma o un Golpe sin Armas.\n• Mover: Moverse hasta la mitad de su Velocidad sin provocar Ataques de Oportunidad.\n\nUna vez utilizado este rasgo, no puedes volver a utilizarlo hasta que termines un Descanso Corto o Largo.',
      },
    ],
  },

  // 4. CAZADOR
  {
    slug: 'cazador',
    name: 'Cazador',
    isDefault: true,
    icon: 'gps_fixed',
    description:
      'Rastreador implacable que marca a su presa para no dejarla escapar y abatirla con precisión letal.',
    features: [
      {
        level: 3,
        title: 'Marcar presa',
        description:
          'Como Acción Adicional, elige una criatura que puedas ver a un máximo de 90 pies de ti. Esa criatura queda marcada como tu presa durante 1 hora o hasta que marques a otra criatura (gastando otro uso). Una vez por turno, cuando impactes a tu presa con una tirada de ataque, puedes infligirle 1d6 de daño adicional. Puedes utilizar este rasgo un número de veces igual a tu Bonificador de Competencia y recuperas todos los usos gastados cuando terminas un Descanso Largo.',
      },
      {
        level: 3,
        title: 'Rastrear presa',
        description:
          'Tienes Ventaja en las pruebas de Sabiduría (Percepción) y Sabiduría (Supervivencia) que realices para encontrar a tu presa o seguir su rastro.',
      },
      {
        level: 6,
        title: 'Continuar la cacería',
        description:
          'Cuando tu presa quede Incapacitada, puedes marcar inmediatamente como nueva presa a otra criatura que puedas ver a un máximo de 90 pies de ti, sin gastar un uso de Marcar Presa. La nueva presa permanece marcada durante el tiempo que quedase de la duración de la Marca anterior.',
      },
      {
        level: 10,
        title: 'Cazador preciso',
        description:
          'Tienes Ventaja en las tiradas de ataque contra tu presa. Además, el daño adicional de Marcar Presa aumenta de 1d6 a 1d10.',
      },
    ],
  },

  // 5. COMBATIENTE
  {
    slug: 'combatiente',
    name: 'Combatiente',
    isDefault: true,
    icon: 'sports_kabaddi',
    description:
      'Maestro de las Maniobras de Combate y los Dados de Superioridad para controlar el flujo de la batalla.',
    features: [
      {
        level: 3,
        title: 'Superioridad en combate',
        description:
          'Aprendes tres maniobras a tu elección de la sección «Opciones de Maniobra». Muchas maniobras mejoran un ataque de alguna manera. Solo puedes utilizar una maniobra por ataque. Cada vez que obtengas un nuevo rasgo de esta subclase, puedes reemplazar una de las maniobras que conozcas por otra para la que cumplas los requisitos.',
        subFeatures: [
          {
            title: 'Dados de Superioridad',
            description:
              'Tienes cuatro dados d8 de Superioridad. Para utilizar una maniobra debes gastar un Dado de Superioridad cuando esta así lo indique. Recuperas todos los Dados de Superioridad gastados cuando terminas un Descanso Corto o Largo.',
          },
          {
            title: 'Tiradas de salvación',
            description:
              'Si una de tus maniobras requiere una tirada de salvación, la CD es igual a: CD de maniobra = 8 + tu modificador de Fuerza o Destreza (a tu elección) + tu Bonificador de Competencia.',
          },
        ],
        choices: [
          {
            id: 'combatiente_lv3_maneuvers',
            label: 'Elige 3 Maniobras de Combate (Nivel 3)',
            type: 'COMBAT_MANEUVER',
            count: 3,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 6,
        title: 'Superioridad en combate mejorada',
        description:
          'Tu dominio de las maniobras aumenta de las siguientes maneras:\n• Aprendes dos maniobras adicionales, hasta un total de cinco.\n• Obtienes un Dado de Superioridad adicional, hasta un total de cinco.\n• Tus Dados de Superioridad pasan de d8 a d10.',
        choices: [
          {
            id: 'combatiente_lv6_maneuvers',
            label: 'Elige 2 Maniobras de Combate adicionales (Nivel 6)',
            type: 'COMBAT_MANEUVER',
            count: 2,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 10,
        title: 'Superioridad en combate mayor',
        description:
          'Tu dominio de las técnicas de combate alcanza su máxima expresión y mejora de las siguientes maneras:\n• Aprendes dos maniobras adicionales, hasta un total de siete.\n• Obtienes un Dado de Superioridad adicional, hasta un total de seis.\n• Tus Dados de Superioridad pasan de d10 a d12.',
        choices: [
          {
            id: 'combatiente_lv10_maneuvers',
            label: 'Elige 2 Maniobras de Combate adicionales (Nivel 10)',
            type: 'COMBAT_MANEUVER',
            count: 2,
            allowedOptions: ['ANY'],
          },
        ],
      },
    ],
    appendix: {
      type: 'COMBAT_MANEUVERS',
      title: 'Maniobras de Combate',
      introParagraphs: [
        {
          text: 'Las Maniobras de Combate representan movimientos, tácticas y recursos aprendidos mediante el entrenamiento y la experiencia en batalla. Permiten aprovechar las oportunidades del combate para mejorar los ataques, defenderse, desplazar enemigos o ayudar a los compañeros. Estas maniobras están disponibles para los personajes que eligen el Arquetipo Combatiente.',
        },
        {
          title: 'Maniobras conocidas',
          text: 'Al obtener el Arquetipo Combatiente en el nivel 3, eliges tres Maniobras de Combate. Aprendes dos maniobras adicionales en el nivel 6 y otras dos en el nivel 10.',
        },
        {
          title: 'Dados de Superioridad',
          text: 'Para utilizar una maniobra debes gastar un Dado de Superioridad, salvo que se indique lo contrario. Tiras el dado y aplicas su resultado según la descripción de la maniobra.',
        },
        {
          title: 'Recuperación y Límite de uso',
          text: 'Recuperas todos los Dados de Superioridad gastados al finalizar un Descanso Corto o Largo. Solo puedes utilizar una Maniobra de Combate por ataque. Algunas maniobras pueden emplearse fuera del combate o en circunstancias que no requieren atacar.',
        },
        {
          title: 'Tiradas de Salvación',
          text: 'Cuando una maniobra exige una Tirada de Salvación, su Clase de Dificultad es igual a 8 + tu Bonificador de Competencia + tu modificador de Fuerza o Destreza, a tu elección.',
        },
      ],
      maneuverProgressionTable: [
        { level: 3, availableDice: 4, dieType: 'd8', knownManeuvers: 3 },
        { level: 6, availableDice: 5, dieType: 'd10', knownManeuvers: 5 },
        { level: 10, availableDice: 6, dieType: 'd12', knownManeuvers: 7 },
      ],
      maneuvers: [
        {
          slug: 'acecho',
          name: 'Acecho',
          activation:
            'Al realizar una prueba de Destreza (Sigilo) o una tirada de Iniciativa.',
          effect:
            'Añades el resultado del Dado de Superioridad a la tirada. No puedes utilizar esta maniobra mientras estés Incapacitado.',
        },
        {
          slug: 'intercambio-de-posiciones',
          name: 'Intercambio de Posiciones',
          activation:
            'Durante tu turno, cuando estés a 5 pies o menos de una criatura voluntaria y no estés Incapacitado.',
          effect:
            'Intercambias tu posición con la criatura, consumiendo 5 pies de tu movimiento sin provocar Ataques de Oportunidad. Elige a una de las dos criaturas: obtiene un bonificador a su Clase de Armadura igual al resultado del Dado de Superioridad hasta el comienzo de tu próximo turno.',
        },
        {
          slug: 'ataque-del-comandante',
          name: 'Ataque del Comandante',
          activation: 'Al realizar la acción Atacar durante tu turno.',
          effect:
            'Sustituyes uno de tus ataques para ordenar a un aliado que pueda verte u oírte que ataque. El aliado puede utilizar inmediatamente su Reacción para realizar un ataque con un arma. Si impacta, añade el resultado del Dado de Superioridad al daño.',
        },
        {
          slug: 'presencia-imponente',
          name: 'Presencia Imponente',
          activation:
            'Al realizar una prueba de Carisma (Intimidación, Interpretación o Persuasión).',
          effect: 'Añades el resultado del Dado de Superioridad a la prueba.',
        },
        {
          slug: 'ataque-desarmante',
          name: 'Ataque Desarmante',
          activation: 'Al impactar a una criatura con un ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad al daño. El objetivo debe superar una Tirada de Salvación de Fuerza o soltar un objeto que sostenga, a tu elección. El objeto cae en su espacio.',
        },
        {
          slug: 'ataque-distractor',
          name: 'Ataque Distractor',
          activation: 'Al impactar a una criatura con un ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad al daño. El siguiente ataque realizado por una criatura distinta de ti contra ese objetivo tiene Ventaja, siempre que se produzca antes del comienzo de tu próximo turno.',
        },
        {
          slug: 'juego-de-pies-evasivo',
          name: 'Juego de Pies Evasivo',
          activation: 'Como Acción Adicional.',
          effect:
            'Realizas la acción Destrabarse y añades el resultado del Dado de Superioridad a tu Clase de Armadura hasta el comienzo de tu próximo turno.',
        },
        {
          slug: 'finta',
          name: 'Finta',
          activation:
            'Como Acción Adicional, contra una criatura situada a 5 pies o menos de ti.',
          effect:
            'Obtienes Ventaja en tu siguiente tirada de ataque contra esa criatura durante el turno actual. Si impactas, añades el resultado del Dado de Superioridad al daño.',
        },
        {
          slug: 'provocacion',
          name: 'Provocación',
          activation: 'Al impactar a una criatura con un ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad al daño. El objetivo debe superar una Tirada de Salvación de Sabiduría o tendrá Desventaja en las tiradas de ataque contra cualquier criatura que no seas tú hasta el final de tu próximo turno.',
        },
        {
          slug: 'embestida',
          name: 'Embestida',
          activation: 'Como Acción Adicional.',
          effect:
            'Realizas la acción Correr. Si durante ese turno te desplazas al menos 5 pies en línea recta hacia una criatura y posteriormente la impactas con un ataque cuerpo a cuerpo como parte de la acción Atacar, añades el resultado del Dado de Superioridad al daño.',
        },
        {
          slug: 'ataque-de-maniobra',
          name: 'Ataque de Maniobra',
          activation: 'Al impactar a una criatura con un ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad al daño. Un aliado que pueda verte u oírte puede utilizar inmediatamente su Reacción para desplazarse hasta la mitad de su Velocidad sin provocar Ataques de Oportunidad de la criatura impactada.',
        },
        {
          slug: 'parada',
          name: 'Parada',
          activation:
            'Como Reacción, cuando una criatura te inflige daño con un ataque cuerpo a cuerpo.',
          effect:
            'Reduces el daño recibido en una cantidad igual al resultado del Dado de Superioridad + tu modificador de Fuerza o Destreza, a tu elección.',
        },
        {
          slug: 'ataque-preciso',
          name: 'Ataque Preciso',
          activation: 'Al fallar una tirada de ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad a la tirada de ataque, pudiendo convertir el fallo en un impacto.',
        },
        {
          slug: 'ataque-de-empuje',
          name: 'Ataque de Empuje',
          activation: 'Al impactar a una criatura con un ataque.',
          effect:
            'Añades el resultado del Dado de Superioridad al daño. Si el objetivo es Grande o inferior, debe superar una Tirada de Salvación de Fuerza o ser empujado hasta 15 pies en dirección opuesta a ti.',
        },
        {
          slug: 'aliento',
          name: 'Aliento',
          activation:
            'Como Acción Adicional, eligiendo a un aliado situado a 30 pies o menos que pueda verte u oírte.',
          effect:
            'El aliado obtiene Puntos de Golpe Temporales iguales al resultado del Dado de Superioridad + la mitad de tu nivel de personaje, redondeada hacia abajo.',
        },
        {
          slug: 'contraataque',
          name: 'Contraataque',
          activation:
            'Como Reacción, cuando una criatura falla un ataque cuerpo a cuerpo contra ti.',
          effect:
            'Realizas un ataque cuerpo a cuerpo contra esa criatura. Si impactas, añades el resultado del Dado de Superioridad al daño.',
        },
        {
          slug: 'ataque-de-barrido',
          name: 'Ataque de Barrido',
          activation: 'Al impactar a una criatura con un ataque cuerpo a cuerpo.',
          effect:
            'Intentas alcanzar a una segunda criatura situada a 5 pies o menos del objetivo original y dentro del alcance de tu arma. Efecto pendiente de completar.',
        },
      ],
    },
  },

  // 6. CURANDERO
  {
    slug: 'curandero',
    name: 'Curandero',
    isDefault: true,
    icon: 'healing',
    description:
      'Especialista médico de combate capaz de atender heridas con rapidez, curar afecciones y salvar vidas en situaciones críticas.',
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'material_curacion' }],
    },
    features: [
      {
        level: 3,
        title: 'Conocimientos médicos',
        description: 'Obtienes competencia con Material de Curación.',
      },
      {
        level: 3,
        title: 'Primeros auxilios',
        description:
          'Obtienes competencia con Material de Curación. Si tienes la dote de origen Sanador, duplicas tu Bonificador de Competencia al determinar los Puntos de Golpe que recupera una criatura cuando utilizas Material de Curación.\n\nAdemás, puedes realizar la acción Atender Heridas como Acción Adicional en lugar de como Acción.',
      },
      {
        level: 6,
        title: 'Tratamiento eficaz',
        description:
          'Cuando realices la acción Atender Heridas, puedes tirar 2 Dados de Golpe de la criatura atendida en lugar de uno. Estos dados no se gastan y el modificador de Constitución de la criatura se añade una sola vez al resultado total.',
      },
      {
        level: 6,
        title: 'Tratamiento de afecciones',
        description:
          'Como Acción, puedes gastar un uso de Material de Curación para atender a una criatura a 5 pies de ti y poner fin a una de las siguientes condiciones que la afecten: Cegado, Ensordecido o Envenenado.',
      },
      {
        level: 10,
        title: 'Medicina de urgencia',
        description:
          'Cuando otra criatura que puedas ver sea reducida a 0 Puntos de Golpe sin morir, puedes utilizar tu Reacción para moverte hasta la mitad de tu Velocidad hacia ella. Este movimiento no provoca Ataques de Oportunidad.\n\nSi terminas este movimiento a 5 pies de la criatura, puedes gastar 1 uso de Material de Curación para realizar inmediatamente la acción Atender Heridas sobre ella, aunque haya alcanzado su límite de tratamientos. Esta curación no cuenta para dicho límite.\n\nUna vez que hayas utilizado Medicina de Urgencia sobre una criatura, no puedes volver a utilizar este rasgo sobre ella hasta que finalice un Descanso Corto o Largo.',
      },
    ],
  },

  // 7. ERUDITO
  {
    slug: 'erudito',
    name: 'Erudito',
    isDefault: true,
    icon: 'local_library',
    description:
      'Estudioso versátil que analiza las debilidades del enemigo y aplica su intelecto para asegurar el éxito del grupo.',
    features: [
      {
        level: 3,
        title: 'Conocimientos generales',
        grants: { halfProficiencyOnUntrainedSkills: true },
        description:
          'Cuando realices una Prueba de Característica que utilice una habilidad en la que no tengas competencia, puedes añadir a la tirada la mitad de tu Bonificador de Competencia, redondeando hacia abajo.',
      },
      {
        level: 3,
        title: 'Conoce a tu enemigo',
        description:
          'Como Acción Adicional, puedes estudiar a una criatura que puedas ver a un máximo de 30 pies de ti, identificando sus movimientos, sus defensas y los puntos débiles que puedes aprovechar. Elige entre tú o un aliado que pueda verte u oírte. Durante 1 minuto, la criatura elegida obtiene los siguientes beneficios contra el enemigo estudiado:',
        subFeatures: [
          {
            title: 'Ataque Certero',
            description:
              'Añade tu Bonificador de Competencia a las tiradas de daño de sus ataques contra la criatura estudiada.',
          },
          {
            title: 'Punto Débil',
            description:
              'Sus tiradas de ataque contra la criatura estudiada consiguen un golpe crítico con un resultado de 19 o 20 en el d20.',
          },
          {
            title: 'Duración y recuperación',
            description:
              'El efecto termina cuando transcurre 1 minuto, cuando la criatura estudiada queda reducida a 0 Puntos de Golpe o cuando quedas Incapacitado. Una vez utilizado este rasgo, no puedes volver a utilizarlo hasta finalizar un Descanso Largo.',
          },
        ],
      },
      {
        level: 6,
        title: 'Destello de erudito',
        description:
          'Cuando tú o una criatura que puedas ver a 30 pies o menos de ti falle un Ataque, Prueba de Característica o una Tirada de Salvación, puedes utilizar tu Reacción para añadir una bonificación a la tirada igual a tu modificador de Inteligencia (mínimo de +1), lo que puede convertir el fallo en un éxito. Puedes utilizar esta Reacción un número de veces igual a tu modificador de Inteligencia (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un Descanso Largo.',
      },
      {
        level: 10,
        title: 'Anticipación',
        description:
          'Tu profundo conocimiento de las técnicas de combate te permite reconocer los movimientos de tus adversarios y anticipar sus ataques. Mientras esté activo Conoce a tu Enemigo, cuando la criatura estudiada impacte con una tirada de ataque a la criatura que recibe los beneficios de ese rasgo, esta puede utilizar su Reacción para tirar 1d6. Si obtiene un resultado de 4 o más, el ataque falla, independientemente del resultado de la tirada de ataque.\n\nPara utilizar esta capacidad, la criatura beneficiada debe poder ver al enemigo estudiado.',
      },
    ],
  },

  // 8. ESPADACHÍN
  {
    slug: 'espadachin',
    name: 'Espadachín',
    isDefault: true,
    icon: 'military_tech',
    description:
      'Combatiente ágil y elegante que entra y sale del cuerpo a cuerpo provocando y replicando los fallos de sus rivales.',
    features: [
      {
        level: 3,
        title: 'Juego de pies',
        description:
          'Durante tu turno, si realizas un ataque cuerpo a cuerpo contra una criatura, esta no puede realizar Ataques de Oportunidad contra ti durante el resto de ese turno.',
      },
      {
        level: 3,
        title: 'Soltura',
        description:
          'Como Acción Adicional, puedes obtener Ventaja en la siguiente prueba de Destreza (Acrobacias) o Fuerza (Atletismo) que realices durante ese turno.',
      },
      {
        level: 6,
        title: 'Provocar',
        description:
          'Como Acción Adicional, puedes provocar a una criatura que puedas ver y que se encuentre a 30 pies de ti. Realiza una prueba de Carisma (Persuasión) enfrentada a una prueba de Sabiduría (Perspicacia) de la criatura.\n\nSi ganas la prueba enfrentada, hasta el comienzo de tu siguiente turno la criatura tiene Desventaja en las tiradas de ataque contra criaturas distintas de ti y no puede realizar Ataques de Oportunidad contra ellas.\n\nUna vez hayas provocado con éxito a una criatura mediante este rasgo, no podrás volver a usarlo contra esa misma criatura hasta que finalices un Descanso Largo.',
      },
      {
        level: 10,
        title: 'Réplica',
        description:
          'Cuando una criatura falle un ataque cuerpo a cuerpo contra ti, puedes usar tu Reacción para realizar inmediatamente un ataque cuerpo a cuerpo contra ella, siempre que se encuentre a tu alcance.',
      },
    ],
  },

  // 9. HOMBRE DE ARMAS
  {
    slug: 'hombre-de-armas',
    name: 'Hombre de Armas',
    isDefault: true,
    icon: 'hardware',
    description:
      'Atleta marcial implacable especializado en asestar golpes críticos devastadores y desafiar a la propia muerte.',
    grants: {
      initiativeAdvantage: true,
      criticalHitRange: 19,
    },
    features: [
      {
        level: 3,
        title: 'Crítico mejorado',
        description:
          'Tus tiradas de ataque con armas y tus Golpes sin Armas consiguen un golpe crítico con un resultado de 19 o 20 en el d20.',
      },
      {
        level: 3,
        title: 'Atleta excepcional',
        description:
          'Obtienes ventaja en las tiradas de iniciativa y en las pruebas de Fuerza (Atletismo). Además, inmediatamente después de asestar un golpe crítico, puedes moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad.',
      },
      {
        level: 6,
        title: 'Técnica de combate',
        description: 'Obtienes una Técnica de Combate de tu elección.',
        choices: [
          {
            id: 'hombre_de_armas_lv6_combat_technique',
            label: 'Elige una Técnica de Combate adicional (Nivel 6)',
            type: 'COMBAT_TECHNIQUE',
            count: 1,
            allowedOptions: ['ANY'],
          },
        ],
      },
      {
        level: 10,
        title: 'Crítico superior',
        description:
          'Tus tiradas de ataque con armas y golpes sin armas pueden conseguir un golpe crítico con una tirada de 18-20 en el d20.',
        grants: {
          criticalHitRange: 18,
        },
      },
      {
        level: 10,
        title: 'Desafía a la muerte',
        description:
          'Tienes Ventaja en las Tiradas de Salvación contra Muerte. Además, cuando obtienes un resultado de 18, 19 o 20 en una Tirada de Salvación contra Muerte, obtienes los beneficios de haber sacado un 20 en esa tirada. Cuando estás a 0 Puntos de Golpe o menos y recibes daño, incluso mediante la acción Rematar, no mueres instantáneamente por ese daño. En su lugar, acumulas un fallo en tus Tiradas de Salvación contra Muerte.\n\nSi acumulas tres fallos, mueres normalmente.',
      },
    ],
  },

  // 10. LADRÓN
  {
    slug: 'ladron',
    name: 'Ladrón',
    isDefault: true,
    icon: 'key',
    description:
      'Experto en manos rápidas, acrobacias urbanas, ocultación de objetos y evasión oportunista.',
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'herramientas_ladron' }],
    },
    features: [
      {
        level: 3,
        title: 'Manos rápidas',
        description:
          'Obtienes competencia con Herramientas de Ladrón, además, como Acción Adicional, puedes realizar una de las siguientes acciones:',
        subFeatures: [
          {
            title: 'Juego de Manos',
            description:
              'Realiza una prueba de Destreza (Juego de Manos) para forzar una cerradura o desactivar una trampa utilizando Herramientas de Ladrón, o para robar un bolsillo.',
          },
          {
            title: 'Utilizar',
            description: 'Realiza la acción Utilizar.',
          },
        ],
      },
      {
        level: 3,
        title: 'Corretejados',
        description:
          'Te has entrenado para acceder a lugares especialmente difíciles de alcanzar, lo que te otorga los siguientes beneficios:',
        subFeatures: [
          {
            title: 'Escalador',
            description:
              'Obtienes una Velocidad de Escalada igual a tu Velocidad.',
          },
          {
            title: 'Saltador',
            description:
              'Puedes utilizar tu Destreza en lugar de tu Fuerza para determinar la distancia que puedes recorrer al saltar.',
          },
        ],
      },
      {
        level: 6,
        title: 'Sigilo apresurado',
        description:
          'Cuando realizas la acción Correr, puedes intentar Esconderte como parte de esa misma acción, siempre que cumplas los requisitos para hacerlo.',
      },
      {
        level: 6,
        title: 'Escondite secreto',
        description:
          'Cuando ocultas sobre tu persona un objeto que puedas sostener con una mano, tienes Ventaja en cualquier prueba de Destreza (Juego de Manos) que realices para evitar que otra criatura encuentre el objeto al registrarte. Una criatura que no te registre físicamente no puede encontrar el objeto mediante una simple inspección visual.',
      },
      {
        level: 10,
        title: 'Esquiva escurridiza',
        description:
          'Cuando una criatura realice una tirada de ataque contra ti, puedes utilizar tu Reacción para imponer Desventaja a esa tirada. Si el ataque falla, inmediatamente después puedes moverte hasta la mitad de tu Velocidad sin provocar Ataques de Oportunidad.',
      },
    ],
  },

  // 11. MONTARAZ
  {
    slug: 'montaraz',
    name: 'Montaraz',
    isDefault: true,
    icon: 'terrain',
    description:
      'Guerrero incansable de las tierras salvajes, especializado en combatir contra múltiples enemigos y resistir el agotamiento.',
    features: [
      {
        level: 3,
        title: 'Paso del montaraz',
        description:
          'Al comienzo de tu primer turno en cada combate, tu velocidad aumenta en 10 pies hasta el final de ese turno.',
      },
      {
        level: 3,
        title: 'Rompehordas',
        description:
          'Una vez en cada uno de tus turnos, cuando realices un ataque con un arma, puedes realizar otro ataque con el mismo arma contra una criatura diferente que se encuentre a 5 pies o menos del objetivo original, que esté dentro del alcance del arma y a la que no hayas atacado en este turno.',
      },
      {
        level: 6,
        title: 'Defensa contra ataques múltiples',
        description:
          'Cuando una criatura te impacta con una tirada de ataque, esa criatura tiene desventaja en las demás tiradas de ataque que realice contra ti durante el turno actual.',
      },
      {
        level: 6,
        title: 'Curtido',
        description:
          'Cuando terminas un descanso corto, tu nivel de Agotamiento se reduce en 1.',
      },
      {
        level: 10,
        title: 'Defensa del montaraz',
        description:
          'Cuando vayas a recibir daño, puedes utilizar tu Reacción para obtener Resistencia a ese daño y a cualquier otro daño del mismo tipo que recibas hasta el final del turno actual.',
      },
    ],
  },

  // 12. SACERDOTE
  {
    slug: 'sacerdote',
    name: 'Sacerdote',
    isDefault: true,
    icon: 'church',
    description:
      'Guía espiritual de voluntad inquebrantable que protege y fortalece las tiradas de salvación de sus compañeros.',
    features: [
      {
        level: 3,
        title: 'Guía',
        description:
          'Como Acción, puedes aconsejar, orientar o infundir confianza a una criatura que se encuentre a 5 pies o menos de ti y pueda oírte. Durante el siguiente minuto, esa criatura puede tirar 1d4 y añadir el resultado a una Prueba de Característica de su elección. Una vez añadido el dado, el efecto termina. Una criatura solo puede beneficiarse de una de tus Guías a la vez.',
      },
      {
        level: 3,
        title: 'Mente de hierro',
        description:
          'Obtienes competencia en Tiradas de Salvación de Sabiduría. Si ya posees esta competencia, obtienes en su lugar competencia en Tiradas de Salvación de Inteligencia o Carisma, a tu elección.',
        choices: [
          {
            id: 'sacerdote_lv3_iron_mind_save',
            label:
              'Competencia en Tirada de Salvación de Sabiduría (o Inteligencia / Carisma si ya la posees)',
            type: 'SAVING_THROW_PROFICIENCY',
            count: 1,
            allowedOptions: ['WIS', 'INT', 'CHA'],
          },
        ],
      },
      {
        level: 6,
        title: 'Convicción',
        description:
          'Mientras no tengas la condición de Incapacitado, tú y los aliados que se encuentren a 10 pies o menos de ti obtenéis una bonificación a las Tiradas de Salvación igual a tu modificador de Sabiduría (mínimo de +1). Una criatura solo puede beneficiarse de una Convicción a la vez.',
      },
      {
        level: 10,
        title: 'Resiliencia compartida',
        description:
          'Cuando un aliado que se encuentre dentro del alcance de tu Convicción falle una Tirada de Salvación, puedes utilizar tu Reacción para permitirle repetir la tirada. El aliado debe utilizar el nuevo resultado. Puedes utilizar este rasgo un número de veces igual a tu modificador de Sabiduría (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un Descanso Largo.',
      },
    ],
  },

  // 13. SALVAJE
  {
    slug: 'salvaje',
    name: 'Salvaje',
    isDefault: true,
    icon: 'whatshot',
    description:
      'Combatiente feroz que canaliza su furia en un Arrebato de resistencia física y fuerza desatada.',
    features: [
      {
        level: 3,
        title: 'Arrebato',
        description:
          'Puedes entrar en Arrebato un número de veces igual a tu Bonificador de Competencia. Recuperas uno de los usos gastados cuando terminas un Descanso Corto y todos los usos gastados cuando terminas un Descanso Largo.\n\nMientras tu Arrebato está activo, obtienes los siguientes beneficios:',
        subFeatures: [
          {
            title: 'Resistencia al daño',
            description:
              'Al entrar en arrebato, elige un tipo de daño (cortante, perforante o contundente) al que serás resistente hasta que termine el rasgo.',
          },
          {
            title: 'Fuerza desatada',
            description:
              'Tienes Ventaja en las pruebas de Fuerza y en las Tiradas de Salvación de Fuerza.',
          },
        ],
      },
      {
        level: 3,
        title: 'Ataque temerario',
        description:
          'Cuando realices tu primera tirada de ataque en tu turno, puedes decidir atacar temerariamente. Al hacerlo, obtendrás Ventaja en las tiradas de ataque cuerpo a cuerpo hasta el comienzo de tu siguiente turno, pero las tiradas de ataque en tu contra tendrán Ventaja durante ese tiempo.',
      },
      {
        level: 6,
        title: 'Instinto salvaje',
        description: 'Tienes ventaja en las tiradas de iniciativa.',
        grants: {
          initiativeAdvantage: true,
        },
      },
      {
        level: 10,
        title: 'Implacable',
        description:
          'Si tus Puntos de Golpe se reducen a 0 mientras tu Arrebato está activo y no mueres al instante, puedes realizar una Tirada de Salvación de Constitución con CD 10. Si tienes éxito, tus Puntos de Golpe se convierten en un número igual al doble de tu nivel.\n\nCada vez que vuelvas a utilizar este rasgo después de la primera, la CD aumenta en 5. Cuando terminas un Descanso Corto o Largo, la CD vuelve a ser 10.',
      },
    ],
  },

  // 14. TIRADOR
  {
    slug: 'tirador',
    name: 'Tirador',
    isDefault: true,
    icon: 'my_location',
    description:
      'Maestro del combate a distancia capaz de redirigir proyectiles, castigar a enemigos heridos y reposicionarse al instante.',
    features: [
      {
        level: 3,
        title: 'Asesino de colosos',
        description:
          'Cuando golpeas a una criatura con un arma, esta le inflige 1d8 puntos de daño adicionales si le faltan algunos de sus puntos de golpe. Solo puedes infligir este daño adicional una vez por turno.',
      },
      {
        level: 6,
        title: 'Escapa de la horda',
        description: 'Los ataques de oportunidad tienen desventaja contra ti.',
      },
      {
        level: 6,
        title: 'Tiro con efecto',
        description:
          'Cuando falles una tirada de ataque a distancia con un arma que posea la propiedad Munición, puedes usar una Acción Adicional para dirigir el proyectil hacia otro objetivo. El nuevo objetivo debe ser una criatura que puedas ver, encontrarse dentro del alcance del arma y estar a 60 pies o menos del objetivo original. Realiza una nueva tirada de ataque contra el nuevo objetivo.',
      },
      {
        level: 10,
        title: 'Disparos magistrales',
        description:
          'Cuando una criatura que puedes ver falla su tirada de ataque contra ti, puedes usar una Reacción para moverte hasta la mitad de tu Velocidad sin provocar Ataques de Oportunidad. Luego, puedes realizar una tirada de ataque a distancia contra el atacante como parte de esta Reacción si este se encuentra dentro del alcance del arma.',
      },
    ],
  },

  // 15. TROVADOR
  {
    slug: 'trovador',
    name: 'Trovador',
    isDefault: true,
    icon: 'theater_comedy',
    description:
      'Artista e inspirador que eleva las capacidades de sus aliados y desmoraliza a sus enemigos mediante palabras cortantes.',
    features: [
      {
        level: 3,
        title: 'Inspiración',
        description:
          'Sabes inspirar a otros mediante tus palabras, tu música, tus relatos o tus interpretaciones. Tu capacidad para hacerlo está representada por un d6 de dado de Inspiración.',
        subFeatures: [
          {
            title: 'Inspirar',
            description:
              'Como Acción Adicional, puedes inspirar a otra criatura que se encuentre a 60 pies o menos de ti y pueda verte u oírte. Esa criatura obtiene uno de tus dados de Inspiración. Una criatura solo puede tener uno de tus dados de Inspiración a la vez.\n\nDurante la siguiente hora, cuando la criatura falle una Prueba de D20, puede tirar el dado de Inspiración y añadir el resultado a la tirada, lo que puede convertir el fallo en un éxito. El dado de Inspiración se gasta al tirarlo.',
          },
          {
            title: 'Usos',
            description:
              'Puedes otorgar un dado de Inspiración un número de veces igual a tu modificador de Carisma (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un Descanso Largo.',
          },
        ],
      },
      {
        level: 6,
        title: 'Fuente de inspiración',
        description:
          'Tu dado de Inspiración se convierte en un d8. Además, recuperas todos los usos gastados de Inspiración cuando terminas un Descanso Corto o Largo.',
      },
      {
        level: 6,
        title: 'Palabras cortantes',
        description:
          'Cuando una criatura que puedas ver a 60 pies o menos de ti realice una tirada de daño o tenga éxito en una Prueba de Característica o una tirada de ataque, puedes utilizar tu Reacción y gastar un uso de Inspiración. Tira tu dado de Inspiración y resta el resultado de la tirada de la criatura, reduciendo el daño o pudiendo convertir el éxito en un fracaso.',
      },
      {
        level: 10,
        title: 'Inspiración superior',
        description:
          'Tu dado de Inspiración se convierte en un d10. Además, cuando tires Iniciativa, si te quedan menos de dos usos de Inspiración, recuperas usos gastados hasta tener dos.',
      },
    ],
  },
];
