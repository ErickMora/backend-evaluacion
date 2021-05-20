import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { IndicadorController } from './indicador.controller';
import { IndicadorEntity } from './indicador.entity';
import { IndicadorService } from './indicador.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                IndicadorEntity
            ])
    ],
    controllers:[
        IndicadorController
    ],
    providers: [
        IndicadorService
    ],
    exports: [
        IndicadorService
    ]
})
export class IndicadorModule {

}