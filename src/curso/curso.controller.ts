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
    buscarCursos(@Query('consulta') consulta?: any): Promise<CursoEntity[]> {
        if(consulta){
            return this._cursoService.buscar(JSON.parse(consulta));
        }
        else{
            return this._cursoService.listarCursos();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<CursoEntity> {
        return this._cursoService.buscarPorId(id);
    }

    @Post()
    crearCurso(@Body() cursoCrearDto: CursoCrearDto): Promise<CursoEntity> {
        return this._cursoService.crearCurso(cursoCrearDto);
    }

    @Put('/:id')
    actualizarCurso(@Param('id') id: number, @Body() cursoActualizarDto: CursoActualizarDto) {
        return this._cursoService.actualizarCurso(id, cursoActualizarDto);
    }

    @Delete('/:id')
    eliminarCurso(@Param('id') id: number) {
        return this._cursoService.eliminarCurso(id);
    }

    

}