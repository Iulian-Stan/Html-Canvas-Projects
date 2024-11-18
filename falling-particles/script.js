import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from '../libs/image-loader.js';
import { FallingParticles } from './falling-particles.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('../resources/cyberpunk.png');
    let fallingParticles = new FallingParticles(5000, 1, 2.5, 2.5, 5, '#FFF', true);
    let engine = new Engine(canvas, fallingParticles, imageLoader);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({ title: 'Falling Particles' });
    pane.registerPlugin(TweakpaneFileImportPlugin);
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
    params.addBinding(fallingParticles, 'particlesCount', { min: 100, max: 10000, step: 100 });
    params.addBinding(fallingParticles, 'particleMinRadius', { min: 1, max: 1.5, step: .1 });
    params.addBinding(fallingParticles, 'particleMaxRadius', { min: 1.5, max: 5, step: .1 });
    params.addBinding(fallingParticles, 'particleMinSpeed', { min: 1, max: 5, step: .1 });
    params.addBinding(fallingParticles, 'particleMaxSpeed', { min: 5, max: 10, step: .1 });
    params.addBinding(fallingParticles, 'particleColor');
    const colorButton = params.addButton({ title: fallingParticles.monochrome ? 'Color' : 'Monochrome' }).on('click', () => {
        if (fallingParticles.monochrome) {
            fallingParticles.monochrome = false;
            colorButton.title = 'Monochrome';
        } else {
            fallingParticles.monochrome = true;
            colorButton.title = 'Color';
        }
    });

    const image = params.addFolder({ title: 'Image' });
    image.addBinding(imageLoader, 'imageFile', {
        view: 'file-input',
        lineCount: 3,
        filetypes: ['.png', '.jpg'],
        invalidFiletypeMessage: 'Unsupported file type !'
    });

    window.onresize = () => {
        engine.stopAnimation();
        engine.init(window.innerWidth, window.innerHeight);
        engine.startAnimation();
    };
};