import { CursoEntity } from 'src/curso/curso.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

export class CursoPorEstudianteCrearDto {

    curso: CursoEntity;

    estudiante: EstudianteEntity;
}