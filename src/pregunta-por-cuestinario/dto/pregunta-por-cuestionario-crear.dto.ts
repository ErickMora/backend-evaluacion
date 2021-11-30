import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";

export class PreguntaPorCuestionarioCrearDto {

    pregunta: PreguntaEntity;

    cuestionario: CuestionarioEntity;
}