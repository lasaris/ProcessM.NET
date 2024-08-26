export const exportPnml = (title: string, pnmlString: string) => {
    const blob = new Blob([pnmlString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `${title}.pnml`;
    link.href = url;
    link.click();
};
