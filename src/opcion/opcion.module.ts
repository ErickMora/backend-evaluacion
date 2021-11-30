import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { OpcionController } from './opcion.controller';
import { OpcionEntity } from './opcion.entity';
import { OpcionService } from './opcion.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                OpcionEntity
            ])
    ],
    controllers:[
        OpcionController
    ],
    providers: [
        OpcionService
    ],
    exports: [
        OpcionService
    ]
})
export class OpcionModule {

}