import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { NivelController } from './nivel.controller';
import { NivelEntity } from './nivel.entity';
import { NivelService } from './nivel.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                NivelEntity
            ])
    ],
    controllers:[
        NivelController
    ],
    providers: [
        NivelService
    ],
    exports: [
        NivelService
    ]
})
export class NivelModule {

}