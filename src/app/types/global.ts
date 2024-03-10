import { PrismaClient } from '@prisma/client';
import {ISOStringDate} from './csv-object';

declare global {
    interface Date {
        toISOString(): ISOStringDate;
    }

    interface ObjectConstructor {
        entries<T>(o: T): [keyof T, T[keyof T]][];
    }
}
