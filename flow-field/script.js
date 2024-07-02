class Particle {
    constructor(posX, posY, acceleration, tail, lifeSpan, color) {
        this.posX = posX;
        this.posY = posY;
        this.acceleration = acceleration;
        this.tail = tail;
        this.history = [];
        this.lifeSpan = lifeSpan;
        this.color = color;
    }

    update(angle) {
        if (this.lifeSpan) {
            this.posX += Math.cos(angle) * this.acceleration;
            this.posY += Math.sin(angle) * this.acceleration;
            this.history.push({ x: this.posX, y: this.posY});
            if (this.history.length > this.tail) {
                this.history.shift();
            }
            this.lifeSpan -= 1;
        } else if (this.history.length) {
            this.history.shift();
        }
    }

    reset(posX, posY, lifeSpan) {
        this.posX = posX;
        this.posY = posY;
        this.lifeSpan = lifeSpan;
    }

    draw(context) {
        context.save();
        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(this.posX, this.posY);
        for (let i = this.history.length - 1; i >= 0; --i) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.stroke();
        context.restore();
    }
}

class FlowField {
    static colors = ['#55065c', '#9510a1', '#b21fbf', '#c538d1', '#cf62d9'];
    constructor(cellSize, zoom, curve, particlesCount) {
        this.cellSize = cellSize;
        this.zoom = zoom;
        this.curve = curve;
        this.particlesCount = particlesCount;
    }

    init(canvas) {
        // create flow field
        this.height = canvas.height;
        this.width = canvas.width;
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
        for (let y = 0; y < this.rows; ++y) {
            for (let x = 0; x < this.cols; ++x) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle);
            }
        }

        this.particles = [];
        for (let i = 0; i < this.particlesCount; ++i) {
            let particle = new Particle(
                Math.floor(Math.random() * this.width),
                Math.floor(Math.random() * this.height),
                Math.floor(Math.random() * 5 + 2),
                Math.floor(Math.random() * 200 + 10),
                Math.floor(Math.random() * 100),
                FlowField.colors[Math.floor(Math.random() * 5 + 1)]);
            this.particles.push(particle);
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; ++i) {
            if (!this.particles[i].lifeSpan && !this.particles[i].history.length) {
                this.particles[i].reset(
                    Math.floor(Math.random() * this.width),
                    Math.floor(Math.random() * this.height),
                    Math.floor(Math.random() * 100)
                );
            }
            let col = Math.floor(this.particles[i].posX / this.cellSize);
            let row = Math.floor(this.particles[i].posY / this.cellSize);
            let index = row * this.cols + col;
            this.particles[i].update(this.flowField[index]);
        }
    }

    draw(contex) {
        for (let i = 0; i < this.particles.length; ++i) {
            this.particles[i].draw(contex);
        }
    }
}

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let lastTimeStep = 0;
    let animationRequest;
    let flowField = new FlowField(20, .1, 2.3, 1000);
    
    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        flowField.init(canvas);
    }

    function animate(timeStep) {
        // calculate update rate
        // console.log(timeStep - lastTimeStep);
        lastTimeStep = timeStep;
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // update and draw particles
        flowField.update(canvas);
        flowField.draw(ctx);
        animationRequest = window.requestAnimationFrame(animate);
    }

    init();
    animate();

    window.onresize = () => {
        window.cancelAnimationFrame(animationRequest);
        init();
        animate();
    };
};