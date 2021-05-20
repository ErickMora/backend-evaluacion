import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { EstudianteActualizarDto } from './dto/estudiante-actualizar.dto';
import { EstudianteCrearDto } from './dto/estudiante-crear.dto';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly _estudianteService: EstudianteService) {

    }

    @Get('')
    buscarEstudiantes(@Query('consulta') consulta?: any): Promise<EstudianteEntity[]> {
        if(consulta){
            return this._estudianteService.buscar(JSON.parse(consulta));
        }
        else{
            return this._estudianteService.listarEstudiantes();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<EstudianteEntity> {
        return this._estudianteService.buscarPorId(id);
    }

    @Post()
    crearEstudiante(@Body() estudianteCrearDto: EstudianteCrearDto): Promise<EstudianteEntity> {
        return this._estudianteService.crearEstudiante(estudianteCrearDto);
    }

    @Put('/:id')
    actualizarEstudiante(@Param('id') id: number, @Body() estudianteActualizarDto: EstudianteActualizarDto) {
        return this._estudianteService.actualizarEstudiante(id, estudianteActualizarDto);
    }

    @Delete('/:id')
    eliminarEstudiante(@Param('id') id: number) {
        return this._estudianteService.eliminarEstudiante(id);
    }

    

}