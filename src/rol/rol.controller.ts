import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { RolActualizarDto } from './dto/rol-actualizar.dto';
import { RolCrearDto } from './dto/rol-crear.dto';
import { RolEntity } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
    constructor(private readonly _rolService: RolService) {

    }

    @Get('')
    async buscarRoles(@Query('consulta') consulta?: any): Promise<RolEntity[]> {
        if(consulta){
            return await this._rolService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._rolService.listarRoles();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<RolEntity> {
        return await this._rolService.buscarPorId(id);
    }

    @Post()
    async crearRol(@Body() rolCrearDto: RolCrearDto): Promise<RolEntity> {
        return await this._rolService.crearRol(rolCrearDto);
    }

    @Put('/:id')
    async actualizarRol(@Param('id') id: number, @Body() rolActualizarDto: RolActualizarDto) {
        return await this._rolService.actualizarRol(id, rolActualizarDto);
    }

    @Delete('/:id')
    async eliminarRol(@Param('id') id: number) {
        return await this._rolService.eliminarRol(id);
    }

    

}