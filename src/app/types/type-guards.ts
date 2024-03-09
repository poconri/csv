import { DateTime } from 'luxon';

export const isNumber = (value: unknown): value is number =>
	typeof value === "string" && !isNaN(Number(value.split(" ").join("")));

export const isValidDate = (
	value: unknown
): value is `${number}-${number}-${number}` => typeof value === 'string' && DateTime.fromFormat(value, 'yyyy/M/d').isValid;


export const isString = (value: unknown): value is string =>
    typeof value === "string"
