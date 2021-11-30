
import { CuestionarioPorUsuarioEntity } from "src/cuestionario-por-usuario/cuestionario-por-usuario.entity";
import { OpcionPorPreguntaEntity } from "src/opcion-por-pregunta/opcion-por-pregunta.entity";
import { PreguntaPorCuestionarioEntity } from "src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('respuesta')
export class RespuestaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => PreguntaPorCuestionarioEntity, 
        preguntaPorCuestionario => preguntaPorCuestionario.respuestas, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idPreguntaPorCuestionario' 
        }
    )
    preguntaPorCuestionario: PreguntaPorCuestionarioEntity;

    @ManyToOne(
        type => OpcionPorPreguntaEntity, 
        opcionPorPregunta => opcionPorPregunta.respuestas, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idOpcionPorPregunta' 
        }
    )
    opcionPorPregunta: OpcionPorPreguntaEntity;

    @ManyToOne(
        type => CuestionarioPorUsuarioEntity, 
        cuestionarioPorUsuario => cuestionarioPorUsuario.respuestas, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idCuestionarioPorUsuario' 
        }
    )
    cuestionarioPorUsuario: CuestionarioPorUsuarioEntity;

}