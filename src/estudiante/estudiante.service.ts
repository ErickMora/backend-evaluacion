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
        return this._estudianteRepository.find();

    }

    
    async crearEstudiante(estudianteCrearDto: EstudianteCrearDto): Promise<EstudianteEntity> {
        //const { nombre, apellido, numCedula, telefono, direccion, correo } = estudianteCrearDto;
    
            const nuevoEstudiante = new EstudianteEntity();
            nuevoEstudiante.nombre = estudianteCrearDto.nombre;
            nuevoEstudiante.apellido = estudianteCrearDto.apellido;
            nuevoEstudiante.numCedula = estudianteCrearDto.numCedula;
            nuevoEstudiante.telefono = estudianteCrearDto.telefono;
            nuevoEstudiante.direccion = estudianteCrearDto.direccion;
            nuevoEstudiante.correo = estudianteCrearDto.correo;
    
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
        return this._estudianteRepository.update(idEstudiante, {

            nombre: estudianteActualizarDto.nombre,
            apellido: estudianteActualizarDto.apellido,
            telefono: estudianteActualizarDto.telefono,
            correo: estudianteActualizarDto.correo,
            direccion: estudianteActualizarDto.direccion
        });
    }

    async eliminarEstudiante(idEstudiante: number): Promise<DeleteResult> {
        return this._estudianteRepository.delete(idEstudiante);
    }

    async buscar(consulta: any): Promise<EstudianteEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._estudianteRepository.find(consulta);
    }

    async buscarPorId(idEstudiante: number): Promise<EstudianteEntity> {
        return this._estudianteRepository.findOne(idEstudiante);
    }

    async buscarEstudiantePorCedula(numCedula: string): Promise<EstudianteEntity> {
        return this._estudianteRepository.findOne(numCedula)
    }

    async buscarEstudiante(numCedula?: string): Promise<EstudianteEntity> {
        return this._estudianteRepository.findOne({where: {cedula: Like(`%${numCedula}%`)}});
    }

//}

    /*
        buscarUsuario(username: string): Promise<Usuario[]> {
            return this._usuarioRepository..filter(
                (usuario)=>{
                    return usuario.username.includes(username);
                }
            );
        }*/

}