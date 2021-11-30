import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { EstudianteActualizarDto } from './dto/estudiante-actualizar.dto';
import { EstudianteCrearDto } from './dto/estudiante-crear.dto';
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly _estudianteRepository:
            Repository<EstudianteEntity>
    ) {
    }

    async listarEstudiantes(): Promise<EstudianteEntity[]> {
        return await this._estudianteRepository.find();

    }

    
    async crearEstudiante(estudianteCrearDto: EstudianteCrearDto): Promise<EstudianteEntity> {
    
            const nuevoEstudiante = new EstudianteEntity();
            nuevoEstudiante.codigo = estudianteCrearDto.codigo;
            nuevoEstudiante.nivel = estudianteCrearDto.nivel;  
            nuevoEstudiante.usuario = estudianteCrearDto.usuario;           
    
            try {
                await this._estudianteRepository.save(this._estudianteRepository.create(nuevoEstudiante));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoEstudiante;
        }

    async actualizarEstudiante(idEstudiante: number, estudianteActualizarDto: EstudianteActualizarDto): Promise<UpdateResult> {

        const id = idEstudiante;
        console.log('Estudiante actualizado: ', id);
        return await this._estudianteRepository.update(idEstudiante, {

            codigo: estudianteActualizarDto.codigo,
            nivel: estudianteActualizarDto.nivel,
            usuario: estudianteActualizarDto.usuario
        });
    }

    async eliminarEstudiante(idEstudiante: number): Promise<DeleteResult> {
        return await this._estudianteRepository.delete(idEstudiante);
    }

    async buscar(consulta: any): Promise<EstudianteEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._estudianteRepository.find(consulta);
    }

    async buscarPorId(idEstudiante: number): Promise<EstudianteEntity> {
        return await this._estudianteRepository.findOne(idEstudiante, {
            relations: [
              'usuario',
              'nivel',
              'cursosPorEstudiante',
              'cursosPorEstudiante.curso',
              'cursosPorEstudiante.estudiante',
              'cursosPorEstudiante.estudiante.usuario'
            ],
          });
    }

    async buscarEstudiantePorCedula(numCedula: string): Promise<EstudianteEntity> {
        return await this._estudianteRepository.findOne(numCedula);
    }

    async buscarEstudiante(numCedula?: string): Promise<EstudianteEntity> {
        return await this._estudianteRepository.findOne({where: {cedula: Like(`%${numCedula}%`)}});
    }

}