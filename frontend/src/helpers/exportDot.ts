export const exportDot = (title: string, dotString: string) => {
    const blob = new Blob([dotString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `${title}.dot`;
    link.href = url;
    link.click();
};
