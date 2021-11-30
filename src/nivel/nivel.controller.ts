import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import {validate} from 'class-validator';
import { NivelActualizarDto } from './dto/nivel-actualizar.dto';
import { NivelCrearDto } from './dto/nivel-crear.dto';
import { NivelEntity } from './nivel.entity';
import { NivelService } from './nivel.service';

@Controller('nivel')
export class NivelController {
    constructor(private readonly _nivelService: NivelService) {

    }

    @Get('')
    async buscarNiveles(@Query('consulta') consulta?: any): Promise<NivelEntity[]> {
        if(consulta){
            return await this._nivelService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._nivelService.listarNiveles();
        }
    }
    
    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<NivelEntity> {
        return await this._nivelService.buscarPorId(id);
    }

    @Post()
    async crearNivel(@Body() nivelCrearDto: NivelCrearDto): Promise<NivelEntity> {
        const nivelCrear = new NivelCrearDto();
        Object.keys(nivelCrearDto).map(atributo => {
            nivelCrear[atributo] = nivelCrearDto[atributo];
        });
        return await this._nivelService.crearNivel(nivelCrear);
    }

    @Put('/:id')
    async actualizarNivel(@Param('id') id: number, @Body() nivelActualizarDto: NivelActualizarDto) {
        return await this._nivelService.actualizarNivel(id, nivelActualizarDto);
    }

    @Delete('/:id')
    async eliminarNivel(@Param('id') id: number) {
        return await this._nivelService.eliminarNivel(id);
    }

    

}