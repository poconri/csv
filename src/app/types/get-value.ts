import { ISOStringDate } from "./csv-object";

export const getBoolean = (value: string): boolean => value.toLowerCase() === 'true';

export const getNumber = (value: string): number => Number(value.split(' ').join(''));
export const getDateIsoString = (value:string): ISOStringDate => {
    const date = new Date(value);
    return date.toISOString();

}


export const getString = (value: string) => value;