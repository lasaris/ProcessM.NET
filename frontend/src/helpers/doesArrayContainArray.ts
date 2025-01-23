import { areArraysEqual } from './areArraysEqual';

export const doesArrayContainArray = (
    a1: string[][],
    a2: string[]
): boolean => {
    return a1.some((array) => areArraysEqual(array, a2));
};
