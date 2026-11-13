import { CompendiumItem } from '../../schema/wiki/compendium/compendium-item.schema';

/**
 * El equipo de Mythera.
 *
 * Fuente: el documento EQUIPO Y TESOROS de la mesa. NO es el SRD: las
 * maestrias, los alcances, los precios y la lista de objetos son propios.
 *
 * Cambios frente a la version anterior, por si alguien se encuentra esto sin
 * contexto:
 *
 *   - Las ocho maestrias se llaman Acoso, Ataque Rapido, Derribo,
 *     Desequilibrar, Empuje, Frenar, Hendedura y Refilon. Viven en
 *     COMPENDIUM_CATALOGS.masteries.
 *   - Los alcances van en PIES, igual que el resto de distancias del
 *     compendio. Antes estaban en metros y era el unico sitio que no
 *     cuadraba.
 *   - Ya no hay lista de equipo de aventura, ni herramientas sueltas, ni
 *     instrumentos sueltos, ni paquetes. Los sustituyen seis Herramientas y
 *     Materiales con 10 usos cada una.
 *   - Todo se paga en piezas de oro. costInCopper se mantiene para ordenar y
 *     filtrar, y es siempre el precio en oro por 100.
 *
 * Los campos sueltos (light, finesse, thrown, rangeNormal...) estan a
 * proposito: la ficha necesita calcular el ataque y el dano, y sacarlo con
 * expresiones regulares del texto de properties es fragil. El texto queda
 * para mostrar; los campos, para calcular.
 */

type Semilla = Partial<CompendiumItem> & { slug: string; name: string };

const po = (n: number) => ({ cost: `${n} po`, costInCopper: n * 100 });

// --- armas simples cuerpo a cuerpo ------------------------------------------
const ARMAS_SIMPLES_CC: Semilla[] = [
  {
    slug: 'baston',
    name: 'Bastón',
    damage: '1d6',
    damageType: 'contundente',
    properties: ['Versátil (1d8)'],
    versatileDamage: '1d8',
    mastery: 'derribo',
    ...po(2),
  },
  {
    slug: 'daga',
    name: 'Daga',
    damage: '1d4',
    damageType: 'perforante',
    properties: ['Sutil', 'Ligera', 'Arrojadiza (20/60)'],
    finesse: true,
    light: true,
    thrown: true,
    rangeNormal: 20,
    rangeMax: 60,
    mastery: 'ataque-rapido',
    ...po(2),
  },
  {
    slug: 'garrote',
    name: 'Garrote',
    damage: '1d4',
    damageType: 'contundente',
    properties: ['Ligera'],
    light: true,
    mastery: 'frenar',
    ...po(1),
  },
  {
    slug: 'garrote-pesado',
    name: 'Garrote pesado',
    damage: '1d8',
    damageType: 'contundente',
    properties: ['A Dos Manos'],
    twoHanded: true,
    mastery: 'empuje',
    ...po(2),
  },
  {
    slug: 'hacha-de-mano',
    name: 'Hacha de mano',
    damage: '1d6',
    damageType: 'cortante',
    properties: ['Ligera', 'Arrojadiza (20/60)'],
    light: true,
    thrown: true,
    rangeNormal: 20,
    rangeMax: 60,
    mastery: 'acoso',
    ...po(5),
  },
  {
    slug: 'hoz',
    name: 'Hoz',
    damage: '1d4',
    damageType: 'cortante',
    properties: ['Ligera'],
    light: true,
    mastery: 'ataque-rapido',
    ...po(1),
  },
  {
    slug: 'jabalina',
    name: 'Jabalina',
    damage: '1d6',
    damageType: 'perforante',
    properties: ['Arrojadiza (30/120)'],
    thrown: true,
    rangeNormal: 30,
    rangeMax: 120,
    mastery: 'frenar',
    ...po(1),
  },
  {
    slug: 'lanza',
    name: 'Lanza',
    damage: '1d6',
    damageType: 'perforante',
    properties: ['Arrojadiza (20/60)', 'Versátil (1d8)'],
    thrown: true,
    rangeNormal: 20,
    rangeMax: 60,
    versatileDamage: '1d8',
    mastery: 'desequilibrar',
    ...po(1),
  },
  {
    slug: 'martillo-ligero',
    name: 'Martillo ligero',
    damage: '1d4',
    damageType: 'contundente',
    properties: ['Ligera', 'Arrojadiza (20/60)'],
    light: true,
    thrown: true,
    rangeNormal: 20,
    rangeMax: 60,
    mastery: 'ataque-rapido',
    ...po(2),
  },
  {
    slug: 'maza',
    name: 'Maza',
    damage: '1d6',
    damageType: 'contundente',
    properties: [],
    mastery: 'desequilibrar',
    ...po(5),
  },
];

