import { CursoEntity } from "src/curso/curso.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('profesor')
export class ProfesorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'titulo',
            type: 'varchar',
            length: 50,
        }
    )
    titulo: string;
    
    @OneToOne(
        type => UsuarioEntity, 
        usuario => usuario.profesor,
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
        type => CursoEntity, 
        curso => curso.profesor
    )
    cursos: CursoEntity[];

}