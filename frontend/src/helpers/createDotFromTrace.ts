import { TraceDTO } from '@/models/API/TraceDTO';

export const createDotFromTrace = (trace: TraceDTO): string => {
    const events = trace.events;

    let result = 'digraph G {\n';

    if (trace.events.length === 0) {
        return 'digraph G {\n' + '}\n';
    }

    result += `"start" -> "1. ${events[0].activity}"`;

    if (events.length === 1) {
        result += `"${events[0].activity}";\n`;
    } else {
        for (let i = 0; i < trace.events.length - 1; i++) {
            result += `"${i + 1}. ${events[i].activity}" -> "${i + 2}. ${events[i + 1].activity}";\n`;
        }
    }

    result += `"${events.length}. ${events[events.length - 1].activity}" -> "end"`;

    result += '}\n';

    return result;
};
