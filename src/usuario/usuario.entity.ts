
import { CuestionarioPorUsuarioEntity } from "src/cuestionario-por-usuario/cuestionario-por-usuario.entity";
import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import { RolEntity } from "src/rol/rol.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'numCedula',
            type: 'varchar',
            length: 15,
        }
    )
    numCedula: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 50,
        }
    )
    nombre: string;

    @Column(
        {
            name: 'telefono',
            type: 'varchar',
            length: 20,
        }
    )
    telefono: string;

    @Column(
        {
            name: 'direccion',
            type: 'varchar',
            length: 100,
        }
    )
    direccion: string;

    @Column(
        {
            name: 'correo',
            type: 'varchar',
            length: 50,
        }
    )
    correo: string;

    @Column(
        {
            name: 'password',
            type: 'varchar',
            length: 20,
        }
    )
    password: string;

    @OneToOne(
        type => ProfesorEntity, 
        profesor => profesor.usuario
    )
    profesor: ProfesorEntity;

    @OneToOne(
        type => EstudianteEntity, 
        estudiante => estudiante.usuario
    )
    estudiante: EstudianteEntity;

    @ManyToOne(
        type => RolEntity, 
        rol => rol.usuarios,
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idRol' 
        }
    )
    rol: RolEntity;
  
    @OneToMany(
        type => CuestionarioPorUsuarioEntity,
        cuestionarioPorUsuario => cuestionarioPorUsuario.usuario,
      )
      cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];

}