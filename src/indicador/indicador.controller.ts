import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { IndicadorActualizarDto } from './dto/indicador-actualizar.dto';
import { IndicadorCrearDto } from './dto/indicador-crear.dto';
import { IndicadorEntity } from './indicador.entity';
import { IndicadorService } from './indicador.service';

@Controller('indicador')
export class IndicadorController {
    constructor(private readonly _indicadorService: IndicadorService) {

    }

    @Get('')
    buscarIndicadores(@Query('consulta') consulta?: any): Promise<IndicadorEntity[]> {
        if(consulta){
            return this._indicadorService.buscar(JSON.parse(consulta));
        }
        else{
            return this._indicadorService.listarIndicadores();
        }
    }
    
    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<IndicadorEntity> {
        return this._indicadorService.buscarPorId(id);
    }

    @Post()
    crearIndicador(@Body() indicadorCrearDto: IndicadorCrearDto): Promise<IndicadorEntity> {
        const indicadorCrear = new IndicadorCrearDto();
        Object.keys(indicadorCrearDto).map(atributo => {
            indicadorCrear[atributo] = indicadorCrearDto[atributo];
        });
        return this._indicadorService.crearIndicador(indicadorCrear);
    }

    @Put('/:id')
    actualizarIndicador(@Param('id') id: number, @Body() indicadorActualizarDto: IndicadorActualizarDto) {
        return this._indicadorService.actualizarIndicador(id, indicadorActualizarDto);
    }

    @Delete('/:id')
    eliminarIndicador(@Param('id') id: number) {
        return this._indicadorService.eliminarIndicador(id);
    }

    

}