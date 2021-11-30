import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import {validate} from 'class-validator';
import { PeriodoActualizarDto } from './dto/periodo-actualizar.dto';
import { PeriodoCrearDto } from './dto/periodo-crear.dto';
import { PeriodoEntity } from './periodo.entity';
import { PeriodoService } from './periodo.service';

@Controller('periodo')
export class PeriodoController {
    constructor(private readonly _periodoService: PeriodoService) {

    }

    @Get('')
    async buscarPeriodos(@Query('consulta') consulta?: any): Promise<PeriodoEntity[]> {
        if(consulta){
            return await this._periodoService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._periodoService.listarPeriodos();
        }
    }
    
    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<PeriodoEntity> {
        return await this._periodoService.buscarPorId(id);
    }

    @Post()
    async crearPeriodo(@Body() periodoCrearDto: PeriodoCrearDto): Promise<PeriodoEntity> {
        const periodoCrear = new PeriodoCrearDto();
        Object.keys(periodoCrearDto).map(atributo => {
            periodoCrear[atributo] = periodoCrearDto[atributo];
        });
        return await this._periodoService.crearPeriodo(periodoCrear);
    }

    @Put('/:id')
    async actualizarPeriodo(@Param('id') id: number, @Body() periodoActualizarDto: PeriodoActualizarDto) {
        return await this._periodoService.actualizarPeriodo(id, periodoActualizarDto);
    }

    @Delete('/:id')
    async eliminarPeriodo(@Param('id') id: number) {
        return await this._periodoService.eliminarPeriodo(id);
    }

    

}