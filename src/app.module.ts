import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { CategoriaModule } from './categoria/categoria.module';
import { configTypeOrm } from './config/config.typeorm';
import { CuestionarioPorUsuarioModule } from './cuestionario-por-usuario/cuestionario-por-usuario.module';
import { CuestionarioModule } from './cuestionario/cuestionario.module';
import { CursoPorEstudianteModule } from './curso-por-estudiante/curso-por-estudiante.module';
import { CursoModule } from './curso/curso.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { IndicadorModule } from './indicador/indicador.module';
import { MateriaModule } from './materia/materia.module';
import { NivelModule } from './nivel/nivel.module';
import { OpcionPorPreguntaModule } from './opcion-por-pregunta/opcion-por-pregunta.module';
import { OpcionModule } from './opcion/opcion.module';
import { PeriodoModule } from './periodo/periodo.module';
import { PreguntaPorCuestionarioModule } from './pregunta-por-cuestinario/pregunta-por-cuestionario.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    AreaModule,
    CursoModule,
    EstudianteModule,
    IndicadorModule,
    MateriaModule,
    PreguntaModule,
    ProfesorModule,
    CursoPorEstudianteModule,
    UsuarioModule,
    RolModule,
    CategoriaModule,
    CuestionarioModule,
    CursoPorEstudianteModule,
    PreguntaPorCuestionarioModule,
    NivelModule,
    OpcionModule,
    OpcionPorPreguntaModule,
    CuestionarioPorUsuarioModule,
    RespuestaModule,
    PeriodoModule,
    TypeOrmModule.forRoot(
      configTypeOrm
      
    ),
    AutenticacionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
