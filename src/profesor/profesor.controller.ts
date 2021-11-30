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
    async buscarProfesores(@Query('consulta') consulta?: any): Promise<ProfesorEntity[]> {
        if(consulta){
            return await this._profesorService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._profesorService.listarProfesores();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<ProfesorEntity> {
        return await this._profesorService.buscarPorId(id);
    }

    @Post()
    async crearProfesor(@Body() profesorCrearDto: ProfesorCrearDto): Promise<ProfesorEntity> {
        return await this._profesorService.crearProfesor(profesorCrearDto);
    }

    @Put('/:id')
    async actualizarProfesor(@Param('id') id: number, @Body() profesorActualizarDto: ProfesorActualizarDto) {
        return await this._profesorService.actualizarProfesor(id, profesorActualizarDto);
    }

    @Delete('/:id')
    async eliminarProfesor(@Param('id') id: number) {
        return await this._profesorService.eliminarProfesor(id);
    }

    

}