// --- armas simples a distancia ----------------------------------------------
const ARMAS_SIMPLES_DIST: Semilla[] = [
  {
    slug: 'arco-corto',
    name: 'Arco corto',
    damage: '1d6',
    damageType: 'perforante',
    properties: ['Munición (80/320)', 'A Dos Manos'],
    ammunition: true,
    twoHanded: true,
    rangeNormal: 80,
    rangeMax: 320,
    mastery: 'acoso',
    ...po(25),
  },
  {
    slug: 'ballesta-ligera',
    name: 'Ballesta ligera',
    damage: '1d8',
    damageType: 'perforante',
    properties: ['Munición (80/320)', 'Recarga', 'A Dos Manos'],
    ammunition: true,
    loading: true,
    twoHanded: true,
    rangeNormal: 80,
    rangeMax: 320,
    mastery: 'frenar',
    ...po(25),
  },
  {
    slug: 'dardo',
    name: 'Dardo',
    damage: '1d4',
    damageType: 'perforante',
    properties: ['Sutil', 'Arrojadiza (20/60)'],
    finesse: true,
    thrown: true,
    rangeNormal: 20,
    rangeMax: 60,
    mastery: 'acoso',
    ...po(1),
  },
  {
    slug: 'honda',
    name: 'Honda',
    damage: '1d4',
    damageType: 'contundente',
    properties: ['Munición (30/120)'],
    ammunition: true,
    rangeNormal: 30,
    rangeMax: 120,
    mastery: 'frenar',
    ...po(1),
  },
];

