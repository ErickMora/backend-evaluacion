
import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";
import { RespuestaEntity } from "src/respuesta/respuesta.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('pregunta-por-cuestionario')
export class PreguntaPorCuestionarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => PreguntaEntity, 
        pregunta => pregunta.preguntasPorCuestionario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idPregunta' 
        }
    )
    pregunta: PreguntaEntity;

    @ManyToOne(
        type => CuestionarioEntity, 
        cuestionario => cuestionario.preguntasPorCuestionario, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idCuestionario' 
        }
    )
    cuestionario: CuestionarioEntity;

    @OneToMany(
        type => RespuestaEntity,
        respuesta => respuesta.preguntaPorCuestionario,
      )
      respuestas: RespuestaEntity[];
}