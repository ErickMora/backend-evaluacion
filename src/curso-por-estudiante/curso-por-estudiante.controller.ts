import {Body, Controller, Get, Param, Post, Query, Request, Res, Put, Delete} from '@nestjs/common';
import { CursoPorEstudianteEntity } from './curso-por-estudiante.entity';
import { CursoPorEstudianteService } from './curso-por-estudiante.service';
import { CursoPorEstudianteActualizarDto } from './dto/curso-por-estudiante-actualizar.dto';
import { CursoPorEstudianteCrearDto } from './dto/curso-por-estudiante-crear.dto';

@Controller('curso-por-estudiante')
export class CursoPorEstudianteController {
    constructor(private readonly _cursoPorEstudianteService: CursoPorEstudianteService) {

    }

    @Get('')
    async buscarCursosPorEstudiante(@Query('consulta') consulta?: any): Promise<CursoPorEstudianteEntity[]> {
        if(consulta){
            return await this._cursoPorEstudianteService.buscar(JSON.parse(consulta));
        }
        else{
            return await this._cursoPorEstudianteService.listarCursosPorEstudiante();
        }
    }

    @Get('/:id')
    async buscarPorId(@Param('id') id: number): Promise<CursoPorEstudianteEntity> {
        return await this._cursoPorEstudianteService.buscarPorId(id);
    }

    @Post()
    async crearCursoPorEstudiante(@Body() cursoPorEstudianteCrearDto: CursoPorEstudianteCrearDto): Promise<CursoPorEstudianteEntity> {
        return await this._cursoPorEstudianteService.crearCursoPorEstudiante(cursoPorEstudianteCrearDto);
    }

    @Put('/:id')
    async actualizarCursoPorEstudiante(@Param('id') id: number, @Body() cursoPorEstudianteActualizarDto: CursoPorEstudianteActualizarDto) {
        return await this._cursoPorEstudianteService.actualizarCursoPorEstudiante(id, cursoPorEstudianteActualizarDto);
    }

    @Delete('/:id')
    async eliminarCursoPorEstudiante(@Param('id') id: number) {
        return await this._cursoPorEstudianteService.eliminarCursoPorEstudiante(id);
    }

    

}