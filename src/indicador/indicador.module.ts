import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AreaEntity } from 'src/area/area.entity';
import { IndicadorController } from './indicador.controller';
import { IndicadorEntity } from './indicador.entity';
import { IndicadorService } from './indicador.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                IndicadorEntity,
                AreaEntity
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