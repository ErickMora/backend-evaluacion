import { IndicadorEntity } from "src/indicador/indicador.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('area')
export class AreaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 30,
            unique: true
        }
    )
    nombre: string;

    @Column(
        {
            name: 'descripcion',
            type: 'varchar',
            length: 100,
        }
    )
    descripcion: string;

    @OneToMany(
        type => IndicadorEntity, 
        indicador => indicador.area
    )
    indicadores: IndicadorEntity[];


}