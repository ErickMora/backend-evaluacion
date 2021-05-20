import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { ProfesorActualizarDto } from './dto/profesor-actualizar.dto';
import { ProfesorCrearDto } from './dto/profesor-crear.dto';
import { ProfesorEntity } from './profesor.entity';

@Injectable()
export class ProfesorService {

    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly _profesorRepository:
            Repository<ProfesorEntity>
    ) {
    }

    async listarProfesores(): Promise<ProfesorEntity[]> {
        return this._profesorRepository.find();

    }

    
    async crearProfesor(profesorCrearDto: ProfesorCrearDto): Promise<ProfesorEntity> {
        //const { nombre, apellido, numCedula, telefono, direccion, correo } = profesorCrearDto;
    
            const nuevoProfesor = new ProfesorEntity();
            nuevoProfesor.nombre = profesorCrearDto.nombre;
            nuevoProfesor.apellido = profesorCrearDto.apellido;
            nuevoProfesor.numCedula = profesorCrearDto.numCedula;
            nuevoProfesor.telefono = profesorCrearDto.telefono;
            nuevoProfesor.direccion = profesorCrearDto.direccion;
            nuevoProfesor.correo = profesorCrearDto.correo;
    
            try {
                await this._profesorRepository.save(this._profesorRepository.create(nuevoProfesor));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoProfesor;
        }

    async actualizarProfesor(idProfesor: number, profesorActualizarDto: ProfesorActualizarDto): Promise<UpdateResult> {

        const id = idProfesor;
        console.log('Profesor actualizado: ', id);
        return this._profesorRepository.update(idProfesor, {

            nombre: profesorActualizarDto.nombre,
            apellido: profesorActualizarDto.apellido,
            telefono: profesorActualizarDto.telefono,
            correo: profesorActualizarDto.correo,
            direccion: profesorActualizarDto.direccion
        });
    }

    async eliminarProfesor(idProfesor: number): Promise<DeleteResult> {
        return this._profesorRepository.delete(idProfesor);
    }

    async buscar(consulta: any): Promise<ProfesorEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._profesorRepository.find(consulta);
    }

    async buscarPorId(idProfesor: number): Promise<ProfesorEntity> {
        return this._profesorRepository.findOne(idProfesor);
    }

    async buscarProfesorPorCedula(numCedula: string): Promise<ProfesorEntity> {
        return this._profesorRepository.findOne(numCedula)
    }

    async buscarProfesor(numCedula?: string): Promise<ProfesorEntity> {
        return this._profesorRepository.findOne({where: {cedula: Like(`%${numCedula}%`)}});
    }

}