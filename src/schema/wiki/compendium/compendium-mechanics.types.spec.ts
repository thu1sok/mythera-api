import { COMPENDIUM_CATALOGS } from './compendium-mechanics.types';

describe('COMPENDIUM_CATALOGS.systemRules.experienceByLevel', () => {
  const { experienceByLevel, maxCharacterLevel } = COMPENDIUM_CATALOGS.systemRules;

  it('tiene una entrada por nivel, hasta el maximo', () => {
    expect(experienceByLevel).toHaveLength(maxCharacterLevel);
  });

  it('el nivel 1 empieza en 0 y el 12 en 100.000', () => {
    expect(experienceByLevel[0]).toBe(0);
    expect(experienceByLevel[11]).toBe(100000);
  });

  it('cada nivel pide mas que el anterior', () => {
    for (let i = 1; i < experienceByLevel.length; i++) {
      expect(experienceByLevel[i]).toBeGreaterThan(experienceByLevel[i - 1]);
    }
  });

  it('es la tabla de 5.a', () => {
    expect(experienceByLevel).toEqual([0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000]);
  });
});
