import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CuestionarioPorUsuarioController } from './cuestionario-por-usuario.controller';
import { CuestionarioPorUsuarioEntity } from './cuestionario-por-usuario.entity';
import { CuestionarioPorUsuarioService } from './cuestionario-por-usuario.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                CuestionarioPorUsuarioEntity
            ])
    ],
    controllers:[
        CuestionarioPorUsuarioController
    ],
    providers: [
        CuestionarioPorUsuarioService
    ],
    exports: [
        CuestionarioPorUsuarioService
    ]
})
export class CuestionarioPorUsuarioModule {

}