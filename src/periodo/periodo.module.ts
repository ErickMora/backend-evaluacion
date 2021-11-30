import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { PeriodoController } from './periodo.controller';
import { PeriodoEntity } from './periodo.entity';
import { PeriodoService } from './periodo.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                PeriodoEntity
            ])
    ],
    controllers:[
        PeriodoController
    ],
    providers: [
        PeriodoService
    ],
    exports: [
        PeriodoService
    ]
})
export class PeriodoModule {

}