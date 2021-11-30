import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import { PreguntaPorCuestionarioActualizarDto } from './dto/pregunta-por-cuestionario-actualizar.dto';
import { PreguntaPorCuestionarioCrearDto } from './dto/pregunta-por-cuestionario-crear.dto';
import { PreguntaPorCuestionarioEntity } from './pregunta-por-cuestionario.entity';
import { PreguntaPorCuestionarioService } from './pregunta-por-cuestionario.service';

@Controller('pregunta-por-cuestionario')
export class PreguntaPorCuestionarioController {
    constructor(private readonly _preguntaPorCuestionarioService: PreguntaPorCuestionarioService) {

    }

    @Get('')
    async buscarPreguntasPorCuestionario(@Query('consulta') consulta?: any): Promise<PreguntaPorCuestionarioEntity[]> {
        if(consulta){
            return await this._preguntaPorCuestionarioService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._preguntaPorCuestionarioService.listarPreguntasPorCuestionario();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<PreguntaPorCuestionarioEntity> {
        return await this._preguntaPorCuestionarioService.buscarPorId(id);
    }

    @Post()
    async crearPreguntaPorCuestionario(@Body() preguntaPorCuestionarioCrearDto: PreguntaPorCuestionarioCrearDto): Promise<PreguntaPorCuestionarioEntity> {
        return await this._preguntaPorCuestionarioService.crearPreguntaPorCuestionario(preguntaPorCuestionarioCrearDto);
    }

    /*@Post()
    crearPreguntasPorCuestionario(@Body() preguntasPorCuestionarioCrearDto: PreguntaPorCuestionarioCrearDto[]): Promise<PreguntaPorCuestionarioEntity[]> {
        return this._preguntaPorCuestionarioService.crearPreguntasPorCuestionario(preguntasPorCuestionarioCrearDto);
    }*/

    @Put('/:id')
    async actualizarPreguntaPorCuestionario(@Param('id') id: number, @Body() preguntaPorCuestionarioActualizarDto: PreguntaPorCuestionarioActualizarDto) {
        return await this._preguntaPorCuestionarioService.actualizarPreguntaPorCuestionario(id, preguntaPorCuestionarioActualizarDto);
    }

    @Delete('/:id')
    async eliminarPreguntaPorCuestionario(@Param('id') id: number) {
        return await this._preguntaPorCuestionarioService.eliminarPreguntaPorCuestionario(id);
    }

    

}