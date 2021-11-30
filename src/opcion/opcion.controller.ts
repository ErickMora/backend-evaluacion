import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { OpcionActualizarDto } from './dto/opcion-actualizar.dto';
import { OpcionCrearDto } from './dto/opcion-crear.dto';
import { OpcionEntity } from './opcion.entity';
import { OpcionService } from './opcion.service';

@Controller('opcion')
export class OpcionController {
    constructor(private readonly _opcionService: OpcionService) {

    }

    @Get('')
    async buscarOpciones(@Query('consulta') consulta?: any): Promise<OpcionEntity[]> {
        if(consulta){
            return await this._opcionService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._opcionService.listarOpciones();
        }
    }
    
    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<OpcionEntity> {
        return await this._opcionService.buscarPorId(id);
    }

    @Post()
    async crearOpcion(@Body() opcionCrearDto: OpcionCrearDto): Promise<OpcionEntity> {
        const opcionCrear = new OpcionCrearDto();
        Object.keys(opcionCrearDto).map(atributo => {
            opcionCrear[atributo] = opcionCrearDto[atributo];
        });
        return await this._opcionService.crearOpcion(opcionCrear);
    }

    @Put('/:id')
    async actualizarOpcion(@Param('id') id: number, @Body() opcionActualizarDto: OpcionActualizarDto) {
        return await this._opcionService.actualizarOpcion(id, opcionActualizarDto);
    }

    @Delete('/:id')
    async eliminarOpcion(@Param('id') id: number) {
        return await this._opcionService.eliminarOpcion(id);
    }

    

}