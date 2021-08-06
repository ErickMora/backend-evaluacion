import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Like, Repository, UpdateResult} from 'typeorm';
import { CategoriaEntity } from './categoria.entity';
import { CategoriaActualizarDto } from './dto/categoria-actualizar.dto';
import { CategoriaCrearDto } from './dto/categoria-crear.dto';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly _categoriaRepository:
            Repository<CategoriaEntity>
    ) {
    }

    async listarCategorias(): Promise<CategoriaEntity[]> {
        return this._categoriaRepository.find();

    }

    
    async crearCategoria(categoriaCrearDto: CategoriaCrearDto): Promise<CategoriaEntity> {
       
            const nuevoCategoria = new CategoriaEntity();
            nuevoCategoria.nombre = categoriaCrearDto.nombre;
            
            try {
                await this._categoriaRepository.save(this._categoriaRepository.create(nuevoCategoria));
            } catch (error) {
                console.error(error);
            }
        
        return nuevoCategoria;
        }

    async actualizarCategoria(idCategoria: number, categoriaActualizarDto: CategoriaActualizarDto): Promise<UpdateResult> {

        const id = idCategoria;
        console.log('Categoria actualizado: ', id);
        return this._categoriaRepository.update(idCategoria, {

            nombre: categoriaActualizarDto.nombre
        });
    }

    async eliminarCategoria(idCategoria: number): Promise<DeleteResult> {
        return this._categoriaRepository.delete(idCategoria);
    }

    async buscar(consulta: any): Promise<CategoriaEntity[]> {
        if (consulta.where) {
            Object.keys(consulta.where).map(atributo => {
                consulta.where[atributo] = Like(`%${consulta.where[atributo]}%`);
            });
          }
        return this._categoriaRepository.find(consulta);
    }

    async buscarPorId(idCategoria: number): Promise<CategoriaEntity> {
        return this._categoriaRepository.findOne(idCategoria, {
            relations: [
              'materias'
            ]});
    }

    async buscarCategoriaPorNombre(nombre: string): Promise<CategoriaEntity> {
        return this._categoriaRepository.findOne(nombre)
    }

    async buscarCategoria(nombre?: string): Promise<CategoriaEntity> {
        return this._categoriaRepository.findOne({where: {nombre: Like(`%${nombre}%`)}});
    }

}