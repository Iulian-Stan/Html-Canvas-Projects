import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import { LinkedParticles } from './linked-particles.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let linkedParticles = new LinkedParticles(350, 1, 5, '#FFFFFF', 7500, '#FFFFFF', 0.01);
    let engine = new Engine(canvas, linkedParticles);

    engine.init();
    engine.startAnimation();

    const pane = new Pane({ title: 'Vector Field' });
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
    params.addBinding(linkedParticles, 'particlesCount', { min: 10, max: 1000, step: 10 });
    params.addBinding(linkedParticles, 'particleMinRadius', { min: 1, max: 5, step: 1 });
    params.addBinding(linkedParticles, 'particleMaxRadius', { min: 5, max: 10, step: 1 });
    params.addBinding(linkedParticles, 'particleColor');
    params.addBinding(linkedParticles, 'linkDistance', { min: 7000, max: 8000, step: 100 });
    params.addBinding(linkedParticles, 'linkColor');
    params.addBinding(linkedParticles, 'mouseRatio', { min: 0.001, max: 0.01, step: 0.001 });

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