// --- armas marciales cuerpo a cuerpo ----------------------------------------
const ARMAS_MARCIALES_CC: Semilla[] = [
  {
    slug: 'alabarda',
    name: 'Alabarda',
    damage: '1d10',
    damageType: 'cortante',
    properties: ['Pesada', 'Alcance', 'A Dos Manos'],
    heavy: true,
    reach: true,
    twoHanded: true,
    mastery: 'hendedura',
    ...po(20),
  },
  {
    slug: 'espada-corta',
    name: 'Espada corta',
    damage: '1d6',
    damageType: 'perforante',
    properties: ['Sutil', 'Ligera'],
    finesse: true,
    light: true,
    mastery: 'acoso',
    ...po(10),
  },
  {
    slug: 'espada-curva',
    name: 'Espada curva',
    damage: '1d6',
    damageType: 'cortante',
    properties: ['Sutil', 'Ligera'],
    finesse: true,
    light: true,
    mastery: 'ataque-rapido',
    ...po(25),
  },
  {
    slug: 'espada-larga',
    name: 'Espada larga',
    damage: '1d8',
    damageType: 'cortante',
    properties: ['Versátil (1d10)'],
    versatileDamage: '1d10',
    mastery: 'desequilibrar',
    ...po(15),
  },
  {
    slug: 'espadon',
    name: 'Espadón',
    damage: '2d6',
    damageType: 'cortante',
    properties: ['Pesada', 'A Dos Manos'],
    heavy: true,
    twoHanded: true,
    mastery: 'refilon',
    ...po(50),
  },
  {
    slug: 'estoque',
    name: 'Estoque',
    damage: '1d8',
    damageType: 'perforante',
    properties: ['Sutil'],
    finesse: true,
    mastery: 'acoso',
    ...po(25),
  },
  {
    slug: 'gran-hacha',
    name: 'Gran hacha',
    damage: '1d12',
    damageType: 'cortante',
    properties: ['Pesada', 'A Dos Manos'],
    heavy: true,
    twoHanded: true,
    mastery: 'hendedura',
    ...po(30),
  },
  {
    slug: 'gran-martillo',
    name: 'Gran martillo',
    damage: '2d6',
    damageType: 'contundente',
    properties: ['Pesada', 'A Dos Manos'],
    heavy: true,
    twoHanded: true,
    mastery: 'derribo',
    ...po(30),
  },
  {
    slug: 'guja',
    name: 'Guja',
    damage: '1d10',
    damageType: 'cortante',
    properties: ['Pesada', 'Alcance', 'A Dos Manos'],
    heavy: true,
    reach: true,
    twoHanded: true,
    mastery: 'refilon',
    ...po(20),
  },
  {
    slug: 'hacha-de-guerra',
    name: 'Hacha de guerra',
    damage: '1d8',
    damageType: 'cortante',
    properties: ['Versátil (1d10)'],
    versatileDamage: '1d10',
    mastery: 'derribo',
    ...po(10),
  },
  {
    slug: 'lanza-de-caballeria',
    name: 'Lanza de caballería',
    damage: '1d10',
    damageType: 'perforante',
    properties: ['Pesada', 'Alcance', 'A Dos Manos'],
    heavy: true,
    reach: true,
    twoHanded: true,
    // Montado se puede usar con una mano. No es un campo: es una excepcion
    // que decide la mesa, y por eso va en la nota y no en la mecanica.
    notes: 'Puede utilizarse con una mano mientras estás montado.',
    mastery: 'derribo',
    ...po(10),
  },
  {
    slug: 'latigo',
    name: 'Látigo',
    damage: '1d4',
    damageType: 'cortante',
    properties: ['Sutil', 'Alcance'],
    finesse: true,
    reach: true,
    mastery: 'frenar',
    ...po(2),
  },
  {
    slug: 'lucero-del-alba',
    name: 'Lucero del alba',
    damage: '1d8',
    damageType: 'perforante',
    properties: [],
    mastery: 'desequilibrar',
    ...po(15),
  },
  {
    slug: 'mangual',
    name: 'Mangual',
    damage: '1d8',
    damageType: 'contundente',
    properties: [],
    mastery: 'desequilibrar',
    ...po(10),
  },
  {
    slug: 'martillo-de-guerra',
    name: 'Martillo de guerra',
    damage: '1d8',
    damageType: 'contundente',
    properties: ['Versátil (1d10)'],
    versatileDamage: '1d10',
    mastery: 'empuje',
    ...po(15),
  },
  {
    slug: 'pica',
    name: 'Pica',
    damage: '1d10',
    damageType: 'perforante',
    properties: ['Pesada', 'Alcance', 'A Dos Manos'],
    heavy: true,
    reach: true,
    twoHanded: true,
    mastery: 'empuje',
    ...po(20),
  },
  {
    slug: 'pico-de-guerra',
    name: 'Pico de guerra',
    damage: '1d8',
    damageType: 'perforante',
    properties: ['Versátil (1d10)'],
    versatileDamage: '1d10',
    mastery: 'desequilibrar',
    ...po(5),
  },
];

// --- armas marciales a distancia --------------------------------------------
const ARMAS_MARCIALES_DIST: Semilla[] = [
  {
    slug: 'arco-largo',
    name: 'Arco largo',
    damage: '1d8',
    damageType: 'perforante',
    properties: ['Munición (150/600)', 'Pesada', 'A Dos Manos'],
    ammunition: true,
    heavy: true,
    twoHanded: true,
    rangeNormal: 150,
    rangeMax: 600,
    mastery: 'frenar',
    ...po(50),
  },
  {
    slug: 'ballesta-de-mano',
    name: 'Ballesta de mano',
    damage: '1d6',
    damageType: 'perforante',
    properties: ['Munición (30/120)', 'Ligera', 'Recarga'],
    ammunition: true,
    light: true,
    loading: true,
    rangeNormal: 30,
    rangeMax: 120,
    mastery: 'acoso',
    ...po(75),
  },
  {
    slug: 'ballesta-pesada',
    name: 'Ballesta pesada',
    damage: '1d10',
    damageType: 'perforante',
    properties: ['Munición (100/400)', 'Pesada', 'Recarga', 'A Dos Manos'],
    ammunition: true,
    heavy: true,
    loading: true,
    twoHanded: true,
    rangeNormal: 100,
    rangeMax: 400,
    mastery: 'empuje',
    ...po(50),
  },
];

