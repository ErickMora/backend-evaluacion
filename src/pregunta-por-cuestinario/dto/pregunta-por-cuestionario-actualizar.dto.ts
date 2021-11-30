import { CuestionarioEntity } from "src/cuestionario/cuestionario.entity";
import { PreguntaEntity } from "src/pregunta/pregunta.entity";

export class PreguntaPorCuestionarioActualizarDto {

    pregunta: PreguntaEntity;

    cuestionario: CuestionarioEntity;
}