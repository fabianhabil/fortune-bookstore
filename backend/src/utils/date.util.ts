import assert from 'assert';

import { Column } from 'typeorm';
import { registerDecorator } from 'class-validator';
import { DateTime } from 'luxon';

import type { ValidationOptions } from 'class-validator';
import type { ValueTransformer, ColumnOptions } from 'typeorm';

export const DEFAULT_DATETIME_FORMAT = 'dd-MM-yyyy HH:mm:ss';

export const dateTransformer: ValueTransformer = {
    from: (value: Date | null) => value && DateTime.fromJSDate(value),
    to: (value: DateTime | null) => value?.toJSDate(),
};

/**
 * A function used with `typeorm` that uses our standardized date time types.
 *
 * @param options the normal column options, see {@link ColumnOptions}
 */
export function DateColumn(options: ColumnOptions) {
    return Column({
        type: 'timestamp',
        transformer: dateTransformer,
        ...options,
    });
}

/**
 * A function used with `class-validator` where you want to
 * validate a date time.
 *
 * @param dateFormat the date time format you want to use,
 *                   defaults to {@link DEFAULT_DATETIME_FORMAT}.
 */
export function IsFormattedDate(
    dateFormat?: string,
    opts?: ValidationOptions): PropertyDecorator {

    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: Object, propertyKey: string | symbol) => {
        assert(typeof propertyKey === 'string');
        const chosenFormat = dateFormat ?? DEFAULT_DATETIME_FORMAT;

        registerDecorator({
            name: 'isFormattedDate',
            target: target.constructor,
            propertyName: propertyKey,
            constraints: [chosenFormat],
            options: opts,
            validator: {
                validate(value) {
                    return typeof value === 'string'
                        && DateTime.fromFormat(value, chosenFormat).isValid;
                },
                defaultMessage: () =>
                    `$property must be a valid date (format: ${chosenFormat})`,
            },
        });
    };
}