// --- municion ---------------------------------------------------------------
const MUNICION: Semilla[] = [
  { slug: 'balas-de-honda', name: 'Balas de honda', amount: 20, ...po(1) },
  { slug: 'flechas', name: 'Flechas', amount: 20, ...po(1) },
  { slug: 'virotes-de-ballesta', name: 'Virotes de ballesta', amount: 20, ...po(1) },
];

// --- armaduras --------------------------------------------------------------
// Ligeras: suman el modificador de Destreza entero.
// Medias: lo limitan a +2, y un modificador negativo si resta.
// Pesadas: lo ignoran en los dos sentidos. Una cota de malla da 16 con
// Destreza 8 y con Destreza 18, de ahi ignoresDex.
const ARMADURAS: Semilla[] = [
  {
    slug: 'acolchada',
    name: 'Acolchada',
    armorType: 'Ligera',
    armorClass: '11 + mod. Destreza',
    baseArmorClass: 11,
    stealthDisadvantage: true,
    ...po(5),
  },
  {
    slug: 'cuero',
    name: 'Cuero',
    armorType: 'Ligera',
    armorClass: '11 + mod. Destreza',
    baseArmorClass: 11,
    ...po(10),
  },
  {
    slug: 'cuero-reforzado',
    name: 'Cuero reforzado',
    armorType: 'Ligera',
    armorClass: '12 + mod. Destreza',
    baseArmorClass: 12,
    ...po(45),
  },
  {
    slug: 'camisa-de-malla',
    name: 'Camisa de malla',
    armorType: 'Media',
    armorClass: '13 + mod. Destreza (máx. +2)',
    baseArmorClass: 13,
    maxDexBonus: 2,
    ...po(50),
  },
  {
    slug: 'coraza',
    name: 'Coraza',
    armorType: 'Media',
    armorClass: '14 + mod. Destreza (máx. +2)',
    baseArmorClass: 14,
    maxDexBonus: 2,
    ...po(400),
  },
  {
    slug: 'escamas',
    name: 'Escamas',
    armorType: 'Media',
    armorClass: '14 + mod. Destreza (máx. +2)',
    baseArmorClass: 14,
    maxDexBonus: 2,
    stealthDisadvantage: true,
    ...po(50),
  },
  {
    slug: 'media-armadura',
    name: 'Media armadura',
    armorType: 'Media',
    armorClass: '15 + mod. Destreza (máx. +2)',
    baseArmorClass: 15,
    maxDexBonus: 2,
    stealthDisadvantage: true,
    ...po(750),
  },
  {
    slug: 'pieles',
    name: 'Pieles',
    armorType: 'Media',
    armorClass: '12 + mod. Destreza (máx. +2)',
    baseArmorClass: 12,
    maxDexBonus: 2,
    ...po(10),
  },
  {
    slug: 'armadura-de-placas',
    name: 'Armadura de placas',
    armorType: 'Pesada',
    armorClass: '18',
    baseArmorClass: 18,
    ignoresDex: true,
    strengthRequirement: 'Fue 15',
    stealthDisadvantage: true,
    ...po(1500),
  },
  {
    slug: 'armadura-laminada',
    name: 'Armadura laminada',
    armorType: 'Pesada',
    armorClass: '17',
    baseArmorClass: 17,
    ignoresDex: true,
    strengthRequirement: 'Fue 15',
    stealthDisadvantage: true,
    ...po(200),
  },
  {
    slug: 'cota-de-anillas',
    name: 'Cota de anillas',
    armorType: 'Pesada',
    armorClass: '14',
    baseArmorClass: 14,
    ignoresDex: true,
    stealthDisadvantage: true,
    ...po(30),
  },
  {
    slug: 'cota-de-malla',
    name: 'Cota de malla',
    armorType: 'Pesada',
    armorClass: '16',
    baseArmorClass: 16,
    ignoresDex: true,
    strengthRequirement: 'Fue 13',
    stealthDisadvantage: true,
    ...po(75),
  },
];

