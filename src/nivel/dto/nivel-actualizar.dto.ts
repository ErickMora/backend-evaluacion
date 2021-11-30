import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { MateriaEntity } from 'src/materia/materia.entity';

export class NivelActualizarDto {

    @IsNotEmpty()
    @IsNumber()
    numNivel: number;

    materias: MateriaEntity[];

    estudiantes: EstudianteEntity[];
}