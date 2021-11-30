import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { MateriaActualizarDto } from './dto/materia-actualizar.dto';
import { MateriaCrearDto } from './dto/materia-crear.dto';
import { MateriaEntity } from './materia.entity';

@Injectable()
export class MateriaService {

    constructor(
        @InjectRepository(MateriaEntity)
        private readonly _materiaRepository:
            Repository<MateriaEntity>
    ) {
    }

    async listarMaterias(): Promise<MateriaEntity[]> {
        return await this._materiaRepository.find();

    }

    
    async crearMateria(materiaCrearDto: MateriaCrearDto): Promise<MateriaEntity> {
       
            const nuevoMateria = new MateriaEntity();
            nuevoMateria.nombre = materiaCrearDto.nombre;
            nuevoMateria.codigo = materiaCrearDto.codigo;
            nuevoMateria.numHoras = materiaCrearDto.numHoras;
            nuevoMateria.categoria = materiaCrearDto.categoria;
            nuevoMateria.nivel = materiaCrearDto.nivel;

            try {
                await this._materiaRepository.save(this._materiaRepository.create(nuevoMateria));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoMateria;
        }

    async actualizarMateria(idMateria: number, materiaActualizarDto: MateriaActualizarDto): Promise<UpdateResult> {

        const id = idMateria;
        console.log('Materia actualizado: ', id);
        return await this._materiaRepository.update(idMateria, {

            nombre: materiaActualizarDto.nombre,
            codigo: materiaActualizarDto.codigo,
            numHoras: materiaActualizarDto.numHoras,
            categoria: materiaActualizarDto.categoria,
            nivel: materiaActualizarDto.nivel
        });
    }

    async eliminarMateria(idMateria: number): Promise<DeleteResult> {
        return await this._materiaRepository.delete(idMateria);
    }

    async buscar(consulta: any): Promise<MateriaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return await this._materiaRepository.find(consulta);
    }

    async buscarPorId(idMateria: number): Promise<MateriaEntity> {
        return await this._materiaRepository.findOne(idMateria, {
            relations: [
              'cursos',
              'categoria',
              'nivel'
            ]});
    }

    async buscarMateriaPorCodigo(codigo: string): Promise<MateriaEntity> {
        return await this._materiaRepository.findOne(codigo)
    }

    async buscarMateria(codigo?: string): Promise<MateriaEntity> {
        return await this._materiaRepository.findOne({where: {codigo: Like(`%${codigo}%`)}});
    }

}