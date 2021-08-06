
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('cuestionario')
export class CuestionarioEntity {

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
            length: 100,
        }
    )
    titulo: string;

    @Column(
        {
            name: 'tipo',
            type: 'varchar',
            length: 30,
        }
    )
    tipo: string;

    @Column(
        {
            name: 'fecha',
            type: 'date'
        }
    )
    fecha: string;

    @Column(
        {
            name: 'estado',
            type: 'tinyint',
            default: 1
        }
    )
    estado: number;
/*
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

    @OneToMany(
        type => CursoPorEstudianteEntity,
        cursoPorEstudiante => cursoPorEstudiante.curso,
      )
      cursosPorEstudiante: CursoPorEstudianteEntity[];
      */
}