const ESCUDO: Semilla[] = [
  {
    slug: 'escudo',
    name: 'Escudo',
    armorType: 'Escudo',
    armorClass: '+2',
    baseArmorClass: 2,
    ...po(10),
  },
];

// --- herramientas y materiales ----------------------------------------------
// Son seis, no una lista de utiles sueltos. Cada una se compra con 10 usos y,
// cuando se agotan, se vuelve a comprar por el mismo precio.
const HERRAMIENTAS: Semilla[] = [
  {
    slug: 'equipo-de-aventurero',
    name: 'Equipo de Aventurero',
    toolGroup: 'equipo_aventurero',
    maxUses: 10,
    notes:
      'Cuerdas, antorchas, palancas, yesca y pedernal y objetos similares. No requiere competencia.',
    ...po(10),
  },
  {
    slug: 'herramientas-de-artesano',
    name: 'Herramientas de Artesano',
    toolGroup: 'herramientas_artesano',
    maxUses: 10,
    notes:
      'Fabricar objetos y reparar armas, armaduras y escudos deteriorados.',
    ...po(30),
  },
  {
    slug: 'herramientas-de-ladron',
    name: 'Herramientas de Ladrón',
    toolGroup: 'herramientas_ladron',
    maxUses: 10,
    notes:
      'Abrir cerraduras, desactivar trampas, falsificar documentos y elaborar disfraces.',
    ...po(25),
  },
  {
    slug: 'instrumentos-musicales',
    name: 'Instrumentos Musicales',
    toolGroup: 'instrumento_musical',
    maxUses: 10,
    notes:
      'Interpretar melodías. Con la dote de origen Músico, conceden Inspiración Heroica.',
    ...po(10),
  },
  {
    slug: 'material-alquimico',
    name: 'Material Alquímico',
    toolGroup: 'material_alquimico',
    maxUses: 10,
    notes: 'Elaborar venenos, antídotos, remedios y otros compuestos.',
    ...po(30),
  },
  {
    slug: 'material-de-curacion',
    name: 'Material de Curación',
    toolGroup: 'material_curacion',
    maxUses: 10,
    notes: 'Atender heridas y estabilizar a criaturas con 0 Puntos de Golpe.',
    ...po(10),
  },
];

// --- montaje ----------------------------------------------------------------
const marcar = (
  items: Semilla[],
  campos: Partial<CompendiumItem>,
): Partial<CompendiumItem>[] => items.map((i) => ({ ...campos, ...i, isDefault: true }));

export const ITEMS_SEED: Partial<CompendiumItem>[] = [
  ...marcar(ARMAS_SIMPLES_CC, {
    category: 'WEAPON',
    group: 'armas_simples',
    melee: true,
  }),
  ...marcar(ARMAS_SIMPLES_DIST, {
    category: 'WEAPON',
    group: 'armas_simples',
    melee: false,
  }),
  ...marcar(ARMAS_MARCIALES_CC, {
    category: 'WEAPON',
    group: 'armas_marciales',
    melee: true,
  }),
  ...marcar(ARMAS_MARCIALES_DIST, {
    category: 'WEAPON',
    group: 'armas_marciales',
    melee: false,
  }),
  ...marcar(MUNICION, { category: 'AMMUNITION' }),
  ...marcar(ARMADURAS, { category: 'ARMOR' }),
  ...marcar(ESCUDO, { category: 'SHIELD' }),
  ...marcar(HERRAMIENTAS, { category: 'TOOL' }),
];
