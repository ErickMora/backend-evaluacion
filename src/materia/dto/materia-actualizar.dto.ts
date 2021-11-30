import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { CategoriaEntity } from 'src/categoria/categoria.entity';
import { CursoEntity } from 'src/curso/curso.entity';
import { NivelEntity } from 'src/nivel/nivel.entity';

export class MateriaActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    numHoras: number;

    @IsOptional()
    cursos: CursoEntity[];

    categoria: CategoriaEntity;

    nivel: NivelEntity;
}