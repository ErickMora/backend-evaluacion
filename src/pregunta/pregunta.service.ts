import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { IndicadorEntity } from 'src/indicador/indicador.entity';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { PreguntaActualizarDto } from './dto/pregunta-actualizar.dto';
import { PreguntaCrearDto } from './dto/pregunta-crear.dto';
import { PreguntaEntity } from './pregunta.entity';

@Injectable()
export class PreguntaService {

    constructor(
        @InjectRepository(PreguntaEntity)
        private readonly _preguntaRepository:
            Repository<PreguntaEntity>,

        @InjectRepository(IndicadorEntity)
        private readonly _indicadorRepository:
            Repository<IndicadorEntity>
    ) {
    }

    async listarPreguntas(): Promise<PreguntaEntity[]> {
        return await this._preguntaRepository.find();

    }

    
    async crearPregunta(preguntaCrearDto: PreguntaCrearDto): Promise<PreguntaEntity> {
       
            const nuevoPregunta = new PreguntaEntity();
            nuevoPregunta.codigo = preguntaCrearDto.codigo;
            nuevoPregunta.nombre = preguntaCrearDto.nombre;
            nuevoPregunta.indicador = preguntaCrearDto.indicador;
            nuevoPregunta.codigo = await this.setCodigoPregunta(preguntaCrearDto.indicador);
            
            try {
                await this._preguntaRepository.save(this._preguntaRepository.create(nuevoPregunta));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoPregunta;
        }

    async actualizarPregunta(idPregunta: number, preguntaActualizarDto: PreguntaActualizarDto): Promise<UpdateResult> {

        const id = idPregunta;
        console.log('Pregunta actualizado: ', id);
        return await this._preguntaRepository.update(idPregunta, {
            codigo: preguntaActualizarDto.codigo,
            nombre: preguntaActualizarDto.nombre,
            indicador: preguntaActualizarDto.indicador
        });
    }

    async eliminarPregunta(idPregunta: number): Promise<DeleteResult> {
        return await this._preguntaRepository.delete(idPregunta);
    }

    async buscar(consulta: any): Promise<PreguntaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._preguntaRepository.find(consulta);
    }

    async buscarPorId(idPregunta: number): Promise<PreguntaEntity> {
        return await this._preguntaRepository.findOne(idPregunta, {
            relations: [
              'indicador',
              'indicador.area',
              'preguntasPorCuestionario',
              'preguntasPorCuestionario.pregunta',
              'preguntasPorCuestionario.cuestionario',
              'opcionesPorPregunta',
              'opcionesPorPregunta.pregunta',
              'opcionesPorPregunta.opcion'
            ]});
    }

    async buscarIndicadorPorId(idIndicador: number): Promise<IndicadorEntity> {
        return await this._indicadorRepository.findOne(idIndicador);
    }

    async buscarPreguntaPorNombre(nombre: string): Promise<PreguntaEntity> {
        return await this._preguntaRepository.findOne(nombre)
    }

    async buscarPregunta(nombre?: string): Promise<PreguntaEntity> {
        return await this._preguntaRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

    async buscarUltimo(idIndicador: number): Promise<PreguntaEntity[]> {
        return await this._preguntaRepository.find({
          order: {
            id: 'DESC'
          },
          where: { 
            indicador: `${idIndicador}`
        }
        });
      }
    
    async setCodigoPregunta(idIndicador) {
        const preguntas = await this.buscarUltimo(idIndicador);
        const indicador = await this.buscarIndicadorPorId(idIndicador);
        const ultimoPregunta = preguntas[0]; 
        console.log(preguntas);
        console.log(indicador);
        console.log(ultimoPregunta);       
        
        if (ultimoPregunta) {
            const codigos = ultimoPregunta.codigo.split(".", 3); 
            const numeroCodigoIncremento = Number(codigos[2].replace('P',''))+1;
            let codigoIncremento = codigos[2].substr(0,1);
            codigoIncremento = codigos[0] + '.' + codigos[1] + '.' + codigoIncremento + numeroCodigoIncremento.toString() + '.';
            console.log(codigoIncremento);
            return codigoIncremento.toString();
          } else {
            return indicador.codigo + 'P1.';
        }
    }

}