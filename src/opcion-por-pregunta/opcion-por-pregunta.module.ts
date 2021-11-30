import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { OpcionPorPreguntaController } from './opcion-por-pregunta.controller';
import { OpcionPorPreguntaEntity } from './opcion-por-pregunta.entity';
import { OpcionPorPreguntaService } from './opcion-por-pregunta.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                OpcionPorPreguntaEntity
            ])
    ],
    controllers:[
        OpcionPorPreguntaController
    ],
    providers: [
        OpcionPorPreguntaService
    ],
    exports: [
        OpcionPorPreguntaService
    ]
})
export class OpcionPorPreguntaModule {

}