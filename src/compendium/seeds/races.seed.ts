import { CompendiumRace } from '../../schema/wiki/compendium/compendium-race.schema';

/**
 * Razas del compendio: la parte mecanica, la que lee el creador.
 *
 * La Mejora de Caracteristica vive aqui y no en los estilos: va atada a ser
 * humano, y tenerla repetida en los tres estilos obligaria a duplicarla y
 * condicionarla el dia que entre otra raza.
 *
 * Las dos choices estan copiadas literalmente de los estilos; lo unico que
 * cambia son los ids. Tamano y velocidad base salen del SRD 5.2, donde son
 * propiedades de la especie, y en el compendio no estaban en ningun sitio.
 */
export const DEFAULT_RACES: Partial<CompendiumRace>[] = [
  {
    slug: 'humano',
    name: 'Humano',
    icon: 'person',
    isDefault: true,
    loreDescription:
      'La única estirpe que camina por Mythera. Sin dones heredados ni linajes antiguos que la sostengan, se abre camino a base de empeño: cada humano se labra sus propias virtudes.',
    features: [
      {
        title: 'Mejora de Característica',
        description:
          'Aumenta una característica de tu elección en +2 y otra característica diferente en +1, hasta un máximo de 20.',
      },
      {
        title: 'Tamaño',
        description: 'Eres de tamaño Mediano.',
      },
      {
        title: 'Velocidad',
        description: 'Tu Velocidad base caminando es de 30 pies.',
      },
      {
        title: 'Idiomas',
        description: 'Hablas, lees y escribes Común.',
      },
    ],
    grants: {
      size: 'Mediano',
      baseSpeed: 30,
      languages: ['Común'],
    },
    choices: [
      {
        id: 'humano_stat_plus_2',
        label: 'Aumenta una característica en +2 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 2,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
      {
        id: 'humano_stat_plus_1',
        label: 'Aumenta otra característica diferente en +1 (máx. 20)',
        type: 'ABILITY_SCORE_INCREASE',
        count: 1,
        amount: 1,
        allowedOptions: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
      },
    ],
  },
];
