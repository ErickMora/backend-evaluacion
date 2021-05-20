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
        return this._areaRepository.find();

    }

    
    async crearArea(areaCrearDto: AreaCrearDto): Promise<AreaEntity> {
       /*
            const nuevoArea = new AreaEntity();
            nuevoArea.nombre = areaCrearDto.nombre;
            nuevoArea.descripcion = areaCrearDto.descripcion;
            
            try {
                await this._areaRepository.save(this._areaRepository.create(nuevoArea));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoArea;
        */

        return await this._areaRepository.save(
            this._areaRepository.create(areaCrearDto),
          );
        }

    async actualizarArea(idArea: number, areaActualizarDto: AreaActualizarDto): Promise<UpdateResult> {

        const id = idArea;
        console.log('Area actualizado: ', id);
        return this._areaRepository.update(idArea, {

            nombre: areaActualizarDto.nombre,
            descripcion: areaActualizarDto.descripcion
        });
    }

    async eliminarArea(idArea: number): Promise<DeleteResult> {
        return this._areaRepository.delete(idArea);
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
        return this._areaRepository.findOne(idArea);
    }

    async buscarAreaPorNombre(nombre: string): Promise<AreaEntity> {
        return this._areaRepository.findOne(nombre)
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
        return this._areaRepository.find(consulta);
    }
    

}