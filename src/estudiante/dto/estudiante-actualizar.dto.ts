import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches} from 'class-validator';
import { CursoPorEstudianteEntity } from 'src/curso-por-estudiante/curso-por-estudiante.entity';
import { NivelEntity } from 'src/nivel/nivel.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class EstudianteActualizarDto {

    @IsNotEmpty()
    @IsNumberString()
    codigo: string;

    cursosPorEstudiante: CursoPorEstudianteEntity[];

    usuario: UsuarioEntity;

    nivel: NivelEntity;
}