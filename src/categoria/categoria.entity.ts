
import { MateriaEntity } from "src/materia/materia.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('categoria')
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 30
        }
    )
    nombre: string;

    @OneToMany(
        type => MateriaEntity, 
        materia => materia.categoria
    )
    materias: MateriaEntity[];

}