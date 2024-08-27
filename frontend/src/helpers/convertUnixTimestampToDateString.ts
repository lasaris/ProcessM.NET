export const convertUnixTimestampToDateString = (timestamp: number) => {
    var date = new Date(timestamp);
    return date.toLocaleDateString();
};
