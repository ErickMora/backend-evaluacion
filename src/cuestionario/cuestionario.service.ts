import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { CuestionarioEntity } from './cuestionario.entity';
import { CuestionarioActualizarDto } from './dto/cuestionario-actualizar.dto';
import { CuestionarioCrearDto } from './dto/cuestionario-crear.dto';

@Injectable()
export class CuestionarioService {

    constructor(
        @InjectRepository(CuestionarioEntity)
        private readonly _cuestionarioRepository:
            Repository<CuestionarioEntity>
    ) {
    }

    async listarCuestionarios(): Promise<CuestionarioEntity[]> {
        return await this._cuestionarioRepository.find();

    }

    
    async crearCuestionario(cuestionarioCrearDto: CuestionarioCrearDto): Promise<CuestionarioEntity> {
       
            const nuevoCuestionario = new CuestionarioEntity();
            nuevoCuestionario.titulo = cuestionarioCrearDto.titulo;
            nuevoCuestionario.codigo = cuestionarioCrearDto.codigo;
            nuevoCuestionario.informacion = cuestionarioCrearDto.informacion;
            nuevoCuestionario.tipo = cuestionarioCrearDto.tipo;
            nuevoCuestionario.fecha = cuestionarioCrearDto.fecha;
            nuevoCuestionario.estado = cuestionarioCrearDto.estado;
            nuevoCuestionario.periodo = cuestionarioCrearDto.periodo;
    
            try {
                await this._cuestionarioRepository.save(this._cuestionarioRepository.create(nuevoCuestionario));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoCuestionario;
        }

    async actualizarCuestionario(idCuestionario: number, cuestionarioActualizarDto: CuestionarioActualizarDto): Promise<UpdateResult> {

        const id = idCuestionario;
        console.log('Cuestionario actualizado: ', id);
        return await this._cuestionarioRepository.update(idCuestionario, {

            titulo: cuestionarioActualizarDto.titulo,
            codigo: cuestionarioActualizarDto.codigo,
            informacion: cuestionarioActualizarDto.informacion,
            tipo: cuestionarioActualizarDto.tipo,
            fecha: cuestionarioActualizarDto.fecha,
            estado: cuestionarioActualizarDto.estado,
            periodo: cuestionarioActualizarDto.periodo
        });
    }

    async eliminarCuestionario(idCuestionario: number): Promise<DeleteResult> {
        return await this._cuestionarioRepository.delete(idCuestionario);
    }

    async buscar(consulta: any): Promise<CuestionarioEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._cuestionarioRepository.find(consulta);
    }

    async buscarPorId(idCuestionario: number): Promise<CuestionarioEntity> {
        return await this._cuestionarioRepository.findOne(idCuestionario, {
            relations: [
              'preguntasPorCuestionario',
              'preguntasPorCuestionario.pregunta',
              'preguntasPorCuestionario.pregunta.indicador',
              'preguntasPorCuestionario.cuestionario',
              'cuestionariosPorUsuario',
              'cuestionariosPorUsuario.cuestionario',
              'cuestionariosPorUsuario.usuario',
              'cuestionariosPorUsuario.profesor',
              'periodo'
            ]});
    }

    async buscarCuestionarioPorCodigo(codigo: string): Promise<CuestionarioEntity> {
        return await this._cuestionarioRepository.findOne(codigo)
    }

    async buscarCuestionario(codigo?: string): Promise<CuestionarioEntity> {
        return await this._cuestionarioRepository.findOne({where: {codigo: Like(`%${codigo}%`)}});
    }

}