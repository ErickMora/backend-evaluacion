import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import { CuestionarioPorUsuarioEntity } from './cuestionario-por-usuario.entity';
import { CuestionarioPorUsuarioService } from './cuestionario-por-usuario.service';
import { CuestionarioPorUsuarioActualizarDto } from './dto/cuestionario-por-usuario-actualizar.dto';
import { CuestionarioPorUsuarioCrearDto } from './dto/cuestionario-por-usuario-crear.dto';

@Controller('cuestionario-por-usuario')
export class CuestionarioPorUsuarioController {
    constructor(private readonly _cuestionarioPorUsuarioService: CuestionarioPorUsuarioService) {

    }

    @Get('')
    async buscarCuestionariosPorUsuario(@Query('consulta') consulta?: any): Promise<CuestionarioPorUsuarioEntity[]> {
        if(consulta){
            return await this._cuestionarioPorUsuarioService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._cuestionarioPorUsuarioService.listarCuestionariosPorUsuario();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<CuestionarioPorUsuarioEntity> {
        return await this._cuestionarioPorUsuarioService.buscarPorId(id);
    }

    @Post()
    async crearCuestionarioPorUsuario(@Body() cuestionarioPorUsuarioCrearDto: CuestionarioPorUsuarioCrearDto): Promise<CuestionarioPorUsuarioEntity> {
        return await this._cuestionarioPorUsuarioService.crearCuestionarioPorUsuario(cuestionarioPorUsuarioCrearDto);
    }

    @Put('/:id')
    async actualizarCuestionarioPorUsuario(@Param('id') id: number, @Body() cuestionarioPorUsuarioActualizarDto: CuestionarioPorUsuarioActualizarDto) {
        return await this._cuestionarioPorUsuarioService.actualizarCuestionarioPorUsuario(id, cuestionarioPorUsuarioActualizarDto);
    }

    @Delete('/:id')
    async eliminarCuestionarioPorUsuario(@Param('id') id: number) {
        return await this._cuestionarioPorUsuarioService.eliminarCuestionarioPorUsuario(id);
    }

    

}