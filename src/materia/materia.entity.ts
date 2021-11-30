import { CategoriaEntity } from "src/categoria/categoria.entity";
import { CursoEntity } from "src/curso/curso.entity";
import { NivelEntity } from "src/nivel/nivel.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('materia')
export class MateriaEntity {

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
            name: 'nombre',
            type: 'varchar',
            length: 100
        }
    )
    nombre: string;

    @Column(
        {
            name: 'numHoras',
            type: 'int'
        }
    )
    numHoras: number;

    @OneToMany(
        type => CursoEntity, 
        curso => curso.materia
    )
    cursos: CursoEntity[];

    @ManyToOne(
        type => CategoriaEntity, 
        categoria => categoria.materias, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idCategoria' 
        }
    )
    categoria: CategoriaEntity;

    @ManyToOne(
        type => NivelEntity, 
        nivel => nivel.materias, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idNivel' 
        }
    )
    nivel: NivelEntity;
}