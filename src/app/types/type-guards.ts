import { DateTime } from 'luxon';
import { ResourceAccommodation, SavedResourceAccommodation } from './csv-object';

const RESOURCE_ACCOMMODATION_KEYS_LENGTH = 43;

export const isNumber = (value: unknown): value is number =>
	typeof value === "string" && !isNaN(Number(value.split(" ").join("")));

export const isValidDate = (
	value: unknown
): value is `${number}/${number}/${number}` => typeof value === 'string' && DateTime.fromFormat(value, 'yyyy/M/d').isValid;


export const isString = (value: unknown): value is string =>
    typeof value === "string"

export const isResourceAccommodation = (value: unknown): value is SavedResourceAccommodation => 
	typeof value === "object" && value !== null && Object.keys(value).length > RESOURCE_ACCOMMODATION_KEYS_LENGTH;


export const isArrayOf = <T>( typeGuard: (value: unknown) => value is T,value: unknown): value is T[] =>
	Array.isArray(value) && value.every(typeGuard);

export const isArrayOfResourceAccommodation = (value: unknown): value is SavedResourceAccommodation[] =>
	isArrayOf(isResourceAccommodation, value);
