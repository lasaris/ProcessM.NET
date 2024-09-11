export const stripParentheses = (input: string): string => {
    return input.replace(/\s*\([^)]*\)$/, '');
};
