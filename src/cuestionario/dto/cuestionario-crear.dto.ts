import {IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';

export class CuestionarioCrearDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsString()
    fecha: string;

    @IsEnum([0, 1])
    estado: number;

    //materia: MateriaEntity;

    //cursosPorEstudiante: CursoPorEstudianteEntity[];
}