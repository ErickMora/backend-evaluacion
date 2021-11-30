import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { IndicadorEntity } from 'src/indicador/indicador.entity';
import { OpcionPorPreguntaEntity } from 'src/opcion-por-pregunta/opcion-por-pregunta.entity';
import { PreguntaPorCuestionarioEntity } from 'src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity';

export class PreguntaActualizarDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    indicador: IndicadorEntity;

    preguntasPorCuestionario: PreguntaPorCuestionarioEntity[];

    opcionesPorPregunta: OpcionPorPreguntaEntity[];
}