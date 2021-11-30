import { CuestionarioPorUsuarioEntity } from "src/cuestionario-por-usuario/cuestionario-por-usuario.entity";
import { OpcionPorPreguntaEntity } from "src/opcion-por-pregunta/opcion-por-pregunta.entity";
import { PreguntaPorCuestionarioEntity } from "src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity";

export class RespuestaActualizarDto {

    preguntaPorCuestionario: PreguntaPorCuestionarioEntity;

    opcionPorPregunta: OpcionPorPreguntaEntity;

    cuestionarioPorUsuario: CuestionarioPorUsuarioEntity;
}