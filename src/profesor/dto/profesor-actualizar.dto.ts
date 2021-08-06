import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';
import { CursoEntity } from 'src/curso/curso.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class ProfesorActualizarDto {

    @IsNotEmpty()
    @IsString()
    titulo: string;
    
    @IsOptional()
    cursos: CursoEntity[];

    usuario: UsuarioEntity;
}