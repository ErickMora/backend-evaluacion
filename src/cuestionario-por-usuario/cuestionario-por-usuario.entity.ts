
import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { CursoEntity } from "src/curso/curso.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import { RespuestaEntity } from "src/respuesta/respuesta.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('cuestionario-por-usuario')
export class CuestionarioPorUsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'estado',
            type: 'tinyint',
            default: 0
        }
    )
    estado: number;

    @Column(
        {
            name: 'calificacion',
            type: 'decimal',
            precision: 15,
            scale: 2
        }
    )
    calificacion: number;

    @Column(
        {
            name: 'comentario',
            type: 'varchar'
        }
    )
    comentario: string;

    @ManyToOne(
        type => ProfesorEntity, 
        profesor => profesor.cuestionariosPorUsuario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idProfesor' 
        }
    )
    profesor: ProfesorEntity;

    @ManyToOne(
        type => UsuarioEntity, 
        usuario => usuario.cuestionariosPorUsuario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idUsuario' 
        }
    )
    usuario: UsuarioEntity;

    @ManyToOne(
        type => CuestionarioEntity, 
        cuestionario => cuestionario.cuestionariosPorUsuario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idCuestionario' 
        }
    )
    cuestionario: CuestionarioEntity;

    @ManyToOne(
        type => CursoEntity, 
        curso => curso.cuestionariosPorUsuario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idCurso' 
        }
    )
    curso: CursoEntity;

    @OneToMany(
        type => RespuestaEntity,
        respuesta => respuesta.cuestionarioPorUsuario,
      )
      respuestas: RespuestaEntity[];

}