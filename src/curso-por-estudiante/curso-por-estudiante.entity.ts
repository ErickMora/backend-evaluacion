import { CursoEntity } from "src/curso/curso.entity";
import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('curso-por-estudiante')
export class CursoPorEstudianteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => CursoEntity, 
        curso => curso.cursosPorEstudiante, 
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

    @ManyToOne(
        type => EstudianteEntity, 
        estudiante => estudiante.cursosPorEstudiante, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idEstudiante' 
        }
    )
    estudiante: EstudianteEntity;

}