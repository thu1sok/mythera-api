import { model } from 'mongoose';
import { CompendiumConditionSchema } from './compendium-condition.schema';

describe('CompendiumConditionSchema', () => {
  it('un estado sin efectos mecánicos llega con mechanics: {} (la ficha lee mechanics.implies)', () => {
    const Condition = model('CompendiumConditionMinimizeTest', CompendiumConditionSchema);
    const doc = new Condition({ slug: 'oculto', name: 'Oculto', mechanics: {} });
    expect(doc.toJSON().mechanics).toEqual({});
    expect(doc.toObject().mechanics).toEqual({});
  });
});
