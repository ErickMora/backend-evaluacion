import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { OpcionActualizarDto } from './dto/opcion-actualizar.dto';
import { OpcionCrearDto } from './dto/opcion-crear.dto';
import { OpcionEntity } from './opcion.entity';

@Injectable()
export class OpcionService {

    constructor(
        @InjectRepository(OpcionEntity)
        private readonly _opcionRepository:
            Repository<OpcionEntity>
    ) {
    }

    async listarOpciones(): Promise<OpcionEntity[]> {
        return await this._opcionRepository.find();

    }

    
    async crearOpcion(opcionCrearDto: OpcionCrearDto): Promise<OpcionEntity> {
       
            const nuevoOpcion = new OpcionEntity();
            nuevoOpcion.nombre = opcionCrearDto.nombre;
            nuevoOpcion.valor = opcionCrearDto.valor;
            
            try {
                await this._opcionRepository.save(this._opcionRepository.create(nuevoOpcion));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoOpcion;
        }

    async actualizarOpcion(idOpcion: number, opcionActualizarDto: OpcionActualizarDto): Promise<UpdateResult> {

        const id = idOpcion;
        console.log('Opcion actualizado: ', id);
        return await this._opcionRepository.update(idOpcion, {

            nombre: opcionActualizarDto.nombre,
            valor: opcionActualizarDto.valor
        });
    }

    async eliminarOpcion(idOpcion: number): Promise<DeleteResult> {
        return await this._opcionRepository.delete(idOpcion);
    }

    async buscar(consulta: any): Promise<OpcionEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._opcionRepository.find(consulta);
    }

    async buscarPorId(idOpcion: number): Promise<OpcionEntity> {
        return await this._opcionRepository.findOne(idOpcion, {
            relations: [
                'opcionesPorPregunta',
                'opcionesPorPregunta.pregunta',
                'opcionesPorPregunta.opcion'
            ]});
    }

    async buscarOpcionPorNombre(nombre: string): Promise<OpcionEntity> {
        return await this._opcionRepository.findOne(nombre)
    }

    async buscarOpcion(nombre?: string): Promise<OpcionEntity> {
        return await this._opcionRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

}