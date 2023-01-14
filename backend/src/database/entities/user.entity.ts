import { Todo } from './todo.entity';
import { TrackingEmbed } from './embedded/tracking.embed';

import {
    Entity, BaseEntity,
    Column, PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => Todo, (todo) => todo.id)
    todoList!: Todo[];

    @Column({ name: 'full_name', length: 64 })
    fullName!: string;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 32 })
    phone!: string;

    @Column({ length: 64 })
    password!: string;

    @Column(() => TrackingEmbed, { prefix: false })
    track!: TrackingEmbed;

    toJSON() {
        const cloned = { ...this } as Record<string, unknown>;
        delete cloned.password;

        return cloned;
    }

}