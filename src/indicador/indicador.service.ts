import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { AreaEntity } from 'src/area/area.entity';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { IndicadorActualizarDto } from './dto/indicador-actualizar.dto';
import { IndicadorCrearDto } from './dto/indicador-crear.dto';
import { IndicadorEntity } from './indicador.entity';

@Injectable()
export class IndicadorService {

    constructor(
        @InjectRepository(IndicadorEntity)
        private readonly _indicadorRepository:
            Repository<IndicadorEntity>,

        @InjectRepository(AreaEntity)
        private readonly _areaRepository:
            Repository<AreaEntity>
    ) {
    }

    async listarIndicadores(): Promise<IndicadorEntity[]> {
        return await this._indicadorRepository.find();

    }

    
    async crearIndicador(indicadorCrearDto: IndicadorCrearDto): Promise<IndicadorEntity> {
       
            const nuevoIndicador = new IndicadorEntity();
            nuevoIndicador.codigo = indicadorCrearDto.codigo;
            nuevoIndicador.nombre = indicadorCrearDto.nombre;
            nuevoIndicador.descripcion = indicadorCrearDto.descripcion;
            nuevoIndicador.area = indicadorCrearDto.area;
            nuevoIndicador.codigo = await this.setCodigoIndicador(indicadorCrearDto.area);
            
            console.log('nuevoIndicador.area: ', nuevoIndicador.area);
            console.log('indicadorCrearDto.area: ', indicadorCrearDto.area);
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
        return await this._indicadorRepository.update(idIndicador, {
            codigo: indicadorActualizarDto.codigo,
            nombre: indicadorActualizarDto.nombre,
            descripcion: indicadorActualizarDto.descripcion,
            area: indicadorActualizarDto.area
        });
    }

    async eliminarIndicador(idIndicador: number): Promise<DeleteResult> {
        return await this._indicadorRepository.delete(idIndicador);
    }

    async buscar(consulta: any): Promise<IndicadorEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._indicadorRepository.find(consulta);
    }

    async buscarPorId(idIndicador: number): Promise<IndicadorEntity> {
        return await this._indicadorRepository.findOne(idIndicador, {
            relations: [
              'area',
              'preguntas'
            ]});
    }

    async buscarAreaPorId(idArea: number): Promise<AreaEntity> {
        return await this._areaRepository.findOne(idArea);
    }

    async buscarIndicadorPorNombre(nombre: string): Promise<IndicadorEntity> {
        return await this._indicadorRepository.findOne(nombre)
    }

    async buscarIndicador(nombre?: string): Promise<IndicadorEntity> {
        return await this._indicadorRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

    async buscarUltimo(idArea: number): Promise<IndicadorEntity[]> {
        return await this._indicadorRepository.find({
          order: {
            id: 'DESC'
          },
          where: { 
            area: `${idArea}`
        }
        });
      }
    
    async setCodigoIndicador(idArea) {
        const indicadores = await this.buscarUltimo(idArea);
        const area = await this.buscarAreaPorId(idArea);
        const ultimoIndicador = indicadores[0];
        console.log(area);
        console.log(indicadores);
        console.log(ultimoIndicador);
        
        if (ultimoIndicador) {
            const codigos = ultimoIndicador.codigo.split(".", 2); 
            const numeroCodigoIncremento = Number(codigos[1].replace('I',''))+1;
            let codigoIncremento = codigos[1].substr(0,1);
            codigoIncremento = codigos[0] + '.' + codigoIncremento + numeroCodigoIncremento.toString() + '.';
            console.log(codigoIncremento);
            return codigoIncremento.toString();
          } else {
            return area.codigo + 'I1.';
        }
    }

}