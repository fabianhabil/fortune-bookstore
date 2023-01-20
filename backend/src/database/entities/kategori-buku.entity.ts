import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kategori_buku')
export class KategoriBuku extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_kategori_buku' })
    penerbitId!: string;

    @Column({ name: 'nama_kategori' })
    nama!: string;
}
