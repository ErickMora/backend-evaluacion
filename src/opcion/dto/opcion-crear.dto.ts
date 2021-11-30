import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { OpcionPorPreguntaEntity } from 'src/opcion-por-pregunta/opcion-por-pregunta.entity';

export class OpcionCrearDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumber()
    valor: number;

    @IsOptional()
    opcionesPorPregunta: OpcionPorPreguntaEntity[];
}