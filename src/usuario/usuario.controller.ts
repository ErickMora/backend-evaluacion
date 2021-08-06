import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';

import {validate} from 'class-validator';
import { UsuarioActualizarDto } from './dto/usuario-actualizar.dto';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('')
    buscarUsuarios(@Query('consulta') consulta?: any): Promise<UsuarioEntity[]> {
        if(consulta){
            return this._usuarioService.buscar(JSON.parse(consulta));
        }
        else{
            return this._usuarioService.listarUsuarios();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<UsuarioEntity> {
        return this._usuarioService.buscarPorId(id);
    }

    @Post()
    crearUsuario(@Body() usuarioCrearDto: UsuarioCrearDto): Promise<UsuarioEntity> {
        return this._usuarioService.crearUsuario(usuarioCrearDto);
    }

    @Put('/:id')
    actualizarUsuario(@Param('id') id: number, @Body() usuarioActualizarDto: UsuarioActualizarDto) {
        return this._usuarioService.actualizarUsuario(id, usuarioActualizarDto);
    }

    @Delete('/:id')
    eliminarUsuario(@Param('id') id: number) {
        return this._usuarioService.eliminarUsuario(id);
    }

    

}