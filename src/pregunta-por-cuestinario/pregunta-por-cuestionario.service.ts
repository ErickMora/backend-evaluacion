import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { PreguntaPorCuestionarioActualizarDto } from './dto/pregunta-por-cuestionario-actualizar.dto';
import { PreguntaPorCuestionarioCrearDto } from './dto/pregunta-por-cuestionario-crear.dto';
import { PreguntaPorCuestionarioEntity } from './pregunta-por-cuestionario.entity';

@Injectable()
export class PreguntaPorCuestionarioService {

    constructor(
        @InjectRepository(PreguntaPorCuestionarioEntity)
        private readonly _preguntaPorCuestionarioRepository:
            Repository<PreguntaPorCuestionarioEntity>
    ) {
    }

    async listarPreguntasPorCuestionario(): Promise<PreguntaPorCuestionarioEntity[]> {
        return await this._preguntaPorCuestionarioRepository.find();

    }

    
    async crearPreguntaPorCuestionario(preguntaPorCuestionarioCrearDto: PreguntaPorCuestionarioCrearDto): Promise<PreguntaPorCuestionarioEntity> {
       
        const nuevoPreguntaPorCuestionario = new PreguntaPorCuestionarioEntity();
        nuevoPreguntaPorCuestionario.pregunta = preguntaPorCuestionarioCrearDto.pregunta;
        nuevoPreguntaPorCuestionario.cuestionario = preguntaPorCuestionarioCrearDto.cuestionario;
    
        try {
            await this._preguntaPorCuestionarioRepository.save(this._preguntaPorCuestionarioRepository.create(nuevoPreguntaPorCuestionario));
        } catch (error) {
            console.error(error);
        }
        
    return nuevoPreguntaPorCuestionario;
    }

    async crearPreguntasPorCuestionario(preguntasPorCuestionarioCrearDto: PreguntaPorCuestionarioCrearDto[]): Promise<PreguntaPorCuestionarioEntity[]> {
       
        const nuevoPreguntasPorCuestionario: PreguntaPorCuestionarioEntity[] = 
        this._preguntaPorCuestionarioRepository.create(preguntasPorCuestionarioCrearDto);
    
        try {
            await this._preguntaPorCuestionarioRepository.save(nuevoPreguntasPorCuestionario);
        } catch (error) {
            console.error(error);
        }
        
    return nuevoPreguntasPorCuestionario;
    }

    async actualizarPreguntaPorCuestionario(idPreguntaPorCuestionario: number, preguntaPorCuestionarioActualizarDto: PreguntaPorCuestionarioActualizarDto): Promise<UpdateResult> {

        const id = idPreguntaPorCuestionario;
        console.log('Pregunta por Cuestionario actualizado: ', id);
        return await this._preguntaPorCuestionarioRepository.update(idPreguntaPorCuestionario, {
            pregunta: preguntaPorCuestionarioActualizarDto.pregunta,
            cuestionario: preguntaPorCuestionarioActualizarDto.cuestionario
        });
    }

    async eliminarPreguntaPorCuestionario(idPreguntaPorCuestionario: number): Promise<DeleteResult> {
        return await this._preguntaPorCuestionarioRepository.delete(idPreguntaPorCuestionario);
    }

    async buscar(consulta: any): Promise<PreguntaPorCuestionarioEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._preguntaPorCuestionarioRepository.find(consulta);
    }

    async buscarPorId(idPreguntaPorCuestionario: number): Promise<PreguntaPorCuestionarioEntity> {
        return await this._preguntaPorCuestionarioRepository.findOne(idPreguntaPorCuestionario, {
            relations: [
              'pregunta',
              'cuestionario',
              'pregunta.indicador',
              'pregunta.indicador.area'
            ]});
    }

}