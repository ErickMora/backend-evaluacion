import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { MateriaEntity } from 'src/materia/materia.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

export class CursoCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    capacidad: number;

    @IsNumberString()
    periodo: string;

    materia: MateriaEntity;

    profesor: ProfesorEntity;
}