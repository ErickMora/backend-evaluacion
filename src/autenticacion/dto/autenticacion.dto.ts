import {IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches} from 'class-validator';

export class AutenticacionDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail({},{
        message: "CORREO: formato no valido"
    })
    correo: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    /*@Matches(/^[_0-9-]+$/,{
        message: "La contraseña debe contener "
    })*/
    password: string;    

    //rol: RolEntity;

}