import { Event } from '@/models/API/Event';

export const createDotFromTraceWithHighlight = (
    events: Event[],
    logEvents: string[]
): string => {
    let result = 'digraph G {\n';

    if (events.length === 0) {
        return 'digraph G {\n' + '}\n';
    }

    const nodes = [];
    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        nodes.push({
            nodeName: `node${i}`,
            node: `node${i} [label="${event.activity}"${logEvents.includes(event.activity) ? ',fillcolor=red, style=filled' : ''}];\n`,
        });
    }

    nodes.forEach((node) => {
        result += node.node;
    });

    result += `"start" -> "node0";\n`;

    for (let i = 0; i < nodes.length - 1; i++) {
        const node = nodes[i].nodeName;
        const nextNode = nodes[i + 1].nodeName;
        result += `${node} -> ${nextNode};\n`;
    }

    result += `"node${events.length - 1}" -> "end";\n`;

    result += '}\n';
    return result;
};
