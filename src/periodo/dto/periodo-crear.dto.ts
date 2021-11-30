import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { CuestionarioEntity } from 'src/cuestionario/cuestionario.entity';
import { CursoEntity } from 'src/curso/curso.entity';

export class PeriodoCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    cursos: CursoEntity[];

    cuestionarios: CuestionarioEntity[];
}