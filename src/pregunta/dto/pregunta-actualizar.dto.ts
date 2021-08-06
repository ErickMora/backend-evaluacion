import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { IndicadorEntity } from 'src/indicador/indicador.entity';

export class PreguntaActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;
    
    indicador: IndicadorEntity;
}