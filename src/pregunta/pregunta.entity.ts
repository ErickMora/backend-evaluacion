import { IndicadorEntity } from "src/indicador/indicador.entity";
import { OpcionPorPreguntaEntity } from "src/opcion-por-pregunta/opcion-por-pregunta.entity";
import { PreguntaPorCuestionarioEntity } from "src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pregunta')
export class PreguntaEntity {

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
            type: 'varchar'
        }
    )
    nombre: string;

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

    @OneToMany(
        type => PreguntaPorCuestionarioEntity,
        preguntaPorCuestionario => preguntaPorCuestionario.pregunta,
      )
      preguntasPorCuestionario: PreguntaPorCuestionarioEntity[];

    @OneToMany(
        type => OpcionPorPreguntaEntity,
        opcionPorPregunta => opcionPorPregunta.pregunta,
      )
      opcionesPorPregunta: OpcionPorPreguntaEntity[];
}