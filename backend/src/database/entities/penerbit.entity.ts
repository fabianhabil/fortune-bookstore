import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('penerbit')
export class Penerbit extends BaseEntity {
    @PrimaryColumn({ name: 'id_penerbit' })
    penerbitId!: string;

    @Column()
    nama!: string;
}
