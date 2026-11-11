import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompendiumController } from './compendium.controller';
import { CompendiumService } from './compendium.service';
import {
  HumanTrait,
  HumanTraitSchema,
} from '../schema/wiki/compendium/human-trait.schema';
import {
  CompendiumFeat,
  CompendiumFeatSchema,
} from '../schema/wiki/compendium/compendium-feat.schema';
import {
  CompendiumStyle,
  CompendiumStyleSchema,
} from '../schema/wiki/compendium/compendium-style.schema';
import {
  CompendiumArchetype,
  CompendiumArchetypeSchema,
} from '../schema/wiki/compendium/compendium-archetype.schema';
import {
  CompendiumItem,
  CompendiumItemSchema,
} from '../schema/wiki/compendium/compendium-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HumanTrait.name, schema: HumanTraitSchema },
      { name: CompendiumFeat.name, schema: CompendiumFeatSchema },
      { name: CompendiumStyle.name, schema: CompendiumStyleSchema },
      { name: CompendiumArchetype.name, schema: CompendiumArchetypeSchema },
      { name: CompendiumItem.name, schema: CompendiumItemSchema },
    ]),
  ],
  controllers: [CompendiumController],
  providers: [CompendiumService],
  exports: [CompendiumService],
})
export class CompendiumModule { }
