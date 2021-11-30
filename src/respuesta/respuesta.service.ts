import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { RespuestaActualizarDto } from './dto/respuesta-actualizar.dto';
import { RespuestaCrearDto } from './dto/respuesta-crear.dto';
import { RespuestaEntity } from './respuesta.entity';

@Injectable()
export class RespuestaService {

    constructor(
        @InjectRepository(RespuestaEntity)
        private readonly _respuestaRepository:
            Repository<RespuestaEntity>
    ) {
    }

    async listarRespuestas(): Promise<RespuestaEntity[]> {
        return await this._respuestaRepository.find();

    }

    
    async crearRespuesta(respuestaCrearDto: RespuestaCrearDto): Promise<RespuestaEntity> {
       
        const nuevoRespuesta = new RespuestaEntity();
        nuevoRespuesta.preguntaPorCuestionario = respuestaCrearDto.preguntaPorCuestionario;
        nuevoRespuesta.cuestionarioPorUsuario = respuestaCrearDto.cuestionarioPorUsuario;
        nuevoRespuesta.opcionPorPregunta = respuestaCrearDto.opcionPorPregunta;
    
        try {
            await this._respuestaRepository.save(this._respuestaRepository.create(nuevoRespuesta));
        } catch (error) {
            console.error(error);
        }
        
    return nuevoRespuesta;
    }

    async crearRespuestas(respuestasCrearDto: RespuestaCrearDto[]): Promise<RespuestaEntity[]> {
       
        const nuevoRespuestas: RespuestaEntity[] = 
        this._respuestaRepository.create(respuestasCrearDto);
    
        try {
            await this._respuestaRepository.save(nuevoRespuestas);
        } catch (error) {
            console.error(error);
        }
        
    return nuevoRespuestas;
    }

    async actualizarRespuesta(idRespuesta: number, respuestaActualizarDto: RespuestaActualizarDto): Promise<UpdateResult> {

        const id = idRespuesta;
        console.log('Respuesta actualizado: ', id);
        return await this._respuestaRepository.update(idRespuesta, {
            preguntaPorCuestionario: respuestaActualizarDto.preguntaPorCuestionario,
            cuestionarioPorUsuario: respuestaActualizarDto.cuestionarioPorUsuario,
            opcionPorPregunta: respuestaActualizarDto.opcionPorPregunta
        });
    }

    async eliminarRespuesta(idRespuesta: number): Promise<DeleteResult> {
        return await this._respuestaRepository.delete(idRespuesta);
    }

    async buscar(consulta: any): Promise<RespuestaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._respuestaRepository.find(consulta);
    }

    async buscarPorId(idRespuesta: number): Promise<RespuestaEntity> {
        return await this._respuestaRepository.findOne(idRespuesta, {
            relations: [
              'preguntaPorCuestionario',
              'cuestionarioPorUsuario',
              'opcionPorPregunta',
              'preguntaPorCuestionario.pregunta',
              'preguntaPorCuestionario.cuestionario',
              'cuestionarioPorUsuario.usuario',
              'opcionPorPregunta.opcion',
            ]});
    }

}