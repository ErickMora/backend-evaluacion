import { IndicadorEntity } from "src/indicador/indicador.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pregunta')
export class PreguntaEntity {

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
            name: 'descripcion',
            type: 'varchar'
        }
    )
    descripcion: string;

    @ManyToOne(
        type => IndicadorEntity, 
        indicador => indicador.preguntas, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idIndicador' 
        }
    )
    indicador: IndicadorEntity;

}