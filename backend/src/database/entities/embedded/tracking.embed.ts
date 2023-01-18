import { dateTransformer } from '../../../utils/date.util';
import { DateTime } from 'luxon';

import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TrackingEmbed {

    @CreateDateColumn({ name: 'created_at', transformer: dateTransformer })
    createdAt!: DateTime;

    @UpdateDateColumn({ name: 'updated_at', transformer: dateTransformer })
    updatedAt!: DateTime;

    @BeforeUpdate()
    private updateTracking() {
        this.updatedAt = DateTime.now();
    }

}
