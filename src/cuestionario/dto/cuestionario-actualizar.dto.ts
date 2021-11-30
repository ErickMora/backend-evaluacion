import {IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { CuestionarioPorUsuarioEntity } from 'src/cuestionario-por-usuario/cuestionario-por-usuario.entity';
import { PeriodoEntity } from 'src/periodo/periodo.entity';
import { PreguntaPorCuestionarioEntity } from 'src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity';

export class CuestionarioActualizarDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsString()
    informacion: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsString()
    fecha: string;

    @IsEnum([0, 1])
    estado: number;

    periodo: PeriodoEntity;

    preguntasPorCuestionario: PreguntaPorCuestionarioEntity[];

    cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];
}