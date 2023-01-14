import { TrackingEmbed } from './embedded/tracking.embed';
import { User } from './user.entity';

import {
    Entity, BaseEntity,
    PrimaryColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {

    @PrimaryColumn()
    token!: string;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

}