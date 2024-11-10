import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import { VectorField } from './vector-field.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let vectorField = new VectorField(15, 0.01, 10, ['#ff5c33', '#ff66b3', '#ccccff', '#b3ffff', '#80ff80', '#ffff33']);
    let engine = new Engine(canvas, vectorField);

    engine.init();
    engine.startAnimation();

    const pane = new Pane({
        title: 'Vector Field',
    });
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });

    params.addBinding(vectorField, 'cellSize', { min: 5, max: 50, step: 5 });
    params.addBinding(vectorField, 'zoom', { min: .001, max: .01, step: .001 });
    params.addBinding(vectorField, 'curve', { min: 5, max: 50, step: 1 });

    const colors = params.addFolder({ title: 'Colors' });
    colors.addBinding(vectorField.colors, '0').on('change', engine.init.bind(engine));
    colors.addBinding(vectorField.colors, '1').on('change', engine.init.bind(engine));
    colors.addBinding(vectorField.colors, '2').on('change', engine.init.bind(engine));
    colors.addBinding(vectorField.colors, '3').on('change', engine.init.bind(engine));
    colors.addBinding(vectorField.colors, '4').on('change', engine.init.bind(engine));

    window.onresize = () => {
        engine.stopAnimation();
        engine.init();
        engine.startAnimation();
    };

    canvas.onmouseenter = canvas.onmousemove = event => {
        engine.mouseX = event.x;
        engine.mouseY = event.y;
    };

    canvas.onmouseleave = () => {
        engine.mouseX = undefined;
        engine.mouseY = undefined;
    };
};