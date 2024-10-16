export const createDotFromStringArrayTrace = (trace: string[]): string => {
    let dotGraph = `digraph TraceGraph {
        rankdir=UD;  // Set layout to Left-to-Right (horizontal)
        node [shape=none, margin=0, fontsize=10];  // Remove node shape, set small font
        edge [minlen=1, arrowsize=0.5];  // Shorten edges and make arrow smaller
    \n`;

    for (let i = 0; i < trace.length; i++) {
        dotGraph += `  node${i} [label="${trace[i]}"];\n`;

        if (i > 0) {
            dotGraph += `  node${i - 1} -> node${i};\n`;
        }
    }

    dotGraph += '}';
    return dotGraph;
};
