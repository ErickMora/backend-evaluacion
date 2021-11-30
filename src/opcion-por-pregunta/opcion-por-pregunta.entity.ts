import { OpcionEntity } from "src/opcion/opcion.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";
import { RespuestaEntity } from "src/respuesta/respuesta.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('opcion-por-pregunta')
export class OpcionPorPreguntaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => PreguntaEntity, 
        pregunta => pregunta.opcionesPorPregunta, 
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
        type => OpcionEntity, 
        opcion => opcion.opcionesPorPregunta, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idOpcion' 
        }
    )
    opcion: OpcionEntity;

    @OneToMany(
        type => RespuestaEntity,
        respuesta => respuesta.opcionPorPregunta,
      )
      respuestas: RespuestaEntity[];
}