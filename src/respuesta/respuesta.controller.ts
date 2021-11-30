import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import { RespuestaActualizarDto } from './dto/respuesta-actualizar.dto';
import { RespuestaCrearDto } from './dto/respuesta-crear.dto';
import { RespuestaEntity } from './respuesta.entity';
import { RespuestaService } from './respuesta.service';

@Controller('respuesta')
export class RespuestaController {
    constructor(private readonly _respuestaService: RespuestaService) {

    }

    @Get('')
    async buscarRespuestas(@Query('consulta') consulta?: any): Promise<RespuestaEntity[]> {
        if(consulta){
            return await this._respuestaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._respuestaService.listarRespuestas();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<RespuestaEntity> {
        return await this._respuestaService.buscarPorId(id);
    }

    @Post()
    async crearRespuesta(@Body() respuestaCrearDto: RespuestaCrearDto): Promise<RespuestaEntity> {
        return await this._respuestaService.crearRespuesta(respuestaCrearDto);
    }

    /*@Post()
    crearRespuestas(@Body() respuestasCrearDto: RespuestaCrearDto[]): Promise<RespuestaEntity[]> {
        return this._respuestaService.crearRespuestas(respuestaCrearDto);
    }*/

    @Put('/:id')
    async actualizarRespuesta(@Param('id') id: number, @Body() respuestaActualizarDto: RespuestaActualizarDto) {
        return await this._respuestaService.actualizarRespuesta(id, respuestaActualizarDto);
    }

    @Delete('/:id')
    async eliminarRespuesta(@Param('id') id: number) {
        return await this._respuestaService.eliminarRespuesta(id);
    }

    

}