// Globals
let x = [];
let active = true;

function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    active = w >= 500 ? true : false;
    // Canvas Setup
    if (active) {
        createCanvas(w, h);
        smooth();
    }
}

function setup() {
    resize();
}

function draw() {
    if (active) {
        background(255);

        // Add New Particle
        if (mouseIsPressed) x.push(new Particle(mouseX, mouseY));

        for (let i = x.length - 1; i >= 0; i--) {
            const p = x[i];
            // Terminate Particle
            if (p.size > 300) {
                x.pop(i);
                continue;
            }
            // Update Particle
            p.update();
            p.render();
        }

    }
}

function Particle(x, y) {
    this.life = 0;
    this.size = 2;
    this.change = random(-1, 1);
    this.sizeAcceleration = 0.2;
    this.pos = createVector(x, y);
    this.changeCheck = random(0.5, 5.5);

    this.render = function () {
        strokeWeight(3)
        stroke(mouseX, 200, mouseY);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    };

    this.update = function () {
        if (this.life >= this.changeCheck) {
            this.life++;
            this.change *= -1;
            this.size += this.sizeAcceleration;
            this.sizeAcceleration += random(0.5, 2);
        }
        // Update particle direction
        const x = sin(this.life);
        const y = cos(this.life) * this.change;
        this.pos.add(createVector(x, y));
        this.life += 0.05;
    };
}