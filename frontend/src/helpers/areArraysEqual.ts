export const areArraysEqual = <T>(a1: T[], a2: T[]): boolean => {
    return (
        a1.length === a2.length &&
        a1.every((value, index) => value === a2[index])
    );
};
