import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from '../libs/image-loader.js';
import { FallingAscii } from './falling-ascii.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('../resources/cyberpunk.png');
    let fallingParticles = new FallingAscii(2000, 5, 12, '#FFF', true, 'Poppins');
    let engine = new Engine(canvas, fallingParticles, imageLoader);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({ title: 'Falling ASCII' });
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
    params.addBinding(fallingParticles, 'particlesCount', { min: 100, max: 5000, step: 100 });
    params.addBinding(fallingParticles, 'particleMinSize', { min: 4, max: 8, step: 1 });
    params.addBinding(fallingParticles, 'particleMaxSize', { min: 8, max: 16, step: 1 });
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