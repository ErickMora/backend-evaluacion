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
    buscarCategorias(@Query('consulta') consulta?: any): Promise<CategoriaEntity[]> {
        if(consulta){
            return this._categoriaService.buscar(JSON.parse(consulta));
        }
        else{
            return this._categoriaService.listarCategorias();
        }
    }
    
    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<CategoriaEntity> {
        return this._categoriaService.buscarPorId(id);
    }

    @Post()
    crearCategoria(@Body() categoriaCrearDto: CategoriaCrearDto): Promise<CategoriaEntity> {
        const categoriaCrear = new CategoriaCrearDto();
        Object.keys(categoriaCrearDto).map(atributo => {
            categoriaCrear[atributo] = categoriaCrearDto[atributo];
        });
        return this._categoriaService.crearCategoria(categoriaCrear);
    }

    @Put('/:id')
    actualizarCategoria(@Param('id') id: number, @Body() categoriaActualizarDto: CategoriaActualizarDto) {
        return this._categoriaService.actualizarCategoria(id, categoriaActualizarDto);
    }

    @Delete('/:id')
    eliminarCategoria(@Param('id') id: number) {
        return this._categoriaService.eliminarCategoria(id);
    }

    

}