import { User } from './user.entity';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { TrackingEmbed } from './embedded/tracking.embed';
import { Buku } from './buku.entity';

export enum TransaksiEnum {
    'Belum Dibayar',
    'Menunggu Konfirmasi',
    'Sedang Dipersiapkan',
    'Sedang Dikirim',
    'Selesai'
}

@Entity('transaksi')
export class Transaksi extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_transaksi' })
    transaksiId!: number;

    @Column({ name: 'jumlah_buku' })
    jumlahBuku!: number;

    @Column()
    total!: number;

    // @Column({
    //     name: 'status_transaksi',
    //     type: 'enum',
    //     enum: TransaksiEnum,
    //     default: TransaksiEnum['Belum Dibayar']
    // })
    // statusTransaksi!: TransaksiEnum;

    @Column({ name: 'id_buku', select: false })
    bukuId!: number;

    @Column({ name: 'id_user', select: false })
    userId!: number;

    @ManyToOne(() => Buku, (buku) => buku.penerbit)
    @JoinColumn({ name: 'id_buku' })
    buku!: Buku;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;
}
