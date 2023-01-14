import { DateTime } from 'luxon';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { dateTransformer } from '..';

export class TrackingEmbed {

    @CreateDateColumn({ name: 'created_at', transformer: dateTransformer })
    createdAt!: DateTime;

    @UpdateDateColumn({ name: 'updated_at', transformer: dateTransformer })
    updatedAt!: DateTime;

    @DeleteDateColumn({ name: 'deleted_at', transformer: dateTransformer })
    deletedAt?: DateTime;

}