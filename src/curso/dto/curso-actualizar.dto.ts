import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { CursoPorEstudianteEntity } from 'src/curso-por-estudiante/curso-por-estudiante.entity';
import { MateriaEntity } from 'src/materia/materia.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

export class CursoActualizarDto {

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

    cursosPorEstudiante: CursoPorEstudianteEntity[];
}