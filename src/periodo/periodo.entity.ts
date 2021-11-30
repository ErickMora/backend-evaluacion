import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { CursoEntity } from "src/curso/curso.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('periodo')
export class PeriodoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            unique: true
        }
    )
    nombre: string;

    @OneToMany(
        type => CursoEntity, 
        curso => curso.periodo
    )
    cursos: CursoEntity[];

    @OneToMany(
        type => CuestionarioEntity, 
        cuestionario => cuestionario.periodo
    )
    cuestionarios: CuestionarioEntity[];

}