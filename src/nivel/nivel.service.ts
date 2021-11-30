import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { NivelActualizarDto } from './dto/nivel-actualizar.dto';
import { NivelCrearDto } from './dto/nivel-crear.dto';
import { NivelEntity } from './nivel.entity';

@Injectable()
export class NivelService {

    constructor(
        @InjectRepository(NivelEntity)
        private readonly _nivelRepository:
            Repository<NivelEntity>
    ) {
    }

    async listarNiveles(): Promise<NivelEntity[]> {
        return await this._nivelRepository.find();

    }

    
    async crearNivel(nivelCrearDto: NivelCrearDto): Promise<NivelEntity> {
       
            const nuevoNivel = new NivelEntity();
            nuevoNivel.numNivel = nivelCrearDto.numNivel;
            
            try {
                await this._nivelRepository.save(this._nivelRepository.create(nuevoNivel));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoNivel;
        }

    async actualizarNivel(idNivel: number, nivelActualizarDto: NivelActualizarDto): Promise<UpdateResult> {

        const id = idNivel;
        console.log('Nivel actualizado: ', id);
        return await this._nivelRepository.update(idNivel, {

            numNivel: nivelActualizarDto.numNivel
        });
    }

    async eliminarNivel(idNivel: number): Promise<DeleteResult> {
        return await this._nivelRepository.delete(idNivel);
    }

    async buscar(consulta: any): Promise<NivelEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._nivelRepository.find(consulta);
    }

    async buscarPorId(idNivel: number): Promise<NivelEntity> {
        return await this._nivelRepository.findOne(idNivel, {
            relations: [
              'materias',
              'estudiantes'
            ]});
    }

    async buscarNivelPorNumero(numNivel: string): Promise<NivelEntity> {
        return await this._nivelRepository.findOne(numNivel)
    }

    async buscarNivel(numNivel?: string): Promise<NivelEntity> {
        return await this._nivelRepository.findOne({where: {numNivel: Like(`%${numNivel}%`)}});
    }

}