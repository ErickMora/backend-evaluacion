import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { PreguntaController } from './pregunta.controller';
import { PreguntaEntity } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                PreguntaEntity
            ])
    ],
    controllers:[
        PreguntaController
    ],
    providers: [
        PreguntaService
    ],
    exports: [
        PreguntaService
    ]
})
export class PreguntaModule {

}