import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CursoPorEstudianteController } from './curso-por-estudiante.controller';
import { CursoPorEstudianteEntity } from './curso-por-estudiante.entity';
import { CursoPorEstudianteService } from './curso-por-estudiante.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                CursoPorEstudianteEntity
            ])
    ],
    controllers:[
        CursoPorEstudianteController
    ],
    providers: [
        CursoPorEstudianteService
    ],
    exports: [
        CursoPorEstudianteService
    ]
})
export class CursoPorEstudianteModule {

}