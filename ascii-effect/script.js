import { Pane } from '../libs/tweakpane/tweakpane-4.0.5.js';
import * as TweakpaneFileImportPlugin from '../libs/tweakpane/tweakpane-plugin-file-import-1.1.1.js';
import { ImageLoader } from './image-loader.js';
import { AsciiArt } from './ascii-art.js';
import { Engine } from './engine.js';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let imageLoader = new ImageLoader('deadpool.png');
    let asciiArt = new AsciiArt(10, 'Poppins');
    let engine = new Engine(canvas, asciiArt, imageLoader);

    engine.init(window.innerWidth, window.innerHeight);
    engine.startAnimation();

    const pane = new Pane({
        title: 'ASCII Art',
    });
    pane.registerPlugin(TweakpaneFileImportPlugin);
    pane.addBinding(engine, 'frameRate', { readonly: true });

    const params = pane.addFolder({ title: 'Parameters' });
    params.addBinding(asciiArt, 'resolution', { min: 1, max: 100, step: 1 });

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