const SYMBOLS = '!#$%&()*+-/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_{|}~"';
const FONT_SIZE = 100;
const FONT_FAMILY = 'Poppins';

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let context2d = canvas.getContext('2d');
    let obj = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let set = new Set();
    for (let symbol of SYMBOLS) {
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        context2d.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
        context2d.fillStyle = '#FFFFFF';
        context2d.fillText(symbol, 0, FONT_SIZE);
        let image = context2d.getImageData(0, 0, FONT_SIZE*2, FONT_SIZE*2);
        let sum = 0;
        for (let i = 0; i < image.height; ++i) {
            for (let j = 0; j < image.width; ++j) {
                let index = (i * image.width + j) * 4;
                if (image.data[index + 3] === 255) {
                    sum += image.data[index] + image.data[index + 1] + image.data[index + 2];
                }
            }
        }
        obj.push({ symbol, sum });
    }
    obj.sort((a,b) => a.sum - b.sum);
    console.log(obj.map(a => a.symbol).join(''));
};