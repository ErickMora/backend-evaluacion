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
    async buscarMaterias(@Query('consulta') consulta?: any): Promise<MateriaEntity[]> {
        if(consulta){
            return await this._materiaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._materiaService.listarMaterias();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<MateriaEntity> {
        return await this._materiaService.buscarPorId(id);
    }

    @Post()
    async crearMateria(@Body() materiaCrearDto: MateriaCrearDto): Promise<MateriaEntity> {
        return await this._materiaService.crearMateria(materiaCrearDto);
    }

    @Put('/:id')
    async actualizarMateria(@Param('id') id: number, @Body() materiaActualizarDto: MateriaActualizarDto) {
        return await this._materiaService.actualizarMateria(id, materiaActualizarDto);
    }

    @Delete('/:id')
    async eliminarMateria(@Param('id') id: number) {
        return await this._materiaService.eliminarMateria(id);
    }

    

}