import { CompendiumFeat } from '../../schema/wiki/compendium/compendium-feat.schema';

export const DEFAULT_GENERAL_FEATS: Partial<CompendiumFeat>[] = [
  // 1. Abanderado
  {
    slug: 'abanderado',
    name: 'Abanderado',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'flag',
    loreDescription:
      'Tu presencia en el campo de batalla fortalece la determinación de quienes luchan a tu lado y los impulsa a levantarse incluso en los peores momentos.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Carisma en 1, hasta un máximo de 20.',
      },
      {
        title: 'Portaestandarte',
        description:
          'Como Acción Adicional, elige hasta tres aliados que puedas ver a 60 pies de ti y que puedan verte u oírte. Durante 1 minuto, cada objetivo obtiene los siguientes beneficios:\n➔ Puede levantarse si está Derribado gastando solo 5 pies de movimiento.\n➔ Tiene Ventaja en las Tiradas de Salvación de Fuerza y Constitución.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'abanderado_asi',
        label: 'Aumenta Fuerza o Carisma en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'CHA'],
      },
    ],
  },

  // 2. Acechador
  {
    slug: 'acechador',
    name: 'Acechador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'visibility_off',
    loreDescription:
      'Has aprendido a aprovechar la confusión, los obstáculos y los puntos ciegos de tus adversarios para pasar inadvertido incluso durante un enfrentamiento.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Niebla de Guerra',
        description:
          'Tienes Ventaja en cualquier prueba de Destreza (Sigilo) que realices como parte de la acción de Esconderse durante el combate.',
      },
      {
        title: 'Francotirador',
        description:
          'Si realizas una tirada de ataque mientras estás Oculto y fallas, realizar ese ataque no revela tu ubicación.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'acechador_asi',
        label: 'Aumenta Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX'],
      },
    ],
  },

  // 3. Actor
  {
    slug: 'actor',
    name: 'Actor',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'theater_comedy',
    loreDescription:
      'Has perfeccionado tu capacidad para interpretar papeles, imitar a otros y adoptar identidades ajenas.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Carisma en 1, hasta un máximo de 20.',
      },
      {
        title: 'Suplantación',
        description:
          'Mientras estés disfrazado de una persona real o ficticia, tienes Ventaja en las pruebas de Carisma (Engaño o Interpretación) realizadas para convencer a otros de que eres esa persona.',
      },
      {
        title: 'Mimetismo',
        description:
          'Puedes imitar los sonidos de otras criaturas, incluido el habla. Una criatura que oiga la imitación debe superar una prueba de Sabiduría (Perspicacia) para reconocer que es falsa. La CD es igual a 8 + tu modificador de Carisma + tu Bonificador de Competencia.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'actor_asi',
        label: 'Aumenta Carisma en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['CHA'],
      },
    ],
  },

  // 4. Aplastador
  {
    slug: 'aplastador',
    name: 'Aplastador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'gavel',
    loreDescription:
      'Has aprendido a aprovechar los golpes contundentes para desplazar a tus adversarios y dejarlos expuestos a nuevos ataques.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Fuerza o Constitución en 1, hasta un máximo de 20.',
      },
      {
        title: 'Empujar',
        description:
          'Una vez por turno, cuando impactes a una criatura con un ataque que inflija daño contundente, puedes moverla 5 pies hasta un espacio desocupado, siempre que no sea más de un tamaño mayor que tú.',
      },
      {
        title: 'Golpe Crítico Mejorado',
        description:
          'Cuando consigas un golpe crítico que inflija daño contundente a una criatura, las tiradas de ataque contra ella tienen Ventaja hasta el comienzo de tu siguiente turno.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'aplastador_asi',
        label: 'Aumenta Fuerza o Constitución en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'CON'],
      },
    ],
  },

  // 5. Atleta
  {
    slug: 'atleta',
    name: 'Atleta',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'directions_run',
    loreDescription:
      'Tu entrenamiento físico te permite moverte con rapidez y eficacia incluso en situaciones difíciles.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Velocidad de Escalada',
        description: 'Obtienes una Velocidad de Escalada igual a tu Velocidad.',
      },
      {
        title: 'Levantarse',
        description:
          'Cuando estés Derribado, puedes levantarte gastando solo 5 pies de movimiento.',
      },
      {
        title: 'Saltar',
        description:
          'Puedes realizar un salto de longitud o de altura con carrerilla después de moverte solo 5 pies.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'atleta_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 6. Callejero
  {
    slug: 'callejero',
    name: 'Callejero',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'link',
    loreDescription:
      'Has aprendido a imponerte mediante la fuerza, inmovilizar a quienes se resisten y tratar con personas poco dispuestas a colaborar.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Llave de Cabeza',
        description:
          'Tus aliados tienen Ventaja en las tiradas de ataque contra cualquier criatura que tengas Agarrada.',
      },
      {
        title: 'Ataduras Resistentes',
        description:
          'Cuando uses una Cadena, Grilletes o Cuerda para atar a una criatura, añade tu Bonificador de Competencia a la CD para escapar o romper las ataduras.',
      },
      {
        title: 'Conversación Dura',
        description:
          'La actitud Hostil de una criatura no impone Desventaja en tus pruebas de Carisma (Intimidación) realizadas para influir en ella.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'callejero_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 7. Centinela
  {
    slug: 'centinela',
    name: 'Centinela',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'security',
    loreDescription:
      'Has aprendido a mantener a tus adversarios bajo control, castigando cualquier intento de ignorarte o abandonar el combate.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Guardián',
        description:
          'Inmediatamente después de que una criatura que se encuentre a 5 pies de ti realice la acción de Destrabarse o impacte con un ataque a un objetivo distinto de ti, puedes realizar un Ataque de Oportunidad contra esa criatura.',
      },
      {
        title: 'Alto',
        description:
          'Cuando impactes a una criatura con un Ataque de Oportunidad, su Velocidad se convierte en 0 durante el resto del turno actual.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'centinela_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 8. Combate con Montura
  {
    slug: 'combate-con-montura',
    name: 'Combate con Montura',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'pets',
    loreDescription:
      'Has aprendido a combatir desde una montura, aprovechando su tamaño y movimiento mientras la proteges de los peligros del enfrentamiento.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Fuerza, Destreza o Sabiduría en 1, hasta un máximo de 20.',
      },
      {
        title: 'Ataque Montado',
        description:
          'Mientras estés montado, tienes Ventaja en las tiradas de ataque contra cualquier criatura que no esté montada, se encuentre a 5 pies de tu montura y sea al menos un tamaño menor que ella.',
      },
      {
        title: 'Salto a un Lado',
        description:
          'Si tu montura está sujeta a un efecto que le permita realizar una Tirada de Salvación de Destreza para recibir solo la mitad del daño, no recibe daño si supera la tirada y solo la mitad si falla. Para beneficiarse de este rasgo, debes estar montándola y ninguno de los dos puede estar Incapacitado.',
      },
      {
        title: 'Desviar el Golpe',
        description:
          'Mientras estés montado y no estés Incapacitado, puedes hacer que un ataque que impactaría a tu montura te impacte a ti en su lugar.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'combate_montura_asi',
        label: 'Aumenta Fuerza, Destreza o Sabiduría en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'WIS'],
      },
    ],
  },

  // 9. Combatiente Táctico
  {
    slug: 'combatiente-tactico',
    name: 'Combatiente Táctico',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'military_tech',
    loreDescription:
      'Tu experiencia en combate te permite adaptarte rápidamente a situaciones adversas y aprovechar tus aciertos para mantener la iniciativa.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Golpe Amortiguador',
        description:
          'Cuando impactes a una criatura con un arma, puedes obtener una cantidad de Puntos de Golpe Temporales igual al resultado de los dados de daño del arma. Una vez uses este beneficio, no podrás volver a hacerlo hasta que tires Iniciativa o finalices un Descanso Corto o Largo.',
      },
      {
        title: 'Instintos Agudizados',
        description:
          'Cuando falles una prueba de característica, puedes tirar 1d6 y sumar el resultado a la tirada, lo que podría convertir el fallo en un éxito. Una vez uses este beneficio, no podrás volver a hacerlo hasta que tires Iniciativa o finalices un Descanso Corto o Largo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'combatiente_tactico_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 10. Cocinero
  {
    slug: 'cocinero',
    name: 'Cocinero',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'restaurant',
    loreDescription:
      'Has aprendido a preparar comidas capaces de ayudar a tus compañeros a recuperar fuerzas y afrontar mejor las dificultades del camino.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Constitución o Sabiduría en 1, hasta un máximo de 20.',
      },
      {
        title: 'Cocina Reparadora',
        description:
          'Como parte de un Descanso Corto, puedes preparar comida para un número de criaturas igual a 4 + tu Bonificador de Competencia. Una criatura que coma de ella y gaste uno o más Dados de Golpe para recuperar Puntos de Golpe recupera 1d8 Puntos de Golpe adicionales.',
      },
      {
        title: 'Tentempiés',
        description:
          'Con 1 hora de trabajo o al finalizar un Descanso Largo, puedes preparar un número de tentempiés igual a tu Bonificador de Competencia. Una criatura puede usar una Acción Adicional para comer uno y obtener una cantidad de Puntos de Golpe Temporales igual a tu Bonificador de Competencia. Los tentempiés pierden sus propiedades al finalizar tu siguiente Descanso Largo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'cocinero_asi',
        label: 'Aumenta Constitución o Sabiduría en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['CON', 'WIS'],
      },
    ],
  },

  // 11. Cortador
  {
    slug: 'cortador',
    name: 'Cortador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'content_cut',
    loreDescription:
      'Has aprendido a utilizar las armas cortantes para limitar los movimientos de tus adversarios y dejarles heridas difíciles de ignorar.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Corte Incapacitante',
        description:
          'Una vez por turno, cuando impactes a una criatura con un ataque que inflija daño cortante, puedes reducir su Velocidad en 10 pies hasta el comienzo de tu siguiente turno.',
      },
      {
        title: 'Golpe Crítico Mejorado',
        description:
          'Cuando consigas un golpe crítico que inflija daño cortante a una criatura, esta tiene Desventaja en las tiradas de ataque hasta el comienzo de tu siguiente turno.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'cortador_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 12. Curtido
  {
    slug: 'curtido-dote',
    name: 'Curtido',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'health_and_safety',
    loreDescription:
      'Los golpes y las heridas te han enseñado a encajar el castigo y protegerte instintivamente frente a nuevos ataques.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta una puntuación de característica de tu elección en 1, hasta un máximo de 20.',
      },
      {
        title: 'Carne Endurecida',
        description:
          'Inmediatamente después de recibir daño contundente, perforante o cortante, puedes usar una Reacción para obtener Resistencia a ese tipo de daño hasta el comienzo de tu siguiente turno. Una vez uses este beneficio, no podrás volver a hacerlo hasta que finalices un Descanso Corto o Largo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'curtido_asi',
        label: 'Aumenta cualquier característica en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
    ],
  },

  // 13. Doble Empuñadura
  {
    slug: 'doble-empunadura',
    name: 'Doble Empuñadura',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'hardware',
    loreDescription:
      'Has aprendido a combatir eficazmente con un arma en cada mano, alternando ataques con rapidez y soltura.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Doble Empuñadura Mejorada',
        description:
          'Cuando realices la acción de Ataque durante tu turno y ataques con un arma que tenga la propiedad Ligera, puedes realizar un ataque adicional como Acción Adicional más tarde durante ese mismo turno con un arma diferente. Esa arma debe ser un arma cuerpo a cuerpo que no tenga la propiedad A Dos Manos. No añades tu modificador de característica al daño de este ataque adicional, a menos que dicho modificador sea negativo.',
      },
      {
        title: 'Desenfunde Rápido',
        description:
          'Puedes desenfundar o guardar dos armas que no tengan la propiedad A Dos Manos cuando normalmente solo podrías desenfundar o guardar una.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'doble_empunadura_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 14. Duelista Defensivo
  {
    slug: 'duelista-defensivo',
    name: 'Duelista Defensivo',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'shield_moon',
    loreDescription:
      'Has aprendido a utilizar armas ágiles y precisas para desviar los ataques de tus adversarios y mantenerlos a raya.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Parada',
        description:
          'Mientras empuñes un arma con la propiedad Sutileza, cuando otra criatura te impacte con un ataque cuerpo a cuerpo, puedes usar una Reacción para añadir tu Bonificador de Competencia a tu Clase de Armadura, lo que podría hacer que el ataque falle. Conservas este bonificador a la Clase de Armadura contra ataques cuerpo a cuerpo hasta el comienzo de tu siguiente turno.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'duelista_defensivo_asi',
        label: 'Aumenta Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX'],
      },
    ],
  },

  // 15. Embestidor
  {
    slug: 'embestidor',
    name: 'Embestidor',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'double_arrow',
    loreDescription:
      'Has aprendido a aprovechar el impulso de tu movimiento para irrumpir con fuerza en el combate.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Carrera Mejorada',
        description:
          'Cuando realices la acción de Correr, tu Velocidad aumenta en 10 pies durante esa acción.',
      },
      {
        title: 'Carga',
        description:
          'Si te mueves al menos 10 pies en línea recta hacia un objetivo inmediatamente antes de impactarlo con una tirada de ataque cuerpo a cuerpo como parte de la acción de Ataque, elige uno de los siguientes efectos: el ataque inflige 1d8 de daño adicional, o empujas al objetivo hasta 10 pies si no es más de un tamaño mayor que tú. Solo puedes usar este beneficio una vez por turno.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'embestidor_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 16. Entrenamiento con Escudos
  {
    slug: 'entrenamiento-con-escudos',
    name: 'Entrenamiento con Escudos',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'security',
    loreDescription:
      'Has aprendido a protegerte con un escudo y a utilizarlo con eficacia durante el combate.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Entrenamiento con Armadura',
        description: 'Obtienes competencia con Escudos.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'SHIELD', value: 'escudos' }],
    },
    choices: [
      {
        id: 'entrenamiento_escudos_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 17. Entrenamiento con Armadura Media
  {
    slug: 'entrenamiento-con-armadura-media',
    name: 'Entrenamiento con Armadura Media',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'shield',
    loreDescription:
      'Has aprendido a combatir con protecciones más pesadas sin que interfieran con tus movimientos.',
    prerequisiteText: 'Nivel 4 o superior, competencia con Armadura Ligera.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'ARMOR', value: 'armadura_ligera' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Entrenamiento con Armadura',
        description: 'Obtienes competencia con Armadura Media.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'ARMOR', value: 'armadura_media' }],
    },
    choices: [
      {
        id: 'entrenamiento_armadura_media_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 18. Entrenamiento con Armadura Pesada
  {
    slug: 'entrenamiento-con-armadura-pesada',
    name: 'Entrenamiento con Armadura Pesada',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'admin_panel_settings',
    loreDescription:
      'Has aprendido a combatir llevando las protecciones más pesadas sin que su peso y rigidez te impidan actuar con eficacia.',
    prerequisiteText: 'Nivel 4 o superior, competencia con Armadura Media.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'ARMOR', value: 'armadura_media' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Constitución o Fuerza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Entrenamiento con Armadura',
        description: 'Obtienes competencia con Armadura Pesada.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'ARMOR', value: 'armadura_pesada' }],
    },
    choices: [
      {
        id: 'entrenamiento_armadura_pesada_asi',
        label: 'Aumenta Constitución o Fuerza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['CON', 'STR'],
      },
    ],
  },

  // 19. Entrenamiento con Armas Marciales
  {
    slug: 'entrenamiento-con-armas-marciales',
    name: 'Entrenamiento con Armas Marciales',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'hardware',
    loreDescription:
      'Has recibido formación en el manejo de armas de guerra que requieren una instrucción más especializada.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Competencia con Armas',
        description: 'Obtienes competencia con Armas Marciales.',
      },
    ],
    grants: {
      fixedProficiencies: [{ category: 'WEAPON', value: 'armas_marciales' }],
    },
    choices: [
      {
        id: 'entrenamiento_armas_marciales_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 20. Espía Veterano
  {
    slug: 'espia-veterano',
    name: 'Espía Veterano',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'policy',
    loreDescription:
      'Has perfeccionado las técnicas aprendidas durante tu vida clandestina y sabes coordinar tus distracciones con las acciones de tus compañeros.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Destreza o Carisma en 1, hasta un máximo de 20.',
      },
      {
        title: 'Distracción Mordaz',
        description:
          'Cuando realices la acción de Ayudar para asistir la tirada de ataque de un aliado contra una criatura, esa criatura también tiene Desventaja en la primera Tirada de Salvación que realice antes del comienzo de tu siguiente turno.',
      },
      {
        title: 'Inspirar Fortaleza',
        description:
          'Cuando superes una Tirada de Salvación, puedes elegir a un aliado que puedas ver a 30 pies de ti. Ese aliado obtiene Ventaja en la siguiente Tirada de Salvación que realice antes del comienzo de tu siguiente turno.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'espia_veterano_asi',
        label: 'Aumenta Destreza o Carisma en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX', 'CHA'],
      },
    ],
  },

  // 21. Experto en Habilidades
  {
    slug: 'experto-en-habilidades',
    name: 'Experto en Habilidades',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'stars',
    loreDescription:
      'Has dedicado tiempo y esfuerzo a perfeccionar tus capacidades en un campo concreto sin descuidar otras aptitudes.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta una puntuación de característica de tu elección en 1, hasta un máximo de 20.',
      },
      {
        title: 'Competencia en una Habilidad',
        description: 'Obtienes competencia en una habilidad de tu elección.',
      },
      {
        title: 'Pericia',
        description:
          'Elige una habilidad en la que tengas competencia pero no Pericia. Obtienes Pericia en esa habilidad.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'experto_habilidades_asi',
        label: 'Aumenta cualquier característica en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
      {
        id: 'experto_habilidades_proficiency',
        label: 'Elige una habilidad en la que obtener competencia',
        type: 'SKILL_PROFICIENCY',
        count: 1,
        allowedOptions: ['ANY'],
      },
      {
        id: 'experto_habilidades_expertise',
        label: 'Elige una habilidad con competencia para obtener Pericia',
        type: 'SKILL_EXPERTISE',
        count: 1,
        allowedOptions: ['ANY'],
        restrictToProficient: true,
      },
    ],
  },

  // 22. Iniciado en el Combate
  {
    slug: 'iniciado-en-el-combate',
    name: 'Iniciado en el Combate',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'sports_martial_arts',
    loreDescription:
      'Has recibido entrenamiento especializado en una forma concreta de combatir.',
    prerequisiteText: 'Nivel 4 o superior, competencia con armas marciales.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'WEAPON', value: 'armas_marciales' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Estilo de Combate',
        description:
          'Obtienes una Dote de Estilo de Combate de tu elección para la que cumplas los requisitos, ignorando cualquier requisito que exija poseer previamente el rasgo Estilo de Combate.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'iniciado_combate_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
      {
        id: 'iniciado_combate_technique',
        label: 'Elige una Técnica / Dote de Estilo de Combate',
        type: 'COMBAT_TECHNIQUE',
        count: 1,
        allowedOptions: ['ANY'],
      },
    ],
  },

  // 23. Inspirador
  {
    slug: 'inspirador',
    name: 'Inspirador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'campaign',
    loreDescription:
      'Has aprendido a infundir confianza y determinación en quienes te rodean mediante tus palabras, tu presencia o tu ejemplo.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Sabiduría o Carisma en 1, hasta un máximo de 20.',
      },
      {
        title: 'Actuación Inspiradora',
        description:
          'Al finalizar un Descanso Corto o Largo, puedes realizar una actuación inspiradora, como un discurso, una canción o un baile. Elige hasta seis criaturas, incluida tú, que se encuentren a 30 pies de ti y presencien la actuación. Cada criatura elegida obtiene una cantidad de Puntos de Golpe Temporales igual a tu nivel de personaje + el modificador de la característica que aumentaste mediante esta dote.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'inspirador_asi',
        label: 'Aumenta Sabiduría o Carisma en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['WIS', 'CHA'],
      },
    ],
  },

  // 24. Luchador
  {
    slug: 'luchador',
    name: 'Luchador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'sports_mma',
    loreDescription:
      'Has entrenado para dominar a tus adversarios en el combate cuerpo a cuerpo mediante agarres, derribos y fuerza física.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Golpe y Agarre',
        description:
          'Cuando impactes a una criatura con un Golpe sin Armas como parte de la acción de Ataque durante tu turno, puedes usar tanto la opción de daño como la de agarre del Golpe sin Armas. Solo puedes usar este beneficio una vez por turno.',
      },
      {
        title: 'Ventaja de Ataque',
        description:
          'Tienes Ventaja en las tiradas de ataque contra cualquier criatura que tengas Agarrada.',
      },
      {
        title: 'Luchador Rápido',
        description:
          'No necesitas gastar movimiento adicional para mover a una criatura que tengas Agarrada si es de tu tamaño o menor.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'luchador_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 25. Maestro de Armadura Media
  {
    slug: 'maestro-de-armadura-media',
    name: 'Maestro de Armadura Media',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'shield',
    loreDescription:
      'Tu experiencia llevando armaduras medias te permite aprovechar su protección sin renunciar a tu movilidad.',
    prerequisiteText: 'Nivel 4 o superior, Competencia con Armadura Media.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'ARMOR', value: 'armadura_media' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Portador Diestro',
        description:
          'Mientras lleves Armadura Media, puedes añadir hasta 3 a tu Clase de Armadura por tu Destreza en lugar de hasta 2, siempre que tu Destreza sea 16 o superior.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_armadura_media_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 26. Maestro de Armaduras Pesadas
  {
    slug: 'maestro-de-armaduras-pesadas',
    name: 'Maestro de Armaduras Pesadas',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'security',
    loreDescription:
      'Tu experiencia llevando armaduras pesadas te permite recibir los golpes de manera que la propia protección absorba buena parte de su fuerza.',
    prerequisiteText: 'Nivel 4 o superior, Competencia con Armadura Pesada.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'ARMOR', value: 'armadura_pesada' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Constitución o Fuerza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Reducción de Daño',
        description:
          'Cuando un ataque te impacte mientras llevas Armadura Pesada, cualquier daño contundente, perforante o cortante que te inflija ese ataque se reduce en una cantidad igual a tu Bonificador de Competencia.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_armadura_pesada_asi',
        label: 'Aumenta Constitución o Fuerza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['CON', 'STR'],
      },
    ],
  },

  // 27. Maestro de Armas
  {
    slug: 'maestro-de-armas',
    name: 'Maestro de Armas',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'hardware',
    loreDescription:
      'Has dedicado parte de tu entrenamiento a dominar las particularidades de distintas armas y adaptar tu técnica a ellas.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Propiedad de Maestría',
        description:
          'Puedes usar la propiedad de Maestría de un tipo de Arma Simple o Marcial de tu elección con la que tengas competencia. Cada vez que finalices un Descanso Largo, puedes sustituir el tipo de arma elegido por otro que cumpla estos requisitos.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_armas_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
      {
        id: 'maestro_armas_mastery',
        label: 'Elige un tipo de Arma Simple o Marcial para Propiedad de Maestría',
        type: 'WEAPON_MASTERY',
        count: 1,
        allowedOptions: ['ANY'],
      },
    ],
  },

  // 28. Maestro de Armas de Asta
  {
    slug: 'maestro-de-armas-de-asta',
    name: 'Maestro de Armas de Asta',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'straighten',
    loreDescription:
      'Has dominado el combate con armas largas, aprovechando tanto sus extremos como la distancia que permiten mantener frente al adversario.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Golpe con el Asta',
        description:
          'Inmediatamente después de realizar la acción de Ataque y atacar con un bastón, una lanza o un arma que tenga las propiedades Pesada y Alcance, puedes usar una Acción Adicional para realizar un ataque cuerpo a cuerpo con el extremo opuesto del arma. Este ataque inflige daño contundente y su dado de daño es 1d4.',
      },
      {
        title: 'Golpe Reactivo',
        description:
          'Mientras empuñes un bastón, una lanza o un arma que tenga las propiedades Pesada y Alcance, puedes usar una Reacción para realizar un ataque cuerpo a cuerpo contra una criatura que entre en el alcance que tienes con esa arma.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_armas_asta_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 29. Maestro de Armas Pesadas
  {
    slug: 'maestro-de-armas-pesadas',
    name: 'Maestro de Armas Pesadas',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'fitness_center',
    loreDescription:
      'Has aprendido a aprovechar el peso y la potencia de las armas más grandes para descargar golpes devastadores.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Dominio de Armas Pesadas',
        description:
          'Cuando impactes a una criatura con un arma que tenga la propiedad Pesada como parte de la acción de Ataque durante tu turno, puedes hacer que el ataque inflija daño adicional igual a tu Bonificador de Competencia.',
      },
      {
        title: 'Remate',
        description:
          'Inmediatamente después de conseguir un golpe crítico con un arma cuerpo a cuerpo o reducir a una criatura a 0 Puntos de Golpe con una, puedes realizar un ataque con esa misma arma como Acción Adicional.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_armas_pesadas_asi',
        label: 'Aumenta Fuerza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR'],
      },
    ],
  },

  // 30. Maestro del Escudo
  {
    slug: 'maestro-del-escudo',
    name: 'Maestro del Escudo',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'verified_user',
    loreDescription:
      'Has aprendido a utilizar el escudo como una parte activa de tu forma de combatir, tanto para controlar al adversario como para protegerte.',
    prerequisiteText: 'Nivel 4 o superior, competencia con Escudos.',
    prerequisites: {
      minLevel: 4,
      requiredProficiencies: [{ category: 'SHIELD', value: 'escudos' }],
    },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Golpe de Escudo',
        description:
          'Cuando impactes a una criatura que se encuentre a 5 pies de ti con un arma cuerpo a cuerpo como parte de la acción de Ataque, puedes golpearla inmediatamente con tu escudo. El objetivo debe superar una Tirada de Salvación de Fuerza con CD igual a 8 + tu modificador de Fuerza + tu Bonificador de Competencia. Si falla, eliges entre empujarlo 5 pies lejos de ti o dejarlo Derribado. Solo puedes usar este beneficio una vez por turno.',
      },
      {
        title: 'Escudo de Interposición',
        description:
          'Cuando estés sujeto a un efecto que te permita realizar una Tirada de Salvación de Destreza para recibir solo la mitad del daño, puedes usar una Reacción para no recibir daño si superas la tirada, siempre que lleves un escudo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'maestro_escudo_asi',
        label: 'Aumenta Fuerza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR'],
      },
    ],
  },

  // 31. Mejora de Característica
  {
    slug: 'mejora-de-caracteristica',
    name: 'Mejora de Característica',
    category: 'GENERAL',
    isDefault: true,
    repeatable: true,
    icon: 'trending_up',
    loreDescription:
      'Has desarrollado tus capacidades mediante entrenamiento, experiencia o dedicación continuada.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Mejora de Característica',
        description:
          'Aumenta una puntuación de característica de tu elección en 2, o aumenta dos puntuaciones de característica de tu elección en 1. Esta dote no puede aumentar una puntuación de característica por encima de 20.',
      },
      {
        title: 'Repetible',
        description: 'Puedes escoger esta dote más de una vez.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'mejora_caracteristica_asi_1',
        label: 'Aumenta una característica en +1 (o dos veces la misma para +2, máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 2,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
    ],
  },

  // 32. Mente Aguda
  {
    slug: 'mente-aguda',
    name: 'Mente Aguda',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'psychology',
    loreDescription:
      'Has cultivado una mente disciplinada, capaz de retener conocimientos y analizar rápidamente aquello que tienes delante.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Inteligencia en 1, hasta un máximo de 20.',
      },
      {
        title: 'Conocimientos',
        description:
          'Elige una de las siguientes habilidades: Arcanos, Historia, Investigación, Naturaleza o Religión. Si no tienes competencia en la habilidad elegida, la obtienes. Si ya tienes competencia, obtienes Pericia en ella.',
      },
      {
        title: 'Estudio Rápido',
        description:
          'Puedes realizar la acción de Estudiar como Acción Adicional.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'mente_aguda_asi',
        label: 'Aumenta Inteligencia en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['INT'],
      },
      {
        id: 'mente_aguda_skill_or_expertise',
        label:
          'Elige una habilidad (Arcana, Historia, Investigación, Naturaleza o Religión) para Competencia o Pericia',
        type: 'SKILL_PROFICIENCY_OR_EXPERTISE',
        count: 1,
        allowedOptions: [
          'arcana',
          'historia',
          'investigacion',
          'naturaleza',
          'religion',
        ],
      },
    ],
  },

  // 33. Observador
  {
    slug: 'observador',
    name: 'Observador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'search',
    loreDescription:
      'Has desarrollado una especial atención a cuanto te rodea y sabes reparar rápidamente en detalles que otros pasarían por alto.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Inteligencia o Sabiduría en 1, hasta un máximo de 20.',
      },
      {
        title: 'Observador Perspicaz',
        description:
          'Elige una de las siguientes habilidades: Investigación, Percepción o Perspicacia. Si no tienes competencia en la habilidad elegida, la obtienes. Si ya tienes competencia, obtienes Pericia en ella.',
      },
      {
        title: 'Búsqueda Rápida',
        description:
          'Puedes realizar la acción de Buscar como Acción Adicional.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'observador_asi',
        label: 'Aumenta Inteligencia o Sabiduría en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['INT', 'WIS'],
      },
      {
        id: 'observador_skill_or_expertise',
        label:
          'Elige una habilidad (Investigación, Percepción o Perspicacia) para Competencia o Pericia',
        type: 'SKILL_PROFICIENCY_OR_EXPERTISE',
        count: 1,
        allowedOptions: ['investigacion', 'percepcion', 'perspicacia'],
      },
    ],
  },

  // 34. Perforador
  {
    slug: 'perforador',
    name: 'Perforador',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'call_made',
    loreDescription:
      'Has aprendido a aprovechar al máximo las armas capaces de penetrar las defensas de tus adversarios.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Perforación',
        description:
          'Una vez por turno, cuando impactes a una criatura con un ataque que inflija daño perforante, puedes volver a tirar uno de los dados de daño del ataque y debes usar el nuevo resultado.',
      },
      {
        title: 'Golpe Crítico Mejorado',
        description:
          'Cuando consigas un golpe crítico que inflija daño perforante a una criatura, puedes tirar un dado de daño adicional al determinar el daño perforante adicional causado por el golpe crítico.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'perforador_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },

  // 35. Resiliente
  {
    slug: 'resiliente',
    name: 'Resiliente',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'verified_user',
    loreDescription:
      'Has fortalecido uno de tus puntos débiles mediante entrenamiento, disciplina o experiencia.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Elige una característica en cuyas Tiradas de Salvación no tengas competencia. Aumenta esa característica en 1, hasta un máximo de 20.',
      },
      {
        title: 'Competencia en Tiradas de Salvación',
        description:
          'Obtienes competencia en las Tiradas de Salvación de la característica elegida.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'resiliente_save_and_asi',
        label:
          'Elige una característica sin competencia en Tiradas de Salvación (+1 a la característica y competencia en su Salvación)',
        type: 'SAVING_THROW_PROFICIENCY',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
    ],
  },

  // 36. Tácticas de Rufián
  {
    slug: 'tacticas-de-rufian',
    name: 'Tácticas de Rufián',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'bolt',
    loreDescription:
      'Tu experiencia en peleas y trabajos peligrosos te ha enseñado a devolver los golpes y adaptar tus habilidades a las necesidades de cada situación.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Destreza o Carisma en 1, hasta un máximo de 20.',
      },
      {
        title: 'Contraataque',
        description:
          'Inmediatamente después de que una criatura que se encuentre a 5 pies de ti te impacte con un ataque cuerpo a cuerpo, puedes realizar un Ataque de Oportunidad contra ella.',
      },
      {
        title: 'Mercenario Versátil',
        description:
          'Al finalizar un Descanso Largo, elige una habilidad en la que tengas competencia. Obtienes Pericia en esa habilidad hasta que finalices tu siguiente Descanso Largo.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'tacticas_rufian_asi',
        label: 'Aumenta Destreza o Carisma en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX', 'CHA'],
      },
    ],
  },

  // 37. Tenaz
  {
    slug: 'tenaz',
    name: 'Tenaz',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'favorite',
    loreDescription:
      'Tu resistencia física y capacidad para recuperarte de las heridas te permiten seguir adelante cuando otros caerían.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Constitución en 1, hasta un máximo de 20.',
      },
      {
        title: 'Desafiar a la Muerte',
        description:
          'Tienes Ventaja en las Tiradas de Salvación contra la Muerte.',
      },
      {
        title: 'Recuperación Rápida',
        description:
          'Como Acción Adicional, puedes gastar uno de tus Dados de Golpe, tirar el dado y recuperar una cantidad de Puntos de Golpe igual al resultado.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'tenaz_asi',
        label: 'Aumenta Constitución en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['CON'],
      },
    ],
  },

  // 38. Tirador Experto
  {
    slug: 'tirador-experto',
    name: 'Tirador Experto',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'gps_fixed',
    loreDescription:
      'Has perfeccionado el uso de las armas a distancia hasta ser capaz de disparar con precisión en circunstancias especialmente difíciles.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Ignorar Cobertura',
        description:
          'Tus ataques a distancia con armas ignoran la Cobertura Media y la Cobertura de Tres Cuartos.',
      },
      {
        title: 'Disparar en Combate Cuerpo a Cuerpo',
        description:
          'Tener un enemigo a 5 pies de ti no impone Desventaja en tus tiradas de ataque con armas a distancia.',
      },
      {
        title: 'Disparos Lejanos',
        description:
          'Atacar a larga distancia no impone Desventaja en tus tiradas de ataque con armas a distancia.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'tirador_experto_asi',
        label: 'Aumenta Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX'],
      },
    ],
  },

  // 39. Veloz
  {
    slug: 'veloz-dote',
    name: 'Veloz',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'speed',
    loreDescription:
      'Tu entrenamiento y resistencia te permiten desplazarte con rapidez incluso por terrenos difíciles o bajo la presión de tus adversarios.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description:
          'Aumenta tu Destreza o Constitución en 1, hasta un máximo de 20.',
      },
      {
        title: 'Aumento de Velocidad',
        description: 'Tu Velocidad aumenta en 10 pies.',
      },
      {
        title: 'Carrera sobre Terreno Difícil',
        description:
          'Cuando realices la acción de Correr durante tu turno, el Terreno Difícil no te cuesta movimiento adicional durante el resto de ese turno.',
      },
      {
        title: 'Movimiento Ágil',
        description:
          'Los Ataques de Oportunidad realizados contra ti tienen Desventaja.',
      },
    ],
    grants: {
      speedBonus: 10,
    },
    choices: [
      {
        id: 'veloz_dote_asi',
        label: 'Aumenta Destreza o Constitución en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['DEX', 'CON'],
      },
    ],
  },

  // 40. Veterano
  {
    slug: 'veterano',
    name: 'Veterano',
    category: 'GENERAL',
    isDefault: true,
    repeatable: false,
    icon: 'workspace_premium',
    loreDescription:
      'Has sobrevivido a suficientes enfrentamientos como para mantener la determinación cuando las fuerzas empiezan a faltar y transmitir esa confianza a quienes luchan contigo.',
    prerequisiteText: 'Nivel 4 o superior.',
    prerequisites: { minLevel: 4 },
    features: [
      {
        title: 'Aumento de Característica',
        description: 'Aumenta tu Fuerza o Destreza en 1, hasta un máximo de 20.',
      },
      {
        title: 'Animar a un Aliado',
        description:
          'Como Acción Adicional, elige a un aliado que puedas ver a 30 pies de ti. Ese aliado obtiene una cantidad de Puntos de Golpe Temporales igual a 2d6 + el modificador de la característica aumentada mediante esta dote. Puedes usar esta Acción Adicional un número de veces igual a tu Bonificador de Competencia y recuperas todos los usos gastados al finalizar un Descanso Largo.',
      },
      {
        title: 'Última Resistencia',
        description:
          'Tienes Ventaja en las tiradas de ataque mientras estés Herido.',
      },
    ],
    grants: {},
    choices: [
      {
        id: 'veterano_asi',
        label: 'Aumenta Fuerza o Destreza en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX'],
      },
    ],
  },
];
