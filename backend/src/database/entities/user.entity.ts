import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TrackingEmbed } from './embedded/tracking.embed';

export enum UserRole{
    USER,
    ADMIN
}

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id_user' })
    idUser!: number;

    @Column({ name: 'nama', length: 64 })
    name!: string;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 64 })
    password!: string;

    @Column({ length: 64 })
    alamat!: string;

    @Column({ type: 'bigint', default: 0 })
    saldo!: bigint;

    @Column({ name: 'tgl_lahir', type: 'date' })
    tglLahir!: Date;

    @Column({ name: 'no_telp', length: 20 })
    phone!: string;

    @Column({ type: 'enum', default: UserRole.USER, enum: UserRole })
    role!: UserRole;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.password;
        return cloned;
    }

}
