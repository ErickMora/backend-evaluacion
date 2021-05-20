import { CursoEntity } from "src/curso/curso.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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
            length: 30,
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

}