import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { EstudianteController } from './estudiante.controller';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';


@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                EstudianteEntity
            ])
    ],
    controllers:[
        EstudianteController
    ],
    providers: [
        EstudianteService
    ],
    exports: [
        EstudianteService
    ]
})
export class EstudianteModule {

}