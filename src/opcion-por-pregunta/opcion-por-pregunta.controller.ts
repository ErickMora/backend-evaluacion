import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import { OpcionPorPreguntaActualizarDto } from './dto/opcion-por-pregunta-actualizar.dto';
import { OpcionPorPreguntaCrearDto } from './dto/opcion-por-pregunta-crear.dto';
import { OpcionPorPreguntaEntity } from './opcion-por-pregunta.entity';
import { OpcionPorPreguntaService } from './opcion-por-pregunta.service';

@Controller('opcion-por-pregunta')
export class OpcionPorPreguntaController {
    constructor(private readonly _opcionPorPreguntaService: OpcionPorPreguntaService) {

    }

    @Get('')
    async buscarOpcionesPorPregunta(@Query('consulta') consulta?: any): Promise<OpcionPorPreguntaEntity[]> {
        if(consulta){
            return await this._opcionPorPreguntaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._opcionPorPreguntaService.listarOpcionesPorPregunta();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<OpcionPorPreguntaEntity> {
        return await this._opcionPorPreguntaService.buscarPorId(id);
    }

    @Post()
    async crearOpcionPorPregunta(@Body() opcionPorPreguntaCrearDto: OpcionPorPreguntaCrearDto): Promise<OpcionPorPreguntaEntity> {
        return await this._opcionPorPreguntaService.crearOpcionPorPregunta(opcionPorPreguntaCrearDto);
    }

    @Put('/:id')
    async actualizarOpcionPorPregunta(@Param('id') id: number, @Body() opcionPorPreguntaActualizarDto: OpcionPorPreguntaActualizarDto) {
        return await this._opcionPorPreguntaService.actualizarOpcionPorPregunta(id, opcionPorPreguntaActualizarDto);
    }

    @Delete('/:id')
    async eliminarOpcionPorPregunta(@Param('id') id: number) {
        return await this._opcionPorPreguntaService.eliminarOpcionPorPregunta(id);
    }

    

}