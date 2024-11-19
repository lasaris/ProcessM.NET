import { STransition } from '@/models/API/STransition';

export const generateDotFromSTransitions = (
    transitions: STransition[] | undefined
) => {
    if (!transitions) {
        return;
    }

    const filteredTransitions = transitions.filter((transition) => {
        return !['', '<<start>>', '<<end>>'].includes(transition.activity);
    });

    let dotGraph = 'digraph G {\n';

    for (let i = 0; i < filteredTransitions.length; i++) {
        const transition = filteredTransitions[i];

        dotGraph += `node${i} [label=<<B>${transition.activity}</B>>${transition.cost > 0 ? ',fillcolor="#9cf786",style=filled' : ''}];\n`;

        if (i > 0) {
            dotGraph += `node${i - 1} -> node${i};\n`;
        }
    }

    dotGraph += '}\n';

    return dotGraph;
};
