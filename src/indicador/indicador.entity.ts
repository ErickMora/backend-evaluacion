import { AreaEntity } from "src/area/area.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('indicador')
export class IndicadorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'codigo',
            type: 'varchar',
            unique: true
        }
    )
    codigo: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            unique: true
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

    @OneToMany(
        type => PreguntaEntity, 
        pregunta => pregunta.indicador
    )
    preguntas: PreguntaEntity[];

    @ManyToOne(
        type => AreaEntity, 
        area => area.indicadores, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idArea' 
        }
    )
    area: AreaEntity;

}