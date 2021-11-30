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
    async buscarIndicadores(@Query('consulta') consulta?: any): Promise<IndicadorEntity[]> {
        if(consulta){
            return await this._indicadorService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._indicadorService.listarIndicadores();
        }
    }
    
    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<IndicadorEntity> {
        return await this._indicadorService.buscarPorId(id);
    }

    @Post()
    async crearIndicador(@Body() indicadorCrearDto: IndicadorCrearDto): Promise<IndicadorEntity> {
        const indicadorCrear = new IndicadorCrearDto();
        Object.keys(indicadorCrearDto).map(atributo => {
            indicadorCrear[atributo] = indicadorCrearDto[atributo];
        });
        return await this._indicadorService.crearIndicador(indicadorCrear);
    }

    @Put('/:id')
    async actualizarIndicador(@Param('id') id: number, @Body() indicadorActualizarDto: IndicadorActualizarDto) {
        return await this._indicadorService.actualizarIndicador(id, indicadorActualizarDto);
    }

    @Delete('/:id')
    async eliminarIndicador(@Param('id') id: number) {
        return await this._indicadorService.eliminarIndicador(id);
    }

    

}