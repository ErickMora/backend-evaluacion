import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { MateriaController } from './materia.controller';
import { MateriaEntity } from './materia.entity';
import { MateriaService } from './materia.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                MateriaEntity
            ])
    ],
    controllers:[
        MateriaController
    ],
    providers: [
        MateriaService
    ],
    exports: [
        MateriaService
    ]
})
export class MateriaModule {

}