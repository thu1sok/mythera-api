import { CompendiumFeat } from '../../schema/wiki/compendium/compendium-feat.schema';

export const DEFAULT_ORIGIN_FEATS: Partial<CompendiumFeat>[] = [
  {
    slug: 'alerta',
    name: 'Alerta',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'notifications_active',
    loreDescription:
      'Tu experiencia te ha enseñado a mantenerte atento al peligro y reaccionar con rapidez cuando este aparece.',
    prerequisiteText: 'Sabiduría 13.',
    prerequisites: {
      minStats: [{ stat: 'WIS', value: 13 }],
    },
    features: [
      {
        title: 'Competencia en Iniciativa',
        description:
          'Cuando tires Iniciativa, añade tu Bonificador de Competencia a la tirada.',
      },
      {
        title: 'Intercambio de Iniciativa',
        description:
          'Inmediatamente después de tirar Iniciativa, puedes intercambiar tu resultado con el de un aliado dispuesto que participe en el mismo combate. No puedes realizar este intercambio si tú o el aliado estáis Incapacitados.',
      },
    ],
    grants: {
      initiativeProficiency: true,
    },
    choices: [],
  },
  {
    slug: 'alquimista',
    name: 'Alquimista',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'science',
    loreDescription:
      'Has aprendido a combinar sustancias y preparar remedios, venenos y otros compuestos mediante conocimientos adquiridos con la práctica y la experimentación.',
    prerequisiteText: 'Inteligencia 13.',
    prerequisites: {
      minStats: [{ stat: 'INT', value: 13 }],
    },
    features: [
      {
        title: 'Competencia con Material Alquímico',
        description: 'Obtienes competencia con Material Alquímico.',
      },
      {
        title: 'Preparar Veneno',
        description:
          'Durante un Descanso Corto o Largo, puedes gastar 1 uso de Material Alquímico para preparar una cantidad de dosis de veneno igual a tu Bonificador de Competencia.\n\nComo Acción Adicional, puedes aplicar una dosis a un arma o pieza de munición. El veneno conserva su potencia durante 1 minuto o hasta que causes daño con el objeto envenenado, lo que ocurra primero.\n\nCuando una criatura recibe daño del objeto envenenado, debe superar una Tirada de Salvación de Constitución con una CD igual a 8 + tu Bonificador de Competencia + tu modificador de Inteligencia. Si falla, recibe 1d8 de daño por veneno y queda Envenenada hasta el final de tu siguiente turno.\n\nLas dosis de veneno preparadas pierden su eficacia al finalizar tu siguiente Descanso Largo.',
      },
      {
        title: 'Preparar Material de Curación',
        description:
          'Durante un Descanso Corto o Largo, puedes gastar 1 uso de Material Alquímico para preparar un número de usos de Material de Curación igual a tu Bonificador de Competencia. El Material de Curación preparado no caduca y conserva su eficacia hasta que se utiliza.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'material_alquimico' }],
    },
    choices: [],
  },
  {
    slug: 'artesano',
    name: 'Artesano',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'construction',
    loreDescription:
      'Has aprendido diversos oficios y sabes aprovechar tu experiencia para fabricar objetos y adquirir bienes a buen precio.',
    prerequisiteText: 'Destreza 13.',
    prerequisites: {
      minStats: [{ stat: 'DEX', value: 13 }],
    },
    features: [
      {
        title: 'Competencia con Herramientas de Artesano',
        description: 'Obtienes competencia con Herramientas de Artesano.',
      },
      {
        title: 'Reparar herramientas',
        description:
          'Durante un Descanso Corto o Largo, puedes gastar 1 uso de tus Herramientas de Artesano para restaurar un número de usos igual a tu Bonificador de Competencia a otras herramientas que puedas reparar. No puedes restaurar una herramienta por encima de su máximo de 10 usos.',
      },
      {
        title: 'Reparación Experta',
        description:
          'Puedes utilizar Herramientas de Artesano para reparar un arma, armadura o escudo deteriorado durante un Descanso Corto o Largo. Cuando lo hagas, eliminas por completo su penalización por deterioro en lugar de reducirla en 1.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'herramientas_artesano' }],
    },
    choices: [],
  },
  {
    slug: 'avispado',
    name: 'Avispado',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'flare',
    loreDescription:
      'La fortuna parece acompañarte en los momentos decisivos, permitiéndote salir airoso de situaciones que podrían haber terminado de otra manera.',
    prerequisiteText: 'Carisma 13.',
    prerequisites: {
      minStats: [{ stat: 'CHA', value: 13 }],
    },
    features: [
      {
        title: 'Puntos de Suerte',
        description:
          'Tienes un número de Puntos de Suerte igual a tu Bonificador de Competencia, que puedes gastar para obtener los beneficios indicados a continuación. Recuperas todos los Puntos de Suerte gastados al finalizar un Descanso Largo.',
      },
      {
        title: 'Ventaja',
        description:
          'Cuando tires un d20 para una Prueba d20, puedes gastar 1 Punto de Suerte para obtener Ventaja en la tirada.',
      },
      {
        title: 'Desventaja',
        description:
          'Cuando una criatura realice una tirada de ataque contra ti, puedes gastar 1 Punto de Suerte para imponer Desventaja en la tirada.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'camarada',
    name: 'Camarada',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'diversity_3',
    loreDescription:
      'El arrojo de quienes te rodean alimenta tu propia determinación y te impulsa a estar a la altura de sus actos.',
    prerequisiteText: 'Carisma 13.',
    prerequisites: {
      minStats: [{ stat: 'CHA', value: 13 }],
    },
    features: [
      {
        title: 'Ánimo Contagioso',
        description:
          'Cuando un aliado que puedas ver a 60 pies de ti gaste Inspiración Heroica, puedes obtener Inspiración Heroica si no la tienes. Puedes usar este beneficio un número de veces igual a tu Bonificador de Competencia y recuperas todos los usos gastados al finalizar un Descanso Corto o Largo.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'duro',
    name: 'Duro',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'shield',
    loreDescription:
      'Una vida de esfuerzo y dificultades te ha hecho especialmente resistente, capaz de soportar heridas que derribarían a otros.',
    prerequisiteText: 'Constitución 13.',
    prerequisites: {
      minStats: [{ stat: 'CON', value: 13 }],
    },
    features: [
      {
        title: 'Resistencia',
        description:
          'Cuando obtengas esta dote, tu máximo de Puntos de Golpe aumenta en una cantidad igual al doble de tu nivel de personaje. Cada vez que subas de nivel a partir de entonces, tu máximo de Puntos de Golpe aumenta en 2 Puntos de Golpe adicionales.',
      },
    ],
    grants: {
      hpPerLevelBonus: 2,
    },
    choices: [],
  },
  {
    slug: 'espia',
    name: 'Espía',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'theater_comedy',
    loreDescription:
      'Has aprendido a moverte con discreción entre ambientes clandestinos, reconocer sus códigos y desviar la atención cuando es necesario.',
    prerequisiteText: 'Destreza 13.',
    prerequisites: {
      minStats: [{ stat: 'DEX', value: 13 }],
    },
    features: [
      {
        title: 'Competencia con Herramientas',
        description: 'Obtienes competencia con Herramientas de Ladrón.',
      },
      {
        title: 'Distracción',
        description:
          'Cuando realices la acción de Ayudar para asistir la tirada de ataque de un aliado, la criatura a la que distraes puede encontrarse a un máximo de 30 pies de ti en lugar de a 5 pies, siempre que pueda verte u oírte.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'herramientas_ladron' }],
    },
    choices: [],
  },
  {
    slug: 'fiero',
    name: 'Fiero',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'gavel',
    loreDescription:
      'Has aprendido a sacar el máximo partido de tus golpes y a utilizar tus armas para causar heridas especialmente graves.',
    prerequisiteText: 'Fuerza 13.',
    prerequisites: {
      minStats: [{ stat: 'STR', value: 13 }],
    },
    features: [
      {
        title: 'Golpe Certero',
        description:
          'Una vez por turno, cuando impactes a un objetivo con un arma, puedes tirar dos veces los dados de daño del arma y usar cualquiera de los dos resultados.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'estratega',
    name: 'Estratega',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'psychology_alt',
    loreDescription:
      'Has aprendido a interpretar el curso de la batalla, reconocer los errores de tus enemigos y aprovechar cada oportunidad para favorecer a tus compañeros.',
    prerequisiteText: 'Inteligencia 13.',
    prerequisites: {
      minStats: [{ stat: 'INT', value: 13 }],
    },
    features: [
      {
        title: 'Aprovechar el Éxito',
        description:
          'Una vez por turno, cuando consigas un golpe crítico contra una criatura, puedes elegir a un aliado que se encuentre a 30 pies de ti, pueda verte u oírte y no tenga Inspiración Heroica. Ese aliado obtiene Inspiración Heroica.',
      },
      {
        title: 'Detectar una Apertura',
        description:
          'Cuando un enemigo que puedas ver cause daño a un aliado que se encuentre a 5 pies de ti, tienes Ventaja en la siguiente tirada de ataque que realices contra ese enemigo antes del final de tu siguiente turno.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'lider',
    name: 'Líder',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'military_tech',
    loreDescription:
      'Estás acostumbrado a mantener unido a un grupo bajo presión, dando ejemplo y evitando que sus miembros pierdan la posición.',
    prerequisiteText: 'Carisma 13.',
    prerequisites: {
      minStats: [{ stat: 'CHA', value: 13 }],
    },
    features: [
      {
        title: 'Manteneos Unidos',
        description:
          'Cuando un aliado que se encuentre a 5 pies de ti vaya a ser empujado o atraído por un efecto, puedes usar una Reacción para evitar ese desplazamiento. El aliado debe no estar Incapacitado.',
      },
      {
        title: 'En Guardia',
        description:
          'Cuando realices la acción de Preparar, la siguiente tirada de ataque realizada contra ti antes del comienzo de tu siguiente turno tiene Desventaja.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'musico',
    name: 'Músico',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'music_note',
    loreDescription:
      'Has cultivado el arte de la música y aprendido a levantar el ánimo de quienes te rodean con tus interpretaciones.',
    prerequisiteText: 'Carisma 13.',
    prerequisites: {
      minStats: [{ stat: 'CHA', value: 13 }],
    },
    features: [
      {
        title: 'Competencia con Instrumentos',
        description:
          'Obtienes competencia con un Instrumento Musical de tu elección.',
      },
      {
        title: 'Canción Reconfortante',
        description:
          'Al finalizar un Descanso Corto o Largo, puedes tocar una canción con un Instrumento Musical con el que tengas competencia y otorgar Inspiración Heroica a un número de aliados que puedan oírte igual a tu Bonificador de Carisma.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'musico_instrument_choice',
        label: 'Elige un Instrumento Musical',
        type: 'INSTRUMENT_PROFICIENCY',
        count: 1,
        allowedOptions: ['ANY'],
      },
    ],
  },
  {
    slug: 'letrado',
    name: 'Letrado',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'auto_stories',
    loreDescription:
      'Tu afición por la lectura y el estudio te ha enseñado a examinar las cosas con detenimiento, interpretar indicios y descubrir detalles que otros pasan por alto.',
    prerequisiteText: 'Inteligencia 13.',
    prerequisites: {
      minStats: [{ stat: 'INT', value: 13 }],
    },
    features: [
      {
        title: 'Lectura Minuciosa',
        description:
          'Cuando realices la acción de Buscar o Estudiar, puedes obtener Ventaja en una tirada de característica realizada como parte de esa acción. Puedes usar este beneficio un número de veces igual a tu Bonificador de Competencia y recuperas todos los usos gastados al finalizar un Descanso Largo. Si la tirada falla, el uso no se consume.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'orador',
    name: 'Orador',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'record_voice_over',
    loreDescription:
      'Has aprendido a ganarte la atención de los demás y a infundirles determinación con tus palabras cuando llega el momento de actuar.',
    prerequisiteText: 'Carisma 13.',
    prerequisites: {
      minStats: [{ stat: 'CHA', value: 13 }],
    },
    features: [
      {
        title: 'Elocuencia',
        description:
          'Obtienes competencia en una de las siguientes habilidades de tu elección: Interpretación, Perspicacia o Persuasión.',
      },
      {
        title: 'Grito de Guerra',
        description:
          'Cuando tires Iniciativa y no estés Incapacitado, puedes elegir un número de criaturas igual a tu Bonificador de Competencia que puedas ver y que se encuentren a 30 pies de ti. Cada una obtiene Inspiración Heroica. Una vez uses este beneficio, no podrás volver a hacerlo hasta que finalices un Descanso Largo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'orador_skill_choice',
        label: 'Elige una habilidad (Interpretación, Perspicacia o Persuasión)',
        type: 'SKILL_PROFICIENCY',
        count: 1,
        allowedOptions: ['interpretacion', 'perspicacia', 'persuasion'],
      },
    ],
  },
  {
    slug: 'pendenciero',
    name: 'Pendenciero',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'sports_mma',
    loreDescription:
      'Te has acostumbrado a pelear sin depender de armas convencionales, utilizando tus puños y cualquier objeto que tengas a mano.',
    prerequisiteText: 'Fuerza 13.',
    prerequisites: {
      minStats: [{ stat: 'STR', value: 13 }],
    },
    features: [
      {
        title: 'Golpe sin Armas Mejorado',
        description:
          'Cuando impactes con un Golpe sin Armas y causes daño, puedes infligir 1d4 de daño contundente más tu modificador de Fuerza en lugar del daño normal del Golpe sin Armas.',
      },
      {
        title: 'Repetición de Tiradas de Daño',
        description:
          'Siempre que tires un dado de daño para un Golpe sin Armas, puedes volver a tirar el dado si obtienes un 1, y debes usar el nuevo resultado.',
      },
      {
        title: 'Armamento Improvisado',
        description: 'Obtienes competencia con las Armas Improvisadas.',
      },
      {
        title: 'Empujar',
        description:
          'Cuando impactes a una criatura con un Golpe sin Armas como parte de la acción de Ataque durante tu turno, puedes causarle daño y empujarla además 5 pies lejos de ti. Solo puedes usar este beneficio una vez por turno.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'WEAPON', value: 'armas_improvisadas' }],
    },
    choices: [],
  },
  {
    slug: 'rufian',
    name: 'Rufián',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'flash_on',
    loreDescription:
      'Te has curtido en peleas y ambientes donde había que actuar deprisa, aprovechar cualquier descuido y confiar en quienes estaban a tu lado.',
    prerequisiteText: 'Inteligencia 13.',
    prerequisites: {
      minStats: [{ stat: 'INT', value: 13 }],
    },
    features: [
      {
        title: 'Aprovechar la Oportunidad',
        description:
          'Cuando tires los dados de daño de un Ataque de Oportunidad, puedes tirarlos dos veces y usar cualquiera de los dos resultados.',
      },
      {
        title: 'Todos a Una',
        description:
          'Si tienes Inspiración Heroica cuando tires Iniciativa, puedes gastarla para obtener Ventaja en esa tirada y conceder también Ventaja en sus tiradas de Iniciativa a tus aliados.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'sanador',
    name: 'Sanador',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'medical_services',
    loreDescription:
      'Has aprendido a tratar heridas y prestar primeros auxilios incluso en situaciones de peligro.',
    prerequisiteText: 'Sabiduría 13.',
    prerequisites: {
      minStats: [{ stat: 'WIS', value: 13 }],
    },
    features: [
      {
        title: 'Competencia con Material de Curación',
        description: 'Obtienes competencia con Material de Curación.',
      },
      {
        title: 'Médico de Batalla',
        description:
          'Cuando tires uno o más Dados de Golpe para determinar los Puntos de Golpe que recupera una criatura al usar Material de Curación, puedes volver a tirar cualquier resultado de 1. Debes usar los nuevos resultados.',
      },
      {
        title: 'Ahorrar suministros',
        description:
          'Cuando gastes 1 Uso de Material de Curación para Atender Heridas, tira 1d6. Con un resultado de 5 o 6, el Uso no se gasta.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'TOOL', value: 'material_curacion' }],
    },
    choices: [],
  },
  {
    slug: 'superviviente',
    name: 'Superviviente',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: false,
    icon: 'forest',
    loreDescription:
      'Las situaciones difíciles te han enseñado a mantenerte alerta ante el peligro y a sobreponerte cuando otros podrían flaquear.',
    prerequisiteText: 'Sabiduría 13.',
    prerequisites: {
      minStats: [{ stat: 'WIS', value: 13 }],
    },
    features: [
      {
        title: 'Atento',
        description:
          'Siempre que tires Iniciativa, puedes volver a tirar el d20 si el resultado es 9 o menor. Debes usar el nuevo resultado.',
      },
      {
        title: 'Fortalecerte',
        description:
          'Cuando falles una Tirada de Salvación de Sabiduría, puedes usar una Reacción para añadir tu Bonificador de Competencia a la tirada, lo que podría convertir el fallo en un éxito. Una vez uses esta Reacción, no podrás volver a hacerlo hasta que finalices un Descanso Largo.',
      },
    ],
    grants: {},
    choices: [],
  },
  {
    slug: 'versado',
    name: 'Versado',
    category: 'ORIGIN',
    isDefault: true,
    repeatable: true,
    icon: 'school',
    loreDescription:
      'A lo largo de tu vida has adquirido experiencia en distintas disciplinas, oficios y tareas prácticas.',
    prerequisiteText: 'Sabiduría 13.',
    prerequisites: {
      minStats: [{ stat: 'WIS', value: 13 }],
    },
    features: [
      {
        title: 'Competencias',
        description:
          'Obtienes competencia con dos habilidades y una Herramienta a tu elección.',
      },
      {
        title: 'Repetible',
        description: 'Puedes escoger esta dote más de una vez.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'versado_skills_choice',
        label: 'Elige dos habilidades',
        type: 'SKILL_PROFICIENCY',
        count: 2,
        allowedOptions: ['ANY'],
      },
      {
        id: 'versado_tool_choice',
        label: 'Elige una herramienta',
        type: 'TOOL_PROFICIENCY',
        count: 1,
        allowedOptions: ['ANY'],
      },
    ],
  },
];
