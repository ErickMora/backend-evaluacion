import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches} from 'class-validator';
import { IndicadorEntity } from 'src/indicador/indicador.entity';

export class AreaActualizarDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsOptional()
    indicadores: IndicadorEntity[];
    
}