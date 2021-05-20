import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { configTypeOrm } from './config/config.typeorm';
import { CursoModule } from './curso/curso.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { IndicadorModule } from './indicador/indicador.module';
import { MateriaModule } from './materia/materia.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { ProfesorModule } from './profesor/profesor.module';

@Module({
  imports: [
    AreaModule,
    CursoModule,
    EstudianteModule,
    IndicadorModule,
    MateriaModule,
    PreguntaModule,
    ProfesorModule,
    TypeOrmModule.forRoot(
      configTypeOrm
      
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
