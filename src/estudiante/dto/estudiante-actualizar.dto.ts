import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from 'class-validator';

export class EstudianteActualizarDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

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

    @IsNotEmpty()
    @IsString()
    @IsEmail({},{
        message: "CORREO: formato no valido"
    })
    correo: string;

    @IsString()
    direccion: string;



}