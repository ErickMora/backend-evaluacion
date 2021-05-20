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
    buscarArea(@Query('consulta') consulta?: any): Promise<AreaEntity[]> {
        console.log('consulta: ', consulta);
        if(consulta){
            return this._areaService.buscar(JSON.parse(consulta));
        }
        else{
            return this._areaService.listarAreas();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<AreaEntity> {
        return this._areaService.buscarPorId(id);
    }

    @Post()
    crearArea(@Body() areaCrearDto: AreaCrearDto): Promise<AreaEntity> {
        const areaCrear = new AreaCrearDto();
        Object.keys(areaCrearDto).map(atributo => {
            areaCrear[atributo] = areaCrearDto[atributo];
        });
        return this._areaService.crearArea(areaCrear);

    }

    @Put('/:id')
    actualizarArea(@Param('id') id: number, @Body() areaActualizarDto: AreaActualizarDto) {
        return this._areaService.actualizarArea(id, areaActualizarDto);
    }

    @Delete('/:id')
    eliminarArea(@Param('id') id: number) {
        return this._areaService.eliminarArea(id);
    }

    

}