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
    buscarCursosPorEstudiante(@Query('consulta') consulta?: any): Promise<CursoPorEstudianteEntity[]> {
        if(consulta){
            return this._cursoPorEstudianteService.buscar(JSON.parse(consulta));
        }
        else{
            return this._cursoPorEstudianteService.listarCursosPorEstudiante();
        }
    }

    @Get('/:id')
    buscarPorId(@Param('id') id: number): Promise<CursoPorEstudianteEntity> {
        return this._cursoPorEstudianteService.buscarPorId(id);
    }

    @Post()
    crearCursoPorEstudiante(@Body() cursoPorEstudianteCrearDto: CursoPorEstudianteCrearDto): Promise<CursoPorEstudianteEntity> {
        return this._cursoPorEstudianteService.crearCursoPorEstudiante(cursoPorEstudianteCrearDto);
    }

    @Put('/:id')
    actualizarCursoPorEstudiante(@Param('id') id: number, @Body() cursoPorEstudianteActualizarDto: CursoPorEstudianteActualizarDto) {
        return this._cursoPorEstudianteService.actualizarCursoPorEstudiante(id, cursoPorEstudianteActualizarDto);
    }

    @Delete('/:id')
    eliminarCursoPorEstudiante(@Param('id') id: number) {
        return this._cursoPorEstudianteService.eliminarCursoPorEstudiante(id);
    }

    

}