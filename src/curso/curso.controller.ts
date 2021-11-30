import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { CursoEntity } from './curso.entity';
import { CursoService } from './curso.service';
import { CursoActualizarDto } from './dto/curso-actualizar.dto';
import { CursoCrearDto } from './dto/curso-crear.dto';

@Controller('curso')
export class CursoController {
    constructor(private readonly _cursoService: CursoService) {

    }

    @Get('')
    async buscarCursos(@Query('consulta') consulta?: any): Promise<CursoEntity[]> {
        if(consulta){
            return await this._cursoService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._cursoService.listarCursos();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<CursoEntity> {
        return await this._cursoService.buscarPorId(id);
    }

    @Post()
    async crearCurso(@Body() cursoCrearDto: CursoCrearDto): Promise<CursoEntity> {
        return await this._cursoService.crearCurso(cursoCrearDto);
    }

    @Put('/:id')
    async actualizarCurso(@Param('id') id: number, @Body() cursoActualizarDto: CursoActualizarDto) {
        return await this._cursoService.actualizarCurso(id, cursoActualizarDto);
    }

    @Delete('/:id')
    async eliminarCurso(@Param('id') id: number) {
        return await this._cursoService.eliminarCurso(id);
    }

    

}