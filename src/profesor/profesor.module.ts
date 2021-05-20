import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ProfesorController } from './profesor.controller';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                ProfesorEntity
            ])
    ],
    controllers:[
        ProfesorController
    ],
    providers: [
        ProfesorService
    ],
    exports: [
        ProfesorService
    ]
})
export class ProfesorModule {

}