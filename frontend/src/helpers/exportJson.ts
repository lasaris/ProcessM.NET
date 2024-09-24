export const exportJson = (title: string, jsonString: string) => {
    const blob = new Blob([jsonString], { type: 'text/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `${title}.json`;
    link.href = url;
    link.click();
};
