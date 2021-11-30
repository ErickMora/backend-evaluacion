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
    async buscarEstudiantes(@Query('consulta') consulta?: any): Promise<EstudianteEntity[]> {
        if(consulta){
            return await this._estudianteService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._estudianteService.listarEstudiantes();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<EstudianteEntity> {
        return await this._estudianteService.buscarPorId(id);
    }

    @Post()
    async crearEstudiante(@Body() estudianteCrearDto: EstudianteCrearDto): Promise<EstudianteEntity> {
        return await this._estudianteService.crearEstudiante(estudianteCrearDto);
    }

    @Put('/:id')
    async actualizarEstudiante(@Param('id') id: number, @Body() estudianteActualizarDto: EstudianteActualizarDto) {
        return await this._estudianteService.actualizarEstudiante(id, estudianteActualizarDto);
    }

    @Delete('/:id')
    async eliminarEstudiante(@Param('id') id: number) {
        return await this._estudianteService.eliminarEstudiante(id);
    }

    

}