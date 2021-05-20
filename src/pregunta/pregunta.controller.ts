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
    buscarPreguntas(@Query('consulta') consulta?: any): Promise<PreguntaEntity[]> {
        if(consulta){
            return this._preguntaService.buscar(JSON.parse(consulta));
        }
        else{
            return this._preguntaService.listarPreguntas();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<PreguntaEntity> {
        return this._preguntaService.buscarPorId(id);
    }

    @Post()
    crearPregunta(@Body() preguntaCrearDto: PreguntaCrearDto): Promise<PreguntaEntity> {
        return this._preguntaService.crearPregunta(preguntaCrearDto);
    }

    @Put('/:id')
    actualizarPregunta(@Param('id') id: number, @Body() preguntaActualizarDto: PreguntaActualizarDto) {
        return this._preguntaService.actualizarPregunta(id, preguntaActualizarDto);
    }

    @Delete('/:id')
    eliminarPregunta(@Param('id') id: number) {
        return this._preguntaService.eliminarPregunta(id);
    }

    

}