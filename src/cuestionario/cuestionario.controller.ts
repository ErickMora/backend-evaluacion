import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { CuestionarioEntity } from './cuestionario.entity';
import { CuestionarioService } from './cuestionario.service';
import { CuestionarioActualizarDto } from './dto/cuestionario-actualizar.dto';
import { CuestionarioCrearDto } from './dto/cuestionario-crear.dto';

@Controller('cuestionario')
export class CuestionarioController {
    constructor(private readonly _cuestionarioService: CuestionarioService) {

    }

    @Get('')
    buscarCuestionarios(@Query('consulta') consulta?: any): Promise<CuestionarioEntity[]> {
        if(consulta){
            return this._cuestionarioService.buscar(JSON.parse(consulta));
        }
        else{
            return this._cuestionarioService.listarCuestionarios();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<CuestionarioEntity> {
        return this._cuestionarioService.buscarPorId(id);
    }

    @Post()
    crearCuestionario(@Body() cuestionarioCrearDto: CuestionarioCrearDto): Promise<CuestionarioEntity> {
        return this._cuestionarioService.crearCuestionario(cuestionarioCrearDto);
    }

    @Put('/:id')
    actualizarCuestionario(@Param('id') id: number, @Body() cuestionarioActualizarDto: CuestionarioActualizarDto) {
        return this._cuestionarioService.actualizarCuestionario(id, cuestionarioActualizarDto);
    }

    @Delete('/:id')
    eliminarCuestionario(@Param('id') id: number) {
        return this._cuestionarioService.eliminarCuestionario(id);
    }

    

}