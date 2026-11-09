import { CompendiumFeat } from '../../schema/wiki/compendium/compendium-feat.schema';

/**
 * Tecnicas de Combate. Viven en la misma coleccion que las dotes, con
 * category 'COMBAT_TECHNIQUE', y se piden con
 * /compendium/feats?category=COMBAT_TECHNIQUE.
 *
 * Las piden tres sitios: Versatil nivel 1, Hombre de Armas nivel 6 y la
 * dote general 'Iniciado en el Combate'.
 *
 * Tiro con Arco, Defensa, Combate con Armas a Dos Manos y Combate con Dos
 * Armas estan adaptadas del System Reference Document 5.2, (c) Wizards of
 * the Coast LLC, bajo Creative Commons Attribution 4.0 International.
 * Traduccion propia. Las otras seis estan redactadas de cero a partir de la
 * mecanica.
 */
export const DEFAULT_COMBAT_TECHNIQUES: Partial<CompendiumFeat>[] = [
  {
    slug: 'tiro-con-arco',
    name: 'Tiro con Arco',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'crisis_alert',
    loreDescription:
      'Has dedicado incontables horas a la puntería, hasta que acertar a distancia se ha vuelto algo natural para ti.',
    features: [
      {
        title: 'Puntería',
        description:
          'Obtienes un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia.',
      },
    ],
    grants: {
      rangedAttackBonus: 2,
    },
  },
  {
    slug: 'defensa',
    name: 'Defensa',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'add_moderator',
    loreDescription:
      'Sabes sacar partido de tu protección, moviéndote con ella en lugar de cargar con su peso.',
    features: [
      {
        title: 'Protección Mejorada',
        description:
          'Obtienes un bonificador de +1 a tu Clase de Armadura mientras lleves puesta una armadura Ligera, Media o Pesada.',
      },
    ],
    grants: {
      acBonusWhileArmored: 1,
    },
  },
  {
    slug: 'combate-con-armas-a-dos-manos',
    name: 'Combate con Armas a Dos Manos',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'sports_hockey',
    loreDescription:
      'Has aprendido a imprimir todo tu peso en cada golpe, de modo que incluso los ataques peor dirigidos hacen daño.',
    features: [
      {
        title: 'Golpe Contundente',
        description:
          'Cuando tires el daño de un ataque cuerpo a cuerpo con un arma que empuñes con las dos manos, puedes tratar un resultado de 1 o 2 en cualquier dado de daño como si fuera un 3. El arma debe tener la propiedad A Dos Manos o Versátil.',
      },
    ],
  },
  {
    slug: 'combate-con-dos-armas',
    name: 'Combate con Dos Armas',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'call_split',
    loreDescription:
      'Has entrenado hasta que ambas manos golpean con la misma convicción.',
    features: [
      {
        title: 'Mano Torpe',
        description:
          'Cuando realices un ataque adicional con un arma que tenga la propiedad Ligera, puedes añadir tu modificador de característica al daño de ese ataque si no lo estás añadiendo ya.',
      },
    ],
  },
  {
    slug: 'duelo',
    name: 'Duelo',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'center_focus_strong',
    loreDescription:
      'Prefieres la precisión al alcance: un arma, una mano libre y toda tu atención puesta en un solo adversario.',
    features: [
      {
        title: 'Esgrima Precisa',
        description:
          'Mientras empuñes un arma cuerpo a cuerpo en una mano y no empuñes ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma.',
      },
    ],
    grants: {
      duelingDamageBonus: 2,
    },
  },
  {
    slug: 'proteccion',
    name: 'Protección',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'front_hand',
    loreDescription:
      'Interpones tu escudo por quienes luchan a tu lado antes que por ti mismo.',
    prerequisiteText: 'Requiere competencia con Escudos.',
    prerequisites: {
      requiredProficiencies: [
        { category: 'SHIELD', value: 'escudos' },
      ],
    },
    features: [
      {
        title: 'Interponerse',
        description:
          'Cuando una criatura que puedas ver ataque a un objetivo que no seas tú y que esté a 5 pies o menos de ti, puedes usar tu Reacción para imponer Desventaja a esa tirada de ataque. Debes estar empuñando un Escudo.',
      },
    ],
  },
  {
    slug: 'intercepcion',
    name: 'Intercepción',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'block',
    loreDescription:
      'Has aprendido a desviar en el último instante los golpes que iban dirigidos a tus compañeros.',
    prerequisiteText: 'Requiere empuñar un arma o un Escudo.',
    features: [
      {
        title: 'Desviar el Golpe',
        description:
          'Cuando una criatura que puedas ver impacte con un ataque a un objetivo que no seas tú y que esté a 5 pies o menos de ti, puedes usar tu Reacción para reducir el daño recibido por el objetivo en 1d10 + tu Bonificador de Competencia (hasta un mínimo de 0). Debes estar empuñando un Escudo o un arma Sencilla o Marcial.',
      },
    ],
  },
  {
    slug: 'combate-a-ciegas',
    name: 'Combate a Ciegas',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'hearing',
    loreDescription:
      'Has entrenado a oscuras hasta no necesitar los ojos para saber dónde está tu enemigo.',
    features: [
      {
        title: 'Percepción Ciega',
        description:
          'Tienes Visión Ciega con un alcance de 10 pies. Dentro de ese alcance, puedes ver eficazmente cualquier cosa que no esté tras una Cobertura Total, incluso si estás Cegado o en la Oscuridad. Además, puedes ver a una criatura Invisible dentro de ese alcance, salvo que consiga Ocultarse de ti.',
      },
    ],
    grants: {
      blindsight: 10,
    },
  },
  {
    slug: 'combate-con-armas-arrojadizas',
    name: 'Combate con Armas Arrojadizas',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'sports_handball',
    loreDescription:
      'Lanzar es para ti otra forma de golpear, y rara vez se te acaban las cosas que arrojar.',
    features: [
      {
        title: 'Lanzamiento Certero',
        description:
          'Cuando impactes con un ataque a distancia usando un arma que tenga la propiedad Arrojadiza, obtienes un bonificador de +2 a la tirada de daño.',
      },
    ],
    grants: {
      thrownDamageBonus: 2,
    },
  },
  {
    slug: 'combate-sin-armas',
    name: 'Combate sin Armas',
    category: 'COMBAT_TECHNIQUE',
    isDefault: true,
    repeatable: false,
    icon: 'pan_tool',
    loreDescription:
      'Tus manos son tu arma, y sabes sacarles más partido que muchos a su acero.',
    features: [
      {
        title: 'Puños Curtidos',
        description:
          'Tus Golpes sin Armas pueden infligir daño contundente igual a 1d6 + tu modificador de Fuerza cuando impactas. Si no empuñas ningún arma ni Escudo cuando realizas la tirada de ataque, el dado pasa a ser 1d8.',
      },
      {
        title: 'Presa Asfixiante',
        description:
          'Al comienzo de cada uno de tus turnos, puedes infligir 1d4 de daño contundente a una criatura que tengas Agarrada.',
      },
    ],
  },
];
