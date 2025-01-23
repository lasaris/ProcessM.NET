export const convertUnixTimestampToDateString = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
};
