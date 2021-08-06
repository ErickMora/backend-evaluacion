import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { CursoPorEstudianteEntity } from 'src/curso-por-estudiante/curso-por-estudiante.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class EstudianteCrearDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    nivel: number;

    cursosPorEstudiante: CursoPorEstudianteEntity[];

    usuario: UsuarioEntity;

}