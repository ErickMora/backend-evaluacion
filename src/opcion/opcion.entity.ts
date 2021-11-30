
import { OpcionPorPreguntaEntity } from "src/opcion-por-pregunta/opcion-por-pregunta.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('opcion')
export class OpcionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar'
        }
    )
    nombre: string;

    @Column(
        {
            name: 'valor',
            type: 'int'
        }
    )
    valor: number;

    @OneToMany(
        type => OpcionPorPreguntaEntity, 
        opcionPorPregunta => opcionPorPregunta.opcion
    )
    opcionesPorPregunta: OpcionPorPreguntaEntity[];

}