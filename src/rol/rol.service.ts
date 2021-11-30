import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { RolActualizarDto } from './dto/rol-actualizar.dto';
import { RolCrearDto } from './dto/rol-crear.dto';
import { RolEntity } from './rol.entity';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository:
            Repository<RolEntity>
    ) {
    }

    async listarRoles(): Promise<RolEntity[]> {
        return await this._rolRepository.find();

    }

    
    async crearRol(rolCrearDto: RolCrearDto): Promise<RolEntity> {
        //const { nombre} = rolCrearDto;
    
            const nuevoRol = new RolEntity();
            nuevoRol.nombre = rolCrearDto.nombre;
    
            try {
                await this._rolRepository.save(this._rolRepository.create(nuevoRol));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoRol;
        }

    async actualizarRol(idRol: number, rolActualizarDto: RolActualizarDto): Promise<UpdateResult> {

        const id = idRol;
        console.log('Rol actualizado: ', id);
        return await this._rolRepository.update(idRol, {
            nombre: rolActualizarDto.nombre,
        });
    }

    async eliminarRol(idRol: number): Promise<DeleteResult> {
        return await this._rolRepository.delete(idRol);
    }

    async buscar(consulta: any): Promise<RolEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._rolRepository.find(consulta);
    }

    async buscarPorId(idRol: number): Promise<RolEntity> {
        return await this._rolRepository.findOne(idRol, {
            relations: [
              'usuarios'
            ]});
    }

    async buscarRolPorNombre(nombre: string): Promise<RolEntity> {
        return await this._rolRepository.findOne(nombre)
    }

    async buscarRol(nombre?: string): Promise<RolEntity> {
        return await this._rolRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

}