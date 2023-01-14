import { DateTime } from 'luxon';

import type { ValueTransformer } from 'typeorm';

export const dateTransformer: ValueTransformer = {
    from: (value: Date | null) => value && DateTime.fromJSDate(value),
    to: (value: DateTime | null) => value?.toJSDate(),
};