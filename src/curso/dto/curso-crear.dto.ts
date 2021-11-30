import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { CuestionarioPorUsuarioEntity } from 'src/cuestionario-por-usuario/cuestionario-por-usuario.entity';
import { CursoPorEstudianteEntity } from 'src/curso-por-estudiante/curso-por-estudiante.entity';
import { MateriaEntity } from 'src/materia/materia.entity';
import { PeriodoEntity } from 'src/periodo/periodo.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';

export class CursoCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    periodo: PeriodoEntity;
    
    materia: MateriaEntity;

    profesor: ProfesorEntity;

    cursosPorEstudiante: CursoPorEstudianteEntity[];

    cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];
}