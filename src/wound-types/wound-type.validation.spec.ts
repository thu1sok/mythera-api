import { validateWoundType } from './wound-type.validation';

describe('validateWoundType', () => {
  it('acepta un tipo con nombre y lineas con sentido, y lo limpia', () => {
    expect(
      validateWoundType({
        name: '  Ciego ',
        modifiers: [
          { category: 'attack', effect: 'disadvantage', extra: 'x' },
          { category: 'skill', target: 'percepcion', effect: 'disadvantage' },
        ],
      }),
    ).toEqual({
      name: 'Ciego',
      description: '',
      modifiers: [
        { category: 'attack', effect: 'disadvantage' },
        { category: 'skill', target: 'percepcion', effect: 'disadvantage' },
      ],
      untilLongRest: false,
    });
  });

  it('acepta las categorias de todas las salvaciones, todas las pruebas, cuerpo a cuerpo, a distancia y salvacion contra muerte', () => {
    const modifiers = [
      { category: 'allSaves', effect: -1 },
      { category: 'allChecks', effect: 'disadvantage' },
      { category: 'meleeAttack', effect: 1 },
      { category: 'rangedAttack', effect: 'disadvantage' },
      { category: 'deathSave', effect: 'disadvantage' },
    ];
    expect(validateWoundType({ name: 'Tuerto', modifiers })).toEqual(expect.objectContaining({ modifiers }));
  });

  it('rechaza sin nombre o sin lineas', () => {
    expect(validateWoundType({ name: ' ', modifiers: [{ category: 'speed', effect: -10 }] })).toBe('Falta el nombre.');
    expect(validateWoundType({ name: 'Nada', modifiers: [] })).toBe('Hace falta al menos una línea.');
  });

  it('rechaza lineas sin sentido: categoria inventada, Ventaja donde no hay tirada, objetivo que falta, 0', () => {
    expect(validateWoundType({ name: 'X', modifiers: [{ category: 'percepcion', effect: 1 }] })).toBe('La línea 1 no tiene sentido.');
    expect(validateWoundType({ name: 'X', modifiers: [{ category: 'armorClass', effect: 'advantage' }] })).toBe('La línea 1 no tiene sentido.');
    expect(validateWoundType({ name: 'X', modifiers: [{ category: 'save', effect: 1 }] })).toBe('La línea 1 no tiene sentido.');
    expect(validateWoundType({ name: 'X', modifiers: [{ category: 'save', target: 'XYZ', effect: 1 }] })).toBe('La línea 1 no tiene sentido.');
    expect(validateWoundType({ name: 'X', modifiers: [{ category: 'speed', effect: 0 }] })).toBe('La línea 1 no tiene sentido.');
  });
});
