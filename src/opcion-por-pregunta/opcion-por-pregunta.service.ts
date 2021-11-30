import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { OpcionPorPreguntaActualizarDto } from './dto/opcion-por-pregunta-actualizar.dto';
import { OpcionPorPreguntaCrearDto } from './dto/opcion-por-pregunta-crear.dto';
import { OpcionPorPreguntaEntity } from './opcion-por-pregunta.entity';

@Injectable()
export class OpcionPorPreguntaService {

    constructor(
        @InjectRepository(OpcionPorPreguntaEntity)
        private readonly _opcionPorPreguntaRepository:
            Repository<OpcionPorPreguntaEntity>
    ) {
    }

    async listarOpcionesPorPregunta(): Promise<OpcionPorPreguntaEntity[]> {
        return await this._opcionPorPreguntaRepository.find();

    }

    
    async crearOpcionPorPregunta(opcionPorPreguntaCrearDto: OpcionPorPreguntaCrearDto): Promise<OpcionPorPreguntaEntity> {
       
        const nuevoOpcionPorPregunta = new OpcionPorPreguntaEntity();
        nuevoOpcionPorPregunta.pregunta = opcionPorPreguntaCrearDto.pregunta;
        nuevoOpcionPorPregunta.opcion = opcionPorPreguntaCrearDto.opcion;
    
        try {
            await this._opcionPorPreguntaRepository.save(this._opcionPorPreguntaRepository.create(nuevoOpcionPorPregunta));
        } catch (error) {
            console.error(error);
        }
        
    return nuevoOpcionPorPregunta;
    }

    async crearOpcionesPorPregunta(opcionesPorPreguntaCrearDto: OpcionPorPreguntaCrearDto[]): Promise<OpcionPorPreguntaEntity[]> {
       
        const nuevoOpcionesPorPregunta: OpcionPorPreguntaEntity[] = 
        this._opcionPorPreguntaRepository.create(opcionesPorPreguntaCrearDto);
    
        try {
            await this._opcionPorPreguntaRepository.save(nuevoOpcionesPorPregunta);
        } catch (error) {
            console.error(error);
        }
        
    return nuevoOpcionesPorPregunta;
    }

    async actualizarOpcionPorPregunta(idOpcionPorPregunta: number, opcionPorPreguntaActualizarDto: OpcionPorPreguntaActualizarDto): Promise<UpdateResult> {

        const id = idOpcionPorPregunta;
        console.log('Opcion Por Pregunta actualizado: ', id);
        return await this._opcionPorPreguntaRepository.update(idOpcionPorPregunta, {
            pregunta: opcionPorPreguntaActualizarDto.pregunta,
            opcion: opcionPorPreguntaActualizarDto.opcion
        });
    }

    async eliminarOpcionPorPregunta(idOpcionPorPregunta: number): Promise<DeleteResult> {
        return await this._opcionPorPreguntaRepository.delete(idOpcionPorPregunta);
    }

    async buscar(consulta: any): Promise<OpcionPorPreguntaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._opcionPorPreguntaRepository.find(consulta);
    }

    async buscarPorId(idOpcionPorPregunta: number): Promise<OpcionPorPreguntaEntity> {
        return await this._opcionPorPreguntaRepository.findOne(idOpcionPorPregunta, {
            relations: [
              'pregunta',
              'opcion'
            ]});
    }

}