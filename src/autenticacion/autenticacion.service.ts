import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { AutenticacionDto } from './dto/autenticacion.dto';
import * as crypto from 'crypto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AutenticacionService {

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
    }
    
    async autenticarUsuario(
        usuarioAAutenticar: AutenticacionDto,
      ): Promise<UsuarioEntity> {
        const usuarioEncontrado = await this._usuarioService.buscarUsuarioPorCorreo(
          usuarioAAutenticar.correo
        );
        console.log('usuarioAAutenticar: ', usuarioAAutenticar);
        console.log('usuarioEncontrado: ', usuarioEncontrado);
        if (usuarioEncontrado) {
          /*const passHash = crypto
            .createHmac('sha256', usuarioAAutenticar.password)
            .digest('hex');
          if (passHash === usuarioEncontrado.password) {*/
            return usuarioEncontrado;
          } else {
            return null;
          }
        }
      //}

}