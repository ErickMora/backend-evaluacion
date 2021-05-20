import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { MateriaActualizarDto } from './dto/materia-actualizar.dto';
import { MateriaCrearDto } from './dto/materia-crear.dto';
import { MateriaEntity } from './materia.entity';
import { MateriaService } from './materia.service';

@Controller('materia')
export class MateriaController {
    constructor(private readonly _materiaService: MateriaService) {

    }

    @Get('')
    buscarMaterias(@Query('consulta') consulta?: any): Promise<MateriaEntity[]> {
        if(consulta){
            return this._materiaService.buscar(JSON.parse(consulta));
        }
        else{
            return this._materiaService.listarMaterias();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<MateriaEntity> {
        return this._materiaService.buscarPorId(id);
    }

    @Post()
    crearMateria(@Body() materiaCrearDto: MateriaCrearDto): Promise<MateriaEntity> {
        return this._materiaService.crearMateria(materiaCrearDto);
    }

    @Put('/:id')
    actualizarMateria(@Param('id') id: number, @Body() materiaActualizarDto: MateriaActualizarDto) {
        return this._materiaService.actualizarMateria(id, materiaActualizarDto);
    }

    @Delete('/:id')
    eliminarMateria(@Param('id') id: number) {
        return this._materiaService.eliminarMateria(id);
    }

    

}