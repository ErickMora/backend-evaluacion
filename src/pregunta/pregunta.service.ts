import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { PreguntaActualizarDto } from './dto/pregunta-actualizar.dto';
import { PreguntaCrearDto } from './dto/pregunta-crear.dto';
import { PreguntaEntity } from './pregunta.entity';

@Injectable()
export class PreguntaService {

    constructor(
        @InjectRepository(PreguntaEntity)
        private readonly _preguntaRepository:
            Repository<PreguntaEntity>
    ) {
    }

    async listarPreguntas(): Promise<PreguntaEntity[]> {
        return this._preguntaRepository.find();

    }

    
    async crearPregunta(preguntaCrearDto: PreguntaCrearDto): Promise<PreguntaEntity> {
       
            const nuevoPregunta = new PreguntaEntity();
            nuevoPregunta.codigo = preguntaCrearDto.codigo;
            nuevoPregunta.texto = preguntaCrearDto.texto;
            nuevoPregunta.indicador = preguntaCrearDto.indicador;
            
            try {
                await this._preguntaRepository.save(this._preguntaRepository.create(nuevoPregunta));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoPregunta;
        }

    async actualizarPregunta(idPregunta: number, preguntaActualizarDto: PreguntaActualizarDto): Promise<UpdateResult> {

        const id = idPregunta;
        console.log('Pregunta actualizado: ', id);
        return this._preguntaRepository.update(idPregunta, {

            codigo: preguntaActualizarDto.codigo,
            texto: preguntaActualizarDto.texto,
            indicador: preguntaActualizarDto.indicador
        });
    }

    async eliminarPregunta(idPregunta: number): Promise<DeleteResult> {
        return this._preguntaRepository.delete(idPregunta);
    }

    async buscar(consulta: any): Promise<PreguntaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._preguntaRepository.find(consulta);
    }

    async buscarPorId(idPregunta: number): Promise<PreguntaEntity> {
        return this._preguntaRepository.findOne(idPregunta);
    }

    async buscarPreguntaPorCodigo(codigo: string): Promise<PreguntaEntity> {
        return this._preguntaRepository.findOne(codigo)
    }

    async buscarPregunta(codigo?: string): Promise<PreguntaEntity> {
        return this._preguntaRepository.findOne({where: {codigo: Like(`%${codigo}%`)}});
    }

}