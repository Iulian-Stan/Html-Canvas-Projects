import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from '../libs/image-loader.js';
import { ImageAscii } from './image-ascii.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('../resources/deadpool.png');
    let imageAscii = new ImageAscii(10, 'Poppins');
    let engine = new Engine(canvas, imageLoader, imageAscii);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({ title: 'Image ASCII' });
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
    params.addBinding(imageAscii, 'resolution', { min: 1, max: 100, step: 1 });

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