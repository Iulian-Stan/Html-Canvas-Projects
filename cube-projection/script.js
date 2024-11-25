import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import { Renderer } from './renderer.js';
import { Engine } from './engine.js';
import { Cube } from '../libs/cube.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let cube = new Cube(0, 0, 500, 300);
    let renderer = new Renderer(200, '#FFF', '#CCC', cube);
    let engine = new Engine(canvas, renderer);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({ title: '3D Cube' });
    const runButton = pane.addButton({ title: 'Pause' }).on('click', () => {
        if (runButton.title === 'Pause') {
            engine.stopAnimation();
            runButton.title = 'Resume';
        } else {
            engine.startAnimation();
            runButton.title = 'Pause';
        }
    });
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });
    params.addBinding(renderer, 'focalLength', { min: 10, max: 1000, step: 10 });
    params.addBinding(renderer, 'edgeColor');
    params.addBinding(renderer, 'faceColor');

    const transform = params.addFolder({ title: 'TRansformation' });
    transform.addBinding(renderer, 'autoRotate');
    transform.addBinding(renderer, 'xAngleInc', { min: 0.001, max: 0.5, step: 0.001 });
    transform.addBinding(renderer, 'yAngleInc', { min: 0.001, max: 0.5, step: 0.001 });
    transform.addBinding(renderer, 'zAngleInc', { min: 0.001, max: 0.5, step: 0.001 });

    window.onresize = () => {
        engine.stopAnimation();
        engine.init(window.innerWidth, window.innerHeight);
        engine.startAnimation();
    };
};