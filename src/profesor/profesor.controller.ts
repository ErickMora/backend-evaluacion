import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { ProfesorActualizarDto } from './dto/profesor-actualizar.dto';
import { ProfesorCrearDto } from './dto/profesor-crear.dto';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private readonly _profesorService: ProfesorService) {

    }

    @Get('')
    buscarProfesores(@Query('consulta') consulta?: any): Promise<ProfesorEntity[]> {
        if(consulta){
            return this._profesorService.buscar(JSON.parse(consulta));
        }
        else{
            return this._profesorService.listarProfesores();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<ProfesorEntity> {
        return this._profesorService.buscarPorId(id);
    }

    @Post()
    crearProfesor(@Body() profesorCrearDto: ProfesorCrearDto): Promise<ProfesorEntity> {
        return this._profesorService.crearProfesor(profesorCrearDto);
    }

    @Put('/:id')
    actualizarProfesor(@Param('id') id: number, @Body() profesorActualizarDto: ProfesorActualizarDto) {
        return this._profesorService.actualizarProfesor(id, profesorActualizarDto);
    }

    @Delete('/:id')
    eliminarProfesor(@Param('id') id: number) {
        return this._profesorService.eliminarProfesor(id);
    }

    

}