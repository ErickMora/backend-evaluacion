import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class RolActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    usuario: UsuarioEntity[];

}