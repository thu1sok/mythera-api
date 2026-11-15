import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSheetsController } from './character-sheets.controller';
import { CharacterSheetsService } from './character-sheets.service';
import {
  CharacterSheet,
  CharacterSheetSchema,
} from '../schema/wiki/character-sheet.schema';
import { Character, CharacterSchema } from '../schema/wiki/character.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CharacterSheet.name, schema: CharacterSheetSchema },
      { name: Character.name, schema: CharacterSchema },
    ]),
    SharedModule,
  ],
  controllers: [CharacterSheetsController],
  providers: [CharacterSheetsService],
  exports: [CharacterSheetsService],
})
export class CharacterSheetsModule {}
