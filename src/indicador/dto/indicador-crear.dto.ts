import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { AreaEntity } from 'src/area/area.entity';

export class IndicadorCrearDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;
    
    area: AreaEntity;
}