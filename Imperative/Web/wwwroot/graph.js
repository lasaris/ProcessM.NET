import { ContextMenu } from './context-menu.js';

window.InitGraph = (element, csharpObjectRef) => {

    window.csharpGraphRef = csharpObjectRef;

    // https://github.com/api-client/context-menu
    window.contextMenu = new ContextMenu(element);

    // https://github.com/magjac/d3-graphviz
    window.graphviz = d3.select(element)
        .graphviz()
        .fit(true)
        .transition(function () {
            return d3.transition("main")
                .ease(d3.easeQuadInOut)
                .duration(750);
        })
        .on('renderEnd', () => {
            csharpGraphRef.invokeMethodAsync('JsRenderingFinished');
        })
        .on('end', () => {
            const transitions = element.querySelectorAll('.transition');
            [...transitions].forEach((t) => {
                const text = t.querySelector('text');
                const title = t.querySelector('title');
                const polygon = t.querySelector('polygon');

                text.setAttribute("pointer-events", "none");
                title.setAttribute("pointer-events", "none");
                // if (!["<<start>>", "<<end>>"].includes(t.id)) {
                //     polygon.setAttribute("transitionId", t.id);
                //     polygon.classList.add('hasContextMenu');
                // }
            });

            rebuildContextMenu();

            // Adjust the viewBox of the rendered SVG to match the size of the element
            const svg = element.querySelector('svg');
            if (svg) {
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
            }

        });
};

window.RenderGraph = async (dotString) => {
    graphviz.renderDot(dotString);
}

window.ResetZoom = async () => {
    graphviz.resetZoom();
}

const rebuildContextMenu = () => {
    contextMenu.disconnect();
    contextMenu.registerCommands([
        {
            target: '.hasContextMenu',
            label: 'hide',
            execute: (ctx) => {
                csharpGraphRef.invokeMethodAsync('HideTransition', ctx.target.getAttribute("transitionId"))
            }
        },
        {
            target: '.hasContextMenu',
            label: 'color',
            children: [
                {
                    label: 'white',
                    id: 'white',
                    enabled: (ctx) => ctx.target.getAttribute('fill') !== ctx.id,
                    execute: (ctx) => csharpGraphRef.invokeMethodAsync('ChangeTransitionColor', ctx.target.getAttribute("transitionId"), ctx.id)
                },
                {
                    label: 'red',
                    id: 'red',
                    enabled: (ctx) => ctx.target.getAttribute('fill') !== ctx.id,
                    execute: (ctx) => csharpGraphRef.invokeMethodAsync('ChangeTransitionColor', ctx.target.getAttribute("transitionId"), ctx.id)
                },
                {
                    label: 'green',
                    id: 'green',
                    enabled: (ctx) => ctx.target.getAttribute('fill') !== ctx.id,
                    execute: (ctx) => csharpGraphRef.invokeMethodAsync('ChangeTransitionColor', ctx.target.getAttribute("transitionId"), ctx.id)
                },
            ],
        },
    ]);
    contextMenu.connect();
}