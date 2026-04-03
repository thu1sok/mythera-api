import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EternalsController } from './eternals.controller';
import { EternalsService } from './eternals.service';
import { Eternal, EternalSchema } from '../schema/wiki/eternal.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Eternal.name, schema: EternalSchema }]),
        SharedModule
    ],
    controllers: [EternalsController],
    providers: [EternalsService]
})
export class EternalsModule { }
