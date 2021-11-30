
import { CuestionarioPorUsuarioEntity } from "src/cuestionario-por-usuario/cuestionario-por-usuario.entity";
import { PeriodoEntity } from "src/periodo/periodo.entity";
import { PreguntaPorCuestionarioEntity } from "src/pregunta-por-cuestinario/pregunta-por-cuestionario.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('cuestionario')
export class CuestionarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'codigo',
            type: 'varchar',
            length: 15,
            unique: true
        }
    )
    codigo: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar'
        }
    )
    titulo: string;

    @Column(
        {
            name: 'informacion',
            type: 'varchar'
        }
    )
    informacion: string;

    @Column(
        {
            name: 'tipo',
            type: 'varchar',
            length: 30,
        }
    )
    tipo: string;

    @Column(
        {
            name: 'fecha',
            type: 'date'
        }
    )
    fecha: string;

    @Column(
        {
            name: 'estado',
            type: 'tinyint',
            default: 1
        }
    )
    estado: number;

    @ManyToOne(
        type => PeriodoEntity, 
        periodo => periodo.cuestionarios, 
        { 
            cascade: true, 
            onDelete: 'CASCADE' 
        }
    )
    @JoinColumn(
        { 
            name: 'idPeriodo' 
        }
    )
    periodo: PeriodoEntity;

    @OneToMany(
        type => PreguntaPorCuestionarioEntity,
        preguntaPorCuestionario => preguntaPorCuestionario.cuestionario,
      )
      preguntasPorCuestionario: PreguntaPorCuestionarioEntity[];

    @OneToMany(
        type => CuestionarioPorUsuarioEntity,
        cuestionarioPorUsuario => cuestionarioPorUsuario.cuestionario,
      )
      cuestionariosPorUsuario: CuestionarioPorUsuarioEntity[];

}