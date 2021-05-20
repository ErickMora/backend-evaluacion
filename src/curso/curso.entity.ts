import { MateriaEntity } from "src/materia/materia.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('curso')
export class CursoEntity {

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
            name: 'capacidad',
            type: 'int'
        }
    )
    capacidad: number;

    @Column(
        {
            name: 'periodo',
            type: 'varchar',
            length: 30
        }
    )
    periodo: string;

    @ManyToOne(
        type => MateriaEntity, 
        materia => materia.cursos, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idMateria' 
        }
    )
    materia: MateriaEntity;

    @ManyToOne(
        type => ProfesorEntity, 
        profesor => profesor.cursos, 
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

}