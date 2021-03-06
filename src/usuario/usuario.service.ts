import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { UsuarioActualizarDto } from './dto/usuario-actualizar.dto';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ) {
    }

    async listarUsuarios(): Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find();

    }

    
    async crearUsuario(usuarioCrearDto: UsuarioCrearDto): Promise<UsuarioEntity> {
        //const { nombre, numCedula, telefono, direccion, correo } = usuarioCrearDto;
    
            const nuevoUsuario = new UsuarioEntity();
            nuevoUsuario.nombre = usuarioCrearDto.nombre;
            nuevoUsuario.numCedula = usuarioCrearDto.numCedula;
            nuevoUsuario.telefono = usuarioCrearDto.telefono;
            nuevoUsuario.direccion = usuarioCrearDto.direccion;
            nuevoUsuario.correo = usuarioCrearDto.correo;
            nuevoUsuario.password = usuarioCrearDto.password;
    
            try {
                await this._usuarioRepository.save(this._usuarioRepository.create(nuevoUsuario));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoUsuario;
        }

    async actualizarUsuario(idUsuario: number, usuarioActualizarDto: UsuarioActualizarDto): Promise<UpdateResult> {

        const id = idUsuario;
        console.log('Usuario actualizado: ', id);
        return this._usuarioRepository.update(idUsuario, {

            nombre: usuarioActualizarDto.nombre,
            telefono: usuarioActualizarDto.telefono,
            correo: usuarioActualizarDto.correo,
            direccion: usuarioActualizarDto.direccion,
            password: usuarioActualizarDto.password,
        });
    }

    async eliminarUsuario(idUsuario: number): Promise<DeleteResult> {
        return this._usuarioRepository.delete(idUsuario);
    }

    async buscar(consulta: any): Promise<UsuarioEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._usuarioRepository.find(consulta);
    }

    async buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario, {
            relations: [
              'profesor',              
              'estudiante',
              'rol'
            ]});
    }

    async buscarUsuarioPorCedula(numCedula: string): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(numCedula)
    }

    async buscarUsuario(numCedula?: string): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne({where: {cedula: Like(`%${numCedula}%`)}});
    }

}