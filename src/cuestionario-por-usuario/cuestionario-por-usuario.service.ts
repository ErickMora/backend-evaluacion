import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { CuestionarioPorUsuarioEntity } from './cuestionario-por-usuario.entity';
import { CuestionarioPorUsuarioActualizarDto } from './dto/cuestionario-por-usuario-actualizar.dto';
import { CuestionarioPorUsuarioCrearDto } from './dto/cuestionario-por-usuario-crear.dto';

@Injectable()
export class CuestionarioPorUsuarioService {

    constructor(
        @InjectRepository(CuestionarioPorUsuarioEntity)
        private readonly _cuestionarioPorUsuarioRepository:
            Repository<CuestionarioPorUsuarioEntity>
    ) {
    }

    async listarCuestionariosPorUsuario(): Promise<CuestionarioPorUsuarioEntity[]> {
        return await this._cuestionarioPorUsuarioRepository.find();

    }

    
    async crearCuestionarioPorUsuario(cuestionarioPorUsuarioCrearDto: CuestionarioPorUsuarioCrearDto): Promise<CuestionarioPorUsuarioEntity> {
       
        const nuevoCuestionarioPorUsuario = new CuestionarioPorUsuarioEntity();
        nuevoCuestionarioPorUsuario.estado = cuestionarioPorUsuarioCrearDto.estado;
        nuevoCuestionarioPorUsuario.calificacion = cuestionarioPorUsuarioCrearDto.calificacion;
        nuevoCuestionarioPorUsuario.comentario = cuestionarioPorUsuarioCrearDto.comentario;
        nuevoCuestionarioPorUsuario.profesor = cuestionarioPorUsuarioCrearDto.profesor;
        nuevoCuestionarioPorUsuario.usuario = cuestionarioPorUsuarioCrearDto.usuario;
        nuevoCuestionarioPorUsuario.cuestionario = cuestionarioPorUsuarioCrearDto.cuestionario;
        nuevoCuestionarioPorUsuario.curso = cuestionarioPorUsuarioCrearDto.curso;
    
        try {
            await this._cuestionarioPorUsuarioRepository.save(this._cuestionarioPorUsuarioRepository.create(nuevoCuestionarioPorUsuario));
        } catch (error) {
            console.error(error);
        }
        
    return nuevoCuestionarioPorUsuario;
    }

    async crearCuestionariosPorUsuario(cuestionariosPorUsuarioCrearDto: CuestionarioPorUsuarioCrearDto[]): Promise<CuestionarioPorUsuarioEntity[]> {
       
        const nuevoCuestionariosPorUsuario: CuestionarioPorUsuarioEntity[] = 
        this._cuestionarioPorUsuarioRepository.create(cuestionariosPorUsuarioCrearDto);
    
        try {
            await this._cuestionarioPorUsuarioRepository.save(nuevoCuestionariosPorUsuario);
        } catch (error) {
            console.error(error);
        }
        
    return nuevoCuestionariosPorUsuario;
    }

    async actualizarCuestionarioPorUsuario(idCuestionarioPorUsuario: number, cuestionarioPorUsuarioActualizarDto: CuestionarioPorUsuarioActualizarDto): Promise<UpdateResult> {

        const id = idCuestionarioPorUsuario;
        console.log('Cuestionario Por Usuario actualizado: ', id);
        return await this._cuestionarioPorUsuarioRepository.update(idCuestionarioPorUsuario, {
            estado: cuestionarioPorUsuarioActualizarDto.estado,
            calificacion: cuestionarioPorUsuarioActualizarDto.calificacion,
            comentario: cuestionarioPorUsuarioActualizarDto.comentario,
            profesor: cuestionarioPorUsuarioActualizarDto.profesor,
            usuario: cuestionarioPorUsuarioActualizarDto.usuario,
            cuestionario: cuestionarioPorUsuarioActualizarDto.cuestionario,
            curso: cuestionarioPorUsuarioActualizarDto.curso
        });
    }

    async eliminarCuestionarioPorUsuario(idCuestionarioPorUsuario: number): Promise<DeleteResult> {
        return await this._cuestionarioPorUsuarioRepository.delete(idCuestionarioPorUsuario);
    }

    async buscar(consulta: any): Promise<CuestionarioPorUsuarioEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._cuestionarioPorUsuarioRepository.find(consulta);
    }

    async buscarPorId(idCuestionarioPorUsuario: number): Promise<CuestionarioPorUsuarioEntity> {
        return await this._cuestionarioPorUsuarioRepository.findOne(idCuestionarioPorUsuario, {
            relations: [
              'usuario',
              'cuestionario',
              'profesor',
              'profesor.usuario',
              'curso',
              'curso.materia'
            ]});
    }

}