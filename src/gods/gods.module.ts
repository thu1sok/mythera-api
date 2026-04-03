import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GodsController } from './gods.controller';
import { GodsService } from './gods.service';
import { God, GodSchema } from '../schema/wiki/god.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: God.name, schema: GodSchema }]),
        SharedModule
    ],
    controllers: [GodsController],
    providers: [GodsService]
})
export class GodsModule { }
