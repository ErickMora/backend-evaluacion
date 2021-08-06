import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { MateriaEntity } from 'src/materia/materia.entity';

export class CategoriaCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    materias: MateriaEntity[];
}