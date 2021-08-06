import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { CategoriaModule } from './categoria/categoria.module';
import { configTypeOrm } from './config/config.typeorm';
import { CuestionarioModule } from './cuestionario/cuestionario.module';
import { CursoPorEstudianteModule } from './curso-por-estudiante/curso-por-estudiante.module';
import { CursoModule } from './curso/curso.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { IndicadorModule } from './indicador/indicador.module';
import { MateriaModule } from './materia/materia.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { ProfesorModule } from './profesor/profesor.module';
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
    TypeOrmModule.forRoot(
      configTypeOrm
      
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
