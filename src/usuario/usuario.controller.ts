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
    async buscarUsuarios(@Query('consulta') consulta?: any): Promise<UsuarioEntity[]> {
        //return this._usuarioService.buscar(JSON.parse(consulta));
        if(consulta){
            return await this._usuarioService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._usuarioService.listarUsuarios();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<UsuarioEntity> {
        return await this._usuarioService.buscarPorId(id);
    }

    @Post()
    async crearUsuario(@Body() usuarioCrearDto: UsuarioCrearDto): Promise<UsuarioEntity> {
        return await this._usuarioService.crearUsuario(usuarioCrearDto);
    }

    @Put('/:id')
    async actualizarUsuario(@Param('id') id: number, @Body() usuarioActualizarDto: UsuarioActualizarDto) {
        return await this._usuarioService.actualizarUsuario(id, usuarioActualizarDto);
    }

    @Delete('/:id')
    async eliminarUsuario(@Param('id') id: number) {
        return await this._usuarioService.eliminarUsuario(id);
    }

    

}