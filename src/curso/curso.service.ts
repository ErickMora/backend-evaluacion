import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { CursoEntity } from './curso.entity';
import { CursoActualizarDto } from './dto/curso-actualizar.dto';
import { CursoCrearDto } from './dto/curso-crear.dto';

@Injectable()
export class CursoService {

    constructor(
        @InjectRepository(CursoEntity)
        private readonly _cursoRepository:
            Repository<CursoEntity>
    ) {
    }

    async listarCursos(): Promise<CursoEntity[]> {
        return await this._cursoRepository.find();

    }

    
    async crearCurso(cursoCrearDto: CursoCrearDto): Promise<CursoEntity> {
       
            const nuevoCurso = new CursoEntity();
            nuevoCurso.nombre = cursoCrearDto.nombre;
            nuevoCurso.codigo = cursoCrearDto.codigo;
            nuevoCurso.periodo = cursoCrearDto.periodo;
            nuevoCurso.materia = cursoCrearDto.materia;
            nuevoCurso.profesor = cursoCrearDto.profesor;
    
            try {
                await this._cursoRepository.save(this._cursoRepository.create(nuevoCurso));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoCurso;
        }

    async actualizarCurso(idCurso: number, cursoActualizarDto: CursoActualizarDto): Promise<UpdateResult> {

        const id = idCurso;
        console.log('Curso actualizado: ', id);
        return await this._cursoRepository.update(idCurso, {

            nombre: cursoActualizarDto.nombre,
            codigo: cursoActualizarDto.codigo,
            periodo: cursoActualizarDto.periodo,
            materia: cursoActualizarDto.materia,
            profesor: cursoActualizarDto.profesor
        });
    }

    async eliminarCurso(idCurso: number): Promise<DeleteResult> {
        return await this._cursoRepository.delete(idCurso);
    }

    async buscar(consulta: any): Promise<CursoEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._cursoRepository.find(consulta);
    }

    async buscarPorId(idCurso: number): Promise<CursoEntity> {
        return await this._cursoRepository.findOne(idCurso, {
            relations: [
              'periodo',
              'profesor',
              'profesor.usuario',
              'materia',
              'cursosPorEstudiante',
              'cursosPorEstudiante.curso',
              'cursosPorEstudiante.estudiante',
              'cursosPorEstudiante.estudiante.usuario',
              'cuestionariosPorUsuario',
              'cuestionariosPorUsuario.cuestionario',
              'cuestionariosPorUsuario.usuario',
              'cuestionariosPorUsuario.profesor',
              'cuestionariosPorUsuario.curso',
            ]});
    }

    async buscarCursoPorCodigo(codigo: string): Promise<CursoEntity> {
        return await this._cursoRepository.findOne(codigo)
    }

    async buscarCurso(codigo?: string): Promise<CursoEntity> {
        return await this._cursoRepository.findOne({where: {codigo: Like(`%${codigo}%`)}});
    }

}