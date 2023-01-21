import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Buku } from './buku.entity';

@Entity('kategori_buku')
export class KategoriBuku extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_kategori_buku' })
    kategoriBukuId!: number;

    @Column({ name: 'nama_kategori' })
    nama!: string;

    @OneToMany(() => Buku, (buku) => buku)
    buku!: Buku[];
}
