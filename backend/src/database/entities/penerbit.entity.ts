import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Buku } from './buku.entity';

@Entity('penerbit')
export class Penerbit extends BaseEntity {
    @PrimaryColumn({ name: 'id_penerbit' })
    penerbitId!: string;

    @Column()
    nama!: string;

    @OneToMany(() => Buku, (buku) => buku)
    buku!: Buku[];
}
