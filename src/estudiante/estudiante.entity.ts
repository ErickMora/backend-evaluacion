import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('estudiante')
export class EstudianteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'numCedula',
            type: 'varchar',
            length: 15,
        }
    )
    numCedula: string;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 30,
        }
    )
    nombre: string;

    @Column(
        {
            name: 'apellido',
            type: 'varchar',
            length: 30,
        }
    )
    apellido: string;

    @Column(
        {
            name: 'telefono',
            type: 'varchar',
            length: 20,
        }
    )
    telefono: string;

    @Column(
        {
            name: 'correo',
            type: 'varchar',
            length: 50,
        }
    )
    correo: string;

    @Column(
        {
            name: 'direccion',
            type: 'varchar',
            length: 100,
        }
    )
    direccion: string;


}