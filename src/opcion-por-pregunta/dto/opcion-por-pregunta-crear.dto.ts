import { OpcionEntity } from "src/opcion/opcion.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";

export class OpcionPorPreguntaCrearDto {

    pregunta: PreguntaEntity;

    opcion: OpcionEntity;
}