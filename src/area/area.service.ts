import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { AreaEntity } from './area.entity';
import { AreaActualizarDto } from './dto/area-actualizar.dto';
import { AreaCrearDto } from './dto/area-crear.dto';

@Injectable()
export class AreaService {

    constructor(
        @InjectRepository(AreaEntity)
        private readonly _areaRepository:
            Repository<AreaEntity>
    ) {
    }

    async listarAreas(): Promise<AreaEntity[]> {
        return await this._areaRepository.find();

    }

    
    async crearArea(areaCrearDto: AreaCrearDto): Promise<AreaEntity> {
        const nuevoArea = new AreaEntity();
        nuevoArea.codigo = areaCrearDto.codigo;
        nuevoArea.nombre = areaCrearDto.nombre;
        nuevoArea.descripcion = areaCrearDto.descripcion;
        nuevoArea.codigo = await this.setCodigoArea();

        try {
            await this._areaRepository.save(this._areaRepository.create(nuevoArea));
        } catch (error) {
            console.error(error);
        }

        return nuevoArea;
    }

    async actualizarArea(idArea: number, areaActualizarDto: AreaActualizarDto): Promise<UpdateResult> {

        const id = idArea;
        console.log('Area actualizado: ', id);
        return await this._areaRepository.update(idArea, {
            codigo: areaActualizarDto.codigo,
            nombre: areaActualizarDto.nombre,
            descripcion: areaActualizarDto.descripcion
        });
    }

    async eliminarArea(idArea: number): Promise<DeleteResult> {
        return await this._areaRepository.delete(idArea);
    }

    /*async buscar(parametrosBusqueda?: any): Promise<AreaEntity[]> { 
        return this._areaRepository.find(parametrosBusqueda);
    }*/

    /*async buscarArea(nombre: string): Promise<AreaEntity[]> {
        return this._areaRepository.(
            (area)=>{
                return area.nombre.includes(nombre);
            }
        );
    }*/

    async buscarPorId(idArea: number): Promise<AreaEntity> {
        return await this._areaRepository.findOne(idArea, {
            relations: [
              'indicadores',
              'indicadores.preguntas'
            ]});
    }

    async buscarAreaPorNombre(nombre: string): Promise<AreaEntity> {
        return await this._areaRepository.findOne(nombre)
    }
/*
    async buscarArea(nombre?: string): Promise<AreaEntity> {
        return this._areaRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }*/
    async buscar(consulta: any): Promise<AreaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._areaRepository.find(consulta);
    }
    
    async buscarUltimo(): Promise<AreaEntity[]> {
        return await this._areaRepository.find({
          order: {
            id: 'DESC'
          }
        });
      }
    
    async setCodigoArea() {
        const areas = await this.buscarUltimo();
        const ultimaArea = areas[0];        
        
        if (ultimaArea) {
            const codigos = ultimaArea.codigo.split(".", 1); 
            const numeroCodigoIncremento = Number(codigos[0].replace('A',''))+1;
            let codigoIncremento = codigos[0].substr(0,1);
            codigoIncremento = codigoIncremento + numeroCodigoIncremento.toString() + '.';
            console.log(codigoIncremento);
            return codigoIncremento.toString();
          } else {
            return 'A1.';
        }
    }

}