import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';
import { CuestionarioPorUsuarioEntity } from 'src/cuestionario-por-usuario/cuestionario-por-usuario.entity';
import { CursoEntity } from 'src/curso/curso.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class ProfesorCrearDto {

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    cursos: CursoEntity[];

    usuario: UsuarioEntity;

    cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];
}