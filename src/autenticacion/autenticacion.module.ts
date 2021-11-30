import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionGuard } from './guard/autenticacion.guard';

@Module({
    imports: [
        UsuarioModule

    ],
    controllers:[
        AutenticacionController
    ],
    providers: [
        AutenticacionService,
        AutenticacionGuard
    ],
    exports: [
        AutenticacionService
    ]
})
export class AutenticacionModule {

}