import { IndicadorEntity } from "src/indicador/indicador.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('area')
export class AreaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'codigo',
            type: 'varchar',
            unique: true
        }
    )
    codigo: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            unique: true
        }
    )
    nombre: string;

    @Column(
        {
            name: 'descripcion',
            type: 'varchar'
        }
    )
    descripcion: string;

    @OneToMany(
        type => IndicadorEntity, 
        indicador => indicador.area
    )
    indicadores: IndicadorEntity[];


}