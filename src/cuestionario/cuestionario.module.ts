import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CuestionarioController } from './cuestionario.controller';
import { CuestionarioEntity } from './cuestionario.entity';
import { CuestionarioService } from './cuestionario.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                CuestionarioEntity
            ])
    ],
    controllers:[
        CuestionarioController
    ],
    providers: [
        CuestionarioService
    ],
    exports: [
        CuestionarioService
    ]
})
export class CuestionarioModule {

}