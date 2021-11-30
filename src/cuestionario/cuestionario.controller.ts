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
    async buscarCuestionarios(@Query('consulta') consulta?: any): Promise<CuestionarioEntity[]> {
        if(consulta){
            return await this._cuestionarioService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._cuestionarioService.listarCuestionarios();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<CuestionarioEntity> {
        return await this._cuestionarioService.buscarPorId(id);
    }

    @Post()
    async crearCuestionario(@Body() cuestionarioCrearDto: CuestionarioCrearDto): Promise<CuestionarioEntity> {
        return await this._cuestionarioService.crearCuestionario(cuestionarioCrearDto);
    }

    @Put('/:id')
    async actualizarCuestionario(@Param('id') id: number, @Body() cuestionarioActualizarDto: CuestionarioActualizarDto) {
        return await this._cuestionarioService.actualizarCuestionario(id, cuestionarioActualizarDto);
    }

    @Delete('/:id')
    async eliminarCuestionario(@Param('id') id: number) {
        return await this._cuestionarioService.eliminarCuestionario(id);
    }

    

}