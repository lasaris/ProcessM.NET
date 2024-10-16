export const shortenTrace = (trace: string[], numSteps: number = 3): string => {
    const edittedTrace = trace.filter(
        (activity) => activity !== '<<start>>' && activity !== '<<end>>'
    );

    if (edittedTrace.length <= 2 * numSteps) {
        return edittedTrace.join(' → ');
    }

    const start = edittedTrace.slice(0, numSteps);
    const end = edittedTrace.slice(-numSteps);

    return `${start.join(' → ')} → ... → ${end.join(' → ')}`;
};
