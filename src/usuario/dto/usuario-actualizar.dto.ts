import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';
import { CuestionarioPorUsuarioEntity } from 'src/cuestionario-por-usuario/cuestionario-por-usuario.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { RolEntity } from 'src/rol/rol.entity';

export class UsuarioActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(10,15)
    @Matches(/^[_0-9-]+$/,{
        message: "El número de cédula debe contener únicamente números"
    })
    numCedula: string;

    @IsString()
    @Matches(/^[_0-9-]+$/,{
        message: "El número de teléfono debe contener únicamente números"
    })
    telefono: string;

    @IsString()
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({},{
        message: "CORREO: formato no valido"
    })
    correo: string;

    @IsString()
    @Length(8,15)
    /*@Matches(/^[_0-9-]+$/,{
        message: "La contraseña debe contener "
    })*/
    password: string;    

    profesor: ProfesorEntity;

    estudiante: EstudianteEntity;
    
    rol: RolEntity;

    cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];
}