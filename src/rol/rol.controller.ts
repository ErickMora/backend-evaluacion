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
    buscarRoles(@Query('consulta') consulta?: any): Promise<RolEntity[]> {
        if(consulta){
            return this._rolService.buscar(JSON.parse(consulta));
        }
        else{
            return this._rolService.listarRoles();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<RolEntity> {
        return this._rolService.buscarPorId(id);
    }

    @Post()
    crearRol(@Body() rolCrearDto: RolCrearDto): Promise<RolEntity> {
        return this._rolService.crearRol(rolCrearDto);
    }

    @Put('/:id')
    actualizarRol(@Param('id') id: number, @Body() rolActualizarDto: RolActualizarDto) {
        return this._rolService.actualizarRol(id, rolActualizarDto);
    }

    @Delete('/:id')
    eliminarRol(@Param('id') id: number) {
        return this._rolService.eliminarRol(id);
    }

    

}