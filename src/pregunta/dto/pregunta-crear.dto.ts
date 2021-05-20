import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { IndicadorEntity } from 'src/indicador/indicador.entity';

export class PreguntaCrearDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    texto: string;
    
    indicador: IndicadorEntity;
}