import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { AreaEntity } from './area.entity';
import { AreaService } from './area.service';
import { AreaActualizarDto } from './dto/area-actualizar.dto';
import { AreaCrearDto } from './dto/area-crear.dto';

@Controller('area')
export class AreaController {
    constructor(private readonly _areaService: AreaService) {

    }
/*
    @Get()
    listarAreas(): Promise<AreaEntity[]> {
        return this._areaService.listarAreas();
    }*/

    @Get('')
    async buscarArea(@Query('consulta') consulta?: any): Promise<AreaEntity[]> {
        console.log('consulta: ', consulta);
        if(consulta){
            return await this._areaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._areaService.listarAreas();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<AreaEntity> {
        return await this._areaService.buscarPorId(id);
    }

    @Post()
    async crearArea(@Body() areaCrearDto: AreaCrearDto): Promise<AreaEntity> {
        const areaCrear = new AreaCrearDto();
        Object.keys(areaCrearDto).map(atributo => {
            areaCrear[atributo] = areaCrearDto[atributo];
        });
        return await this._areaService.crearArea(areaCrear);

    }

    @Put('/:id')
    async actualizarArea(@Param('id') id: number, @Body() areaActualizarDto: AreaActualizarDto) {
        return await this._areaService.actualizarArea(id, areaActualizarDto);
    }

    @Delete('/:id')
    async eliminarArea(@Param('id') id: number) {
        return await this._areaService.eliminarArea(id);
    }

    

}