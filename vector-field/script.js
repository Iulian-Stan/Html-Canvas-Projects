class Mouse {
    posX;
    posY;
    radius;
}

class VectorField {
    constructor(cellSize, zoom, curve) {
        this.cellSize = cellSize;
        this.zoom = zoom;
        this.curve = curve;
        this.radius = 10;
        this.vr = .00003;
        this.angle = 0;
    }

    init(canvas) {
        // create flow field
        this.height = canvas.height;
        this.width = canvas.width;
    }

    #drawLine(context, x, y, angle, curve) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + Math.cos(angle) * curve, y + Math.sin(angle) * curve);
        context.stroke();
    }

    draw(context, mouse) {
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                this.radius += this.vr;
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.radius;
                let curve = this.curve;
                if (mouse.posX !== undefined && mouse.posY !== undefined) {
                    let dx = x - mouse.posX;
                    let dy = y - mouse.posY;
                    let dist = dx * dx + dy * dy;
                    if (dist < mouse.radius) {
                        curve *= dist / mouse.radius;
                    }
                }
                this.#drawLine(context, x, y, angle, curve);
            }
        }
    }
}

var obj = {
    cellSize: 20,
    zoom: .1,
    curve: 2.3,
    particlesCount: 1000,
    color0: '#55065c',
    color1: '#9510a1',
    color2: '#b21fbf',
    color3: '#c538d1',
    color4: '#cf62d9'
};

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let lastTimeStep = 0;
    let animationRequest;
    let vectorField = new VectorField(15, 0.01, 10);
    let mouse = new Mouse;

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let area = canvas.width * canvas.height;
        mouse.radius = area * 0.05;
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop("0.1", "#ff5c33");
        gradient.addColorStop("0.2", "#ff66b3");
        gradient.addColorStop("0.4", "#ccccff");
        gradient.addColorStop("0.6", "#b3ffff");
        gradient.addColorStop("0.8", "#80ff80");
        gradient.addColorStop("0.9", "#ffff33");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        vectorField.init(canvas);
    }

    function animate(timeStep) {
        // calculate update rate
        // console.log(timeStep - lastTimeStep);
        lastTimeStep = timeStep;
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // update and draw particles
        vectorField.draw(ctx, mouse);
        animationRequest = window.requestAnimationFrame(animate);
    }

    init();
    animate();

    // let gui = new dat.gui.GUI();
    // gui.remember(obj);
    // gui.add(obj, 'cellSize', 5, 50, 2).onFinishChange(cellSize => {
    //     flowField.cellSize = cellSize; init();
    // });
    // gui.add(obj, 'zoom', .01, 0.25, .01).onFinishChange(zoom => {
    //     flowField.zoom = zoom; init();
    // });
    // gui.add(obj, 'curve', 1, 30, 1).onFinishChange(curve => {
    //     flowField.curve = curve; init();
    // });
    // gui.add(obj, 'particlesCount', 100, 10000, 100).onFinishChange(particlesCount => {
    //     flowField.particlesCount = particlesCount; init();
    // });
    // let f1 = gui.addFolder('Colors');
    // f1.addColor(obj, 'color0').onFinishChange(color0 => {
    //     flowField.colors[0] = color0; init();
    // });
    // f1.addColor(obj, 'color1').onFinishChange(color1 => {
    //     flowField.colors[1] = color1; init();
    // });
    // f1.addColor(obj, 'color2').onFinishChange(color2 => {
    //     flowField.colors[2] = color2; init();
    // });
    // f1.addColor(obj, 'color3').onFinishChange(color3 => {
    //     flowField.colors[3] = color3; init();
    // });
    // f1.addColor(obj, 'color4').onFinishChange(color4 => {
    //     flowField.colors[4] = color4; init();
    // });

    window.onresize = () => {
        window.cancelAnimationFrame(animationRequest);
        init();
        animate();
    };

    canvas.onmouseenter = canvas.onmousemove = event => {
        mouse.posX = event.x;
        mouse.posY = event.y;
    };

    canvas.onmouseleave = () => {
        mouse.posX = undefined;
        mouse.posY = undefined;
    };
};