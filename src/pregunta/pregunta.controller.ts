import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { PreguntaActualizarDto } from './dto/pregunta-actualizar.dto';
import { PreguntaCrearDto } from './dto/pregunta-crear.dto';
import { PreguntaEntity } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';

@Controller('pregunta')
export class PreguntaController {
    constructor(private readonly _preguntaService: PreguntaService) {

    }

    @Get('')
    async buscarPreguntas(@Query('consulta') consulta?: any): Promise<PreguntaEntity[]> {
        if(consulta){
            return await this._preguntaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._preguntaService.listarPreguntas();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<PreguntaEntity> {
        return await this._preguntaService.buscarPorId(id);
    }

    @Post()
    async crearPregunta(@Body() preguntaCrearDto: PreguntaCrearDto): Promise<PreguntaEntity> {
        return await this._preguntaService.crearPregunta(preguntaCrearDto);
    }

    @Put('/:id')
    async actualizarPregunta(@Param('id') id: number, @Body() preguntaActualizarDto: PreguntaActualizarDto) {
        return await this._preguntaService.actualizarPregunta(id, preguntaActualizarDto);
    }

    @Delete('/:id')
    async eliminarPregunta(@Param('id') id: number) {
        return await this._preguntaService.eliminarPregunta(id);
    }

    

}