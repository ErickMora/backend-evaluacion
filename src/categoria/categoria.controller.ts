import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { CategoriaEntity } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaActualizarDto } from './dto/categoria-actualizar.dto';
import { CategoriaCrearDto } from './dto/categoria-crear.dto';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly _categoriaService: CategoriaService) {

    }

    @Get('')
    async buscarCategorias(@Query('consulta') consulta?: any): Promise<CategoriaEntity[]> {
        if(consulta){
            return await this._categoriaService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._categoriaService.listarCategorias();
        }
    }
    
    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<CategoriaEntity> {
        return await this._categoriaService.buscarPorId(id);
    }

    @Post()
    async crearCategoria(@Body() categoriaCrearDto: CategoriaCrearDto): Promise<CategoriaEntity> {
        const categoriaCrear = new CategoriaCrearDto();
        Object.keys(categoriaCrearDto).map(atributo => {
            categoriaCrear[atributo] = categoriaCrearDto[atributo];
        });
        return await this._categoriaService.crearCategoria(categoriaCrear);
    }

    @Put('/:id')
    async actualizarCategoria(@Param('id') id: number, @Body() categoriaActualizarDto: CategoriaActualizarDto) {
        return await this._categoriaService.actualizarCategoria(id, categoriaActualizarDto);
    }

    @Delete('/:id')
    async eliminarCategoria(@Param('id') id: number) {
        return await this._categoriaService.eliminarCategoria(id);
    }

    

}