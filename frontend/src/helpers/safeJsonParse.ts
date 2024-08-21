// https://dev.to/maafaishal/safely-use-jsonparse-in-typescript-12e7
export const safeJsonParse = <T>(str: string) => {
    try {
        const jsonValue: T = JSON.parse(str);

        return jsonValue;
    } catch {
        return undefined;
    }
};
