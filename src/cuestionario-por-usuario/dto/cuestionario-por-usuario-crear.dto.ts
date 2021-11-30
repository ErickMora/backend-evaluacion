import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { CursoEntity } from "src/curso/curso.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import { RespuestaEntity } from "src/respuesta/respuesta.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class CuestionarioPorUsuarioCrearDto {
    //0: sin contestar, 1: contestada, 2: no disponible? 
    @IsEnum([0, 1])
    estado: number;

    @IsNumber()
    @IsOptional()
    calificacion: number;

    @IsString()
    comentario: string;

    profesor: ProfesorEntity;

    usuario: UsuarioEntity;

    cuestionario: CuestionarioEntity;

    curso: CursoEntity;

    respuestas: RespuestaEntity[];
}