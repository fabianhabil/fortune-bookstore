import {
    BaseEntity,
    Column,
    Double,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Penerbit } from './penerbit.entity';
import { KategoriBuku } from './kategori-buku.entity';

export enum BahasaBuku {
    'BAHASA INDONESIA',
    'BAHASA INGGRIS'
}

@Entity('buku')
export class Buku extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_buku' })
    bukuId!: number;

    @Column({ name: 'nama', length: 64 })
    name!: string;

    @Column({ length: 64 })
    deskripsi!: string;

    @Column()
    harga!: number;

    @Column({ default: 0 })
    stok!: number;

    @Column({ name: 'jumlah_halaman' })
    jumlahHalaman!: number;

    @Column({ name: 'tanggal_terbit' })
    tanggalTerbit!: Date;

    @Column({ type: 'enum', enum: BahasaBuku })
    bahasa!: BahasaBuku;

    @Column({ type: 'double' })
    berat!: Double;

    @Column({ type: 'double' })
    lebar!: Double;

    @Column({ type: 'double' })
    panjang!: Double;

    @Column({ name: 'id_penerbit' })
    penerbitId!: string;

    @Column({ name: 'id_kategori_buku' })
    kategoriBukuId!: number;

    @ManyToOne(() => Penerbit)
    @JoinColumn({ name: 'id_penerbit' })
    penerbit!: Penerbit;

    @ManyToOne(() => KategoriBuku)
    @JoinColumn({ name: 'id_kategori_buku' })
    kategoriBuku!: KategoriBuku;
}
