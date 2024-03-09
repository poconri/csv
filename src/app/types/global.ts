import {ISOStringDate} from './csv-object';

declare global {
    interface Date {
        toISOString(): ISOStringDate;
    }

    interface ObjectConstructor {
        keys<T>(o: T): (keyof T & string)[];
    }
}