import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { IndicadorActualizarDto } from './dto/indicador-actualizar.dto';
import { IndicadorCrearDto } from './dto/indicador-crear.dto';
import { IndicadorEntity } from './indicador.entity';

@Injectable()
export class IndicadorService {

    constructor(
        @InjectRepository(IndicadorEntity)
        private readonly _indicadorRepository:
            Repository<IndicadorEntity>
    ) {
    }

    async listarIndicadores(): Promise<IndicadorEntity[]> {
        return this._indicadorRepository.find();

    }

    
    async crearIndicador(indicadorCrearDto: IndicadorCrearDto): Promise<IndicadorEntity> {
       
            const nuevoIndicador = new IndicadorEntity();
            nuevoIndicador.nombre = indicadorCrearDto.nombre;
            nuevoIndicador.descripcion = indicadorCrearDto.descripcion;
            nuevoIndicador.area = indicadorCrearDto.area;
            
            try {
                await this._indicadorRepository.save(this._indicadorRepository.create(nuevoIndicador));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoIndicador;
        }

    async actualizarIndicador(idIndicador: number, indicadorActualizarDto: IndicadorActualizarDto): Promise<UpdateResult> {

        const id = idIndicador;
        console.log('Indicador actualizado: ', id);
        return this._indicadorRepository.update(idIndicador, {

            nombre: indicadorActualizarDto.nombre,
            descripcion: indicadorActualizarDto.descripcion,
            area: indicadorActualizarDto.area
        });
    }

    async eliminarIndicador(idIndicador: number): Promise<DeleteResult> {
        return this._indicadorRepository.delete(idIndicador);
    }

    async buscar(consulta: any): Promise<IndicadorEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._indicadorRepository.find(consulta);
    }

    async buscarPorId(idIndicador: number): Promise<IndicadorEntity> {
        return this._indicadorRepository.findOne(idIndicador, {
            relations: [
              'area',
            ]});
    }

    async buscarIndicadorPorNombre(nombre: string): Promise<IndicadorEntity> {
        return this._indicadorRepository.findOne(nombre)
    }

    async buscarIndicador(nombre?: string): Promise<IndicadorEntity> {
        return this._indicadorRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

}