import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubracesController } from './subraces.controller';
import { SubracesService } from './subraces.service';
import { Subrace, SubraceSchema } from '../schema/wiki/subrace.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Subrace.name, schema: SubraceSchema }]),
        SharedModule
    ],
    controllers: [SubracesController],
    providers: [SubracesService]
})
export class SubracesModule { }
