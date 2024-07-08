const PI2 = Math.PI * 2;
const PARTICLES_MIN_RADIUS = 1;
const PARTICLES_MAX_RADIUS = 5;
const PARTICLES_CONNECT_DISTANCE = 7500;

function randomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

class Mouse {
    posX;
    posY;
    radius;
}

class Particle {
    constructor(posX, posY, radius, dirX, dirY) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.dirX = dirX;
        this.dirY = dirY;
    }

    // draw the particle
    draw(context) {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, PI2);
        context.fill();
        context.stroke();
    }

    // update particle position
    update(canvas, mouse) {
        // toggle direction if position is outside the canvas
        if (this.posX + this.radius > canvas.width || this.posX - this.radius < 0) {
            this.dirX = -this.dirX;
        }
        if (this.posY + this.radius > canvas.height || this.posY - this.radius < 0) {
            this.dirY = -this.dirY;
        }
        this.posX += this.dirX;
        this.posY += this.dirY;

        // return if mouse is not inside the canvas
        if (mouse.posX === undefined || mouse.posY === undefined) {
            return;
        }

        // return if particle is outside mouse radius
        if (this.distance(mouse) > mouse.radius) {
            return;
        }

        if (mouse.posX < this.posX && this.posX < canvas.width - 10 * this.radius) {
            this.posX += 10;
        }
        if (mouse.posX > this.posX && this.posX > 10 * this.radius) {
            this.posX -= 10;
        }
        if (mouse.posY < this.posY && this.posY < canvas.height - 10 * this.radius) {
            this.posY += 10;
        }
        if (mouse.posY > this.posY && this.posY > 10 * this.radius) {
            this.posY -= 10;
        }
    }

    distance(particle) {
        let dx = this.posX - particle.posX;
        let dy = this.posY - particle.posY;
        return dx * dx + dy * dy;
    }

    connect(particle, context) {
        let distance = this.distance(particle);
        if (distance > PARTICLES_CONNECT_DISTANCE) {
            return;
        }
        context.strokeStyle = `rgba(255, 255, 255, ${1 - distance / PARTICLES_CONNECT_DISTANCE})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(this.posX, this.posY);
        context.lineTo(particle.posX, particle.posY);
        context.stroke();
    }
}

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let lastTimeStep = 0;
    let particles = [];
    let animationRequest;
    let mouse = new Mouse;

    // Particle system initialization
    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let area = canvas.width * canvas.height;
        mouse.radius = area * 0.01;
        particles = [];
        for (let i = 0; i < area * .0002; ++i) {
            let radius = randomNumber(PARTICLES_MIN_RADIUS, PARTICLES_MAX_RADIUS)
            let particle = new Particle(
                randomNumber(radius, canvas.width - radius),
                randomNumber(radius, canvas.height - radius),
                radius,
                1 - 2 * Math.random(),
                1 - 2 * Math.random());
            particles.push(particle);
        }
    }

    // Particle system animation
    function animate(timeStep) {
        // console.log(timeStep - lastTimeStep);
        lastTimeStep = timeStep;
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // update particle positions
        for (let i = 0; i < particles.length; ++i) {
            particles[i].update(canvas, mouse);
        }
        // draw particles and connections
        for (let i = 0; i < particles.length; ++i) {
            particles[i].draw(ctx);
            for (let j = i + 1; j < particles.length; ++j) {
                particles[i].connect(particles[j], ctx);
            }
        }
        // request new animation
        animationRequest = window.requestAnimationFrame(animate);
    }

    init();
    animate();

    window.onresize = () => {
        // cancel current animation
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