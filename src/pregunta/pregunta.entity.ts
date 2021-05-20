import { IndicadorEntity } from "src/indicador/indicador.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pregunta')
export class PreguntaEntity {

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
            name: 'texto',
            type: 'varchar'
        }
    )
    texto: string;

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