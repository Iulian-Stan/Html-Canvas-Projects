import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import { FlowField } from './flow-field.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let flowField = new FlowField(20, .1, 2.3, 1000, ['#55065c', '#9510a1', '#b21fbf', '#c538d1', '#cf62d9']);
    let engine = new Engine(canvas, flowField);

    engine.init();
    engine.startAnimation();

    const pane = new Pane({
        title: 'Flow Field',
    });
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });

    params.addBinding(flowField, 'cellSize', { min: 5, max: 50, step: 5 }).on('change', engine.init.bind(engine));
    params.addBinding(flowField, 'zoom', { min: .01, max: .25, step: .01 }).on('change', engine.init.bind(engine));
    params.addBinding(flowField, 'curve', { min: 1, max: 30, step: 1 }).on('change', engine.init.bind(engine));
    params.addBinding(flowField, 'particlesCount', { min: 100, max: 10000, step: 100 }).on('change', engine.init.bind(engine));

    const colors = params.addFolder({ title: 'Colors' });
    colors.addBinding(flowField.colors, '0').on('change', engine.init.bind(engine));
    colors.addBinding(flowField.colors, '1').on('change', engine.init.bind(engine));
    colors.addBinding(flowField.colors, '2').on('change', engine.init.bind(engine));
    colors.addBinding(flowField.colors, '3').on('change', engine.init.bind(engine));
    colors.addBinding(flowField.colors, '4').on('change', engine.init.bind(engine));

    window.onresize = () => {
        engine.stopAnimation();
        engine.init();
        engine.startAnimation();
    };
};