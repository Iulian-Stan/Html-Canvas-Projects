import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import { ParticleSystem } from './particle-system.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let particleSystem = new ParticleSystem(.0002, 1, 5, '#FFFFFF', 7500, '#FFFFFF', 0.01);
    let engine = new Engine(canvas, particleSystem);

    engine.init();
    engine.startAnimation();

    const pane = new Pane({
        title: 'Vector Field',
    });
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });

    params.addBinding(particleSystem, 'particlesRatio', { min: 0.0001, max: 0.001, step: 0.0001 });
    params.addBinding(particleSystem, 'particleMinRadius', { min: 1, max: 5, step: 1 });
    params.addBinding(particleSystem, 'particleMaxRadius', { min: 5, max: 10, step: 1 });
    params.addBinding(particleSystem, 'particleColor');
    params.addBinding(particleSystem, 'linkDistance', { min: 7000, max: 8000, step: 100 });
    params.addBinding(particleSystem, 'linkColor');
    params.addBinding(particleSystem, 'mouseRatio', { min: 0.001, max: 0.01, step: 0.001 });

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