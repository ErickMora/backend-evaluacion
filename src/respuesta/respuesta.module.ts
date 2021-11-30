import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { RespuestaController } from './respuesta.controller';
import { RespuestaEntity } from './respuesta.entity';
import { RespuestaService } from './respuesta.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                RespuestaEntity
            ])
    ],
    controllers:[
        RespuestaController
    ],
    providers: [
        RespuestaService
    ],
    exports: [
        RespuestaService
    ]
})
export class RespuestaModule {

}