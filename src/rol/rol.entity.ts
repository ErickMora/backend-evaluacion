
import { UsuarioEntity } from "src/usuario/usuario.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('rol')
export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 20,
        }
    )
    nombre: string;

    @OneToMany(
        type => UsuarioEntity, 
        usuario => usuario.rol
    )
    usuarios: UsuarioEntity[];
  

}