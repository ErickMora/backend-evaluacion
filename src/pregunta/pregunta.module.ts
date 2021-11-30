import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { IndicadorEntity } from 'src/indicador/indicador.entity';
import { PreguntaController } from './pregunta.controller';
import { PreguntaEntity } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                PreguntaEntity,
                IndicadorEntity
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