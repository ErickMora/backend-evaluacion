import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class RolCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    usuario: UsuarioEntity[];

}