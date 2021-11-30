import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { PeriodoActualizarDto } from './dto/periodo-actualizar.dto';
import { PeriodoCrearDto } from './dto/periodo-crear.dto';
import { PeriodoEntity } from './periodo.entity';

@Injectable()
export class PeriodoService {

    constructor(
        @InjectRepository(PeriodoEntity)
        private readonly _periodoRepository:
            Repository<PeriodoEntity>
    ) {
    }

    async listarPeriodos(): Promise<PeriodoEntity[]> {
        return await this._periodoRepository.find();

    }

    
    async crearPeriodo(periodoCrearDto: PeriodoCrearDto): Promise<PeriodoEntity> {
       
            const nuevoPeriodo = new PeriodoEntity();
            nuevoPeriodo.nombre = periodoCrearDto.nombre;
            
            try {
                await this._periodoRepository.save(this._periodoRepository.create(nuevoPeriodo));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoPeriodo;
        }

    async actualizarPeriodo(idPeriodo: number, periodoActualizarDto: PeriodoActualizarDto): Promise<UpdateResult> {

        const id = idPeriodo;
        console.log('Periodo actualizado: ', id);
        return await this._periodoRepository.update(idPeriodo, {

            nombre: periodoActualizarDto.nombre
        });
    }

    async eliminarPeriodo(idPeriodo: number): Promise<DeleteResult> {
        return await this._periodoRepository.delete(idPeriodo);
    }

    async buscar(consulta: any): Promise<PeriodoEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._periodoRepository.find(consulta);
    }

    async buscarPorId(idPeriodo: number): Promise<PeriodoEntity> {
        return await this._periodoRepository.findOne(idPeriodo, {
            relations: [
              'cursos',
              'cuestionarios'
            ]});
    }

    async buscarPeriodoPorNombre(nombre: string): Promise<PeriodoEntity> {
        return await this._periodoRepository.findOne(nombre)
    }

    async buscarPeriodo(nombre?: string): Promise<PeriodoEntity> {
        return await this._periodoRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

}