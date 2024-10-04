import { STransition } from '@/models/API/STransition';

export const generateDotFromSTransitions = (transitions: STransition[]) => {
    let dotGraph = 'digraph G {\n';

    transitions.forEach((transition) => {
        transition.inputPlaces.forEach((inputPlace) => {
            dotGraph += `"${inputPlace.id}" [shape=circle${inputPlace.id.includes("'") ? ',fillcolor=red,style=filled' : ''}];\n`;
        });

        dotGraph += `"${transition.id}" [shape=box, label="${transition.activity}"];\n`;

        transition.inputPlaces.forEach((inputPlace) => {
            dotGraph += `"${inputPlace.id}" -> "${transition.id}";\n`;
        });

        transition.outputPlaces.forEach((outputPlace) => {
            dotGraph += `"${outputPlace.id}" [shape=circle${outputPlace.id.includes("'") ? ',fillcolor=red,style=filled' : ''}];\n`;
            dotGraph += `"${transition.id}" -> "${outputPlace.id}";\n`;
        });
    });

    dotGraph += '}\n';
    return dotGraph;
};
