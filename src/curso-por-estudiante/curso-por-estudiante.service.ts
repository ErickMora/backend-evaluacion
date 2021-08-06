import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { CursoPorEstudianteEntity } from './curso-por-estudiante.entity';
import { CursoPorEstudianteActualizarDto } from './dto/curso-por-estudiante-actualizar.dto';
import { CursoPorEstudianteCrearDto } from './dto/curso-por-estudiante-crear.dto';

@Injectable()
export class CursoPorEstudianteService {

    constructor(
        @InjectRepository(CursoPorEstudianteEntity)
        private readonly _cursoPorEstudianteRepository:
            Repository<CursoPorEstudianteEntity>
    ) {
    }

    async listarCursosPorEstudiante(): Promise<CursoPorEstudianteEntity[]> {
        return this._cursoPorEstudianteRepository.find();

    }

    
    async crearCursoPorEstudiante(cursoPorEstudianteCrearDto: CursoPorEstudianteCrearDto): Promise<CursoPorEstudianteEntity> {
       
            const nuevoCursoPorEstudiante = new CursoPorEstudianteEntity();
            nuevoCursoPorEstudiante.curso = cursoPorEstudianteCrearDto.curso;
            nuevoCursoPorEstudiante.estudiante = cursoPorEstudianteCrearDto.estudiante;
    
            try {
                await this._cursoPorEstudianteRepository.save(this._cursoPorEstudianteRepository.create(nuevoCursoPorEstudiante));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoCursoPorEstudiante;
        }

    async actualizarCursoPorEstudiante(idCursoPorEstudiante: number, cursoPorEstudianteActualizarDto: CursoPorEstudianteActualizarDto): Promise<UpdateResult> {

        const id = idCursoPorEstudiante;
        console.log('Curso Por Estudiante actualizado: ', id);
        return this._cursoPorEstudianteRepository.update(idCursoPorEstudiante, {
            curso: cursoPorEstudianteActualizarDto.curso,
            estudiante: cursoPorEstudianteActualizarDto.estudiante
        });
    }

    async eliminarCursoPorEstudiante(idCursoPorEstudiante: number): Promise<DeleteResult> {
        return this._cursoPorEstudianteRepository.delete(idCursoPorEstudiante);
    }

    async buscar(consulta: any): Promise<CursoPorEstudianteEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._cursoPorEstudianteRepository.find(consulta);
    }

    async buscarPorId(idCursoPorEstudiante: number): Promise<CursoPorEstudianteEntity> {
        return this._cursoPorEstudianteRepository.findOne(idCursoPorEstudiante, {
            relations: [
              'curso',
              'estudiante',
              'estudiante.usuario'
            ]});
    }

}