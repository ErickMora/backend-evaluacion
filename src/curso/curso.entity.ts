import { CuestionarioPorUsuarioEntity } from "src/cuestionario-por-usuario/cuestionario-por-usuario.entity";
import { CursoPorEstudianteEntity } from "src/curso-por-estudiante/curso-por-estudiante.entity";
import { MateriaEntity } from "src/materia/materia.entity";
import { PeriodoEntity } from "src/periodo/periodo.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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

    @ManyToOne(
        type => PeriodoEntity, 
        periodo => periodo.cursos, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idPeriodo' 
        }
    )
    periodo: PeriodoEntity;

    @OneToMany(
        type => CursoPorEstudianteEntity,
        cursoPorEstudiante => cursoPorEstudiante.curso,
      )
      cursosPorEstudiante: CursoPorEstudianteEntity[];

    @OneToMany(
        type => CuestionarioPorUsuarioEntity,
        cuestionarioPorUsuario => cuestionarioPorUsuario.curso,
      )
      cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];
}