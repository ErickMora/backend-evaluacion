import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { AreaEntity } from 'src/area/area.entity';
import { PreguntaEntity } from 'src/pregunta/pregunta.entity';

export class IndicadorActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;
    
    area: AreaEntity;

    preguntas: PreguntaEntity[];
}