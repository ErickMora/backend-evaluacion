import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { RolController } from './rol.controller';
import { RolEntity } from './rol.entity';
import { RolService } from './rol.service';

@Module({
    imports: [
        TypeOrmModule
            .forFeature([
                RolEntity
            ])
    ],
    controllers:[
        RolController
    ],
    providers: [
        RolService
    ],
    exports: [
        RolService
    ]
})
export class RolModule {

}