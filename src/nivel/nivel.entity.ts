import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { MateriaEntity } from "src/materia/materia.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('nivel')
export class NivelEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'numNivel',
            type: 'int',
            unique: true
        }
    )
    numNivel: number;

    @OneToMany(
        type => MateriaEntity, 
        materia => materia.nivel
    )
    materias: MateriaEntity[];

    @OneToMany(
        type => EstudianteEntity, 
        estudiante => estudiante.nivel
    )
    estudiantes: EstudianteEntity[];

}