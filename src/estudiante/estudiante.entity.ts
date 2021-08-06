import { CursoPorEstudianteEntity } from "src/curso-por-estudiante/curso-por-estudiante.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('estudiante')
export class EstudianteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'codigo',
            type: 'varchar',
            length: 15,
            unique: true
        }
    )
    codigo: string;

    @Column(
        {
            name: 'nivel',
            type: 'int'
        }
    )
    nivel: number;
    
    @OneToOne(
        type => UsuarioEntity, 
        usuario => usuario.estudiante,
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

    @OneToMany(
        type => CursoPorEstudianteEntity,
        cursoPorEstudiante => cursoPorEstudiante.estudiante,
      )
      cursosPorEstudiante: CursoPorEstudianteEntity[];

}