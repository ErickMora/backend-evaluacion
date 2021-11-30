import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { PreguntaPorCuestionarioController } from './pregunta-por-cuestionario.controller';
import { PreguntaPorCuestionarioEntity } from './pregunta-por-cuestionario.entity';
import { PreguntaPorCuestionarioService } from './pregunta-por-cuestionario.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                PreguntaPorCuestionarioEntity
            ])
    ],
    controllers:[
        PreguntaPorCuestionarioController
    ],
    providers: [
        PreguntaPorCuestionarioService
    ],
    exports: [
        PreguntaPorCuestionarioService
    ]
})
export class PreguntaPorCuestionarioModule {

}