import { User } from './user.entity';
import { TrackingEmbed } from './embedded/tracking.embed';

import {
    Entity, BaseEntity,
    Column, JoinColumn, PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User, (user) => user.todoList)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ length: 512 })
    content!: string;

    @Column({ name: 'is_done', default: false })
    isDone!: boolean;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;

        delete cloned.userId;
        cloned.user = {
            id: this.user?.id,
            fullName: this.user?.fullName,
            email: this.user?.email,
        };

        return cloned;
    }

}