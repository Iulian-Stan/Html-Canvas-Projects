import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from '../libs/image-loader.js';
import { ImageParticles } from './image-particles.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('../resources/deadpool.png');
    let imageParticles = new ImageParticles(10, 20000, 0.9, 0.1, true);
    let engine = new Engine(canvas, imageLoader, imageParticles);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({ title: 'Image Particles' });
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
    params.addBinding(imageParticles, 'particleRadius', { min: 1, max: 100, step: 1 });
    params.addBinding(imageParticles, 'friction', { min: .01, max: 1, step: .01 });
    params.addBinding(imageParticles, 'amortization', { min: .01, max: 1, step: .01 });
    const circleButton = params.addButton({ title: imageParticles.circle ? 'Square' : 'Circle' }).on('click', () => {
        if (imageParticles.circle) {
            imageParticles.circle = false;
            circleButton.title = 'Circle';
        } else {
            imageParticles.circle = true;
            circleButton.title = 'Square';
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

    canvas.onmouseenter = canvas.onmousemove = event => {
        engine.mouseX = event.x;
        engine.mouseY = event.y;
    };

    canvas.onmouseleave = () => {
        engine.mouseX = undefined;
        engine.mouseY = undefined;
    };
};