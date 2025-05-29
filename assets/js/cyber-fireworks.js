// Cyber Fireworks Effect for Ghost Theme
// Based on the original cyber fireworks code with Ghost theme integration

let fireworks = []; // Store ascending fireworks
let particles = []; // Store explosion particles
let gravity;       // Gravity vector
let canvas;

// Configuration parameters (can be modified by theme settings)
let config = {
    launchInterval: 18,
    particleLifespan: 255,
    explosionSize: 6.5,
    particleCountBase: 28,
    particleMinSize: 7,  
    particleMaxSize: 16,
    particleShapeStrokeWeight: 1.5,
    numShapes: 5,        
    numCharTypes: 4,    
    particleRotationSpeed: 0.05,
    particleGlowBlur: 8,
    intensity: 'medium' // low, medium, high
};

// PlayStation-inspired color palette with HSB values
const psColors = [
    [0, 90, 95],    // Bright red (similar to PlayStation red)
    [55, 95, 100],  // Bright yellow (similar to PlayStation yellow)
    [170, 85, 90],  // Cyan/blue-green (similar to PlayStation cyan/green)
    [230, 85, 95]   // Blue (similar to PlayStation blue)
];

// Adjust config based on theme settings
function initializeConfig() {
    if (typeof fireworksConfig !== 'undefined') {
        if (fireworksConfig.intensity) {
            switch(fireworksConfig.intensity) {
                case 'low':
                    config.launchInterval = 25;
                    config.particleCountBase = 20;
                    config.explosionSize = 5;
                    break;
                case 'high':
                    config.launchInterval = 12;
                    config.particleCountBase = 35;
                    config.explosionSize = 8;
                    break;
                default: // medium
                    // Use default values
                    break;
            }
        }
    }
}

function setup() {
    // Create canvas and attach to the fireworks container
    const container = document.getElementById('fireworks-canvas');
    if (!container) return;
    
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(container);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
    
    colorMode(HSB, 360, 100, 100, 100);
    gravity = createVector(0, 0.15);
    background(0, 0, 0, 0); // Transparent background
    rectMode(CENTER);
    
    // Initialize configuration
    initializeConfig();
}

function draw() {
    // Clear with transparent background
    clear();
    
    // Randomly launch new fireworks based on intensity
    if (random(1) < 1 / config.launchInterval) {
        fireworks.push(new Firework());
    }

    // Update and display ascending fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].shouldExplode()) {
            const explosionPos = fireworks[i].pos.copy();
            const fireworkColor = fireworks[i].color;
            const shapeType = floor(random(config.numShapes));
            explode(explosionPos, fireworkColor, shapeType);
            fireworks.splice(i, 1);
        } else if (fireworks[i].isOffScreen()) {
            fireworks.splice(i, 1);
        }
    }

    // Update and display explosion particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].applyForce(gravity);
        particles[i].update();
        particles[i].show();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}

// Explosion function
function explode(pos, baseColor, shapeType) {
    const numParticles = config.particleCountBase + floor(random(-5, 8));
    const baseHue = baseColor[0];
    const baseSat = baseColor[1];
    const baseBri = baseColor[2];

    for (let i = 0; i < numParticles; i++) {
        let angle, particleVel;
        const particleColor = [
            (baseHue + random(-12, 12) + 360) % 360,
            constrain(baseSat + random(-15, 10), 65, 100),
            constrain(baseBri + random(-10, 5), 80, 100)  
        ];
        let speedMult = random(0.7, 1.5);
        const charType = floor(random(config.numCharTypes));

        switch (shapeType) {
            case 0: // Circle
                angle = random(TWO_PI);
                particleVel = p5.Vector.fromAngle(angle);
                particleVel.mult(speedMult * config.explosionSize * random(0.8, 1.2));
                break;
            case 1: // Cross
                const axis = floor(random(4));
                angle = axis * HALF_PI;
                particleVel = p5.Vector.fromAngle(angle);
                particleVel.mult(speedMult * config.explosionSize * 1.3 * random(0.8, 1.1));
                particleVel.rotate(random(-PI / 10, PI / 10));
                break;
            case 2: // Triangle
                const side = floor(random(3));
                angle = side * TWO_PI / 3 + PI / 2;
                particleVel = p5.Vector.fromAngle(angle + random(-PI/4.5, PI/4.5));
                particleVel.mult(speedMult * config.explosionSize * 1.1 * random(0.8, 1.1));
                break;
            case 3: // Square
                const squareSide = floor(random(4));
                if (random(1) < 0.5) {
                    angle = squareSide * HALF_PI + PI / 4;
                    particleVel = p5.Vector.fromAngle(angle);
                    particleVel.mult(speedMult * config.explosionSize * 1.4 * random(0.8, 1.1));
                } else {
                    angle = squareSide * HALF_PI;
                    particleVel = p5.Vector.fromAngle(angle);
                    particleVel.mult(speedMult * config.explosionSize * random(0.8, 1.1));
                    particleVel.rotate(random(-PI/7, PI/7));
                }
                break;
            case 4: // Star
                const pointIndex = floor(random(5));
                angle = pointIndex * TWO_PI / 5 - PI / 2;
                particleVel = p5.Vector.fromAngle(angle);
                particleVel.rotate(random(-PI / 4.5, PI / 4.5));
                particleVel.mult(speedMult * config.explosionSize * 1.6 * random(0.7, 1.2));
                if (random(1) < 0.25) {
                    angle += PI / 5;
                    particleVel = p5.Vector.fromAngle(angle);
                    particleVel.mult(speedMult * config.explosionSize * 0.6 * random(0.7, 1.1));
                }
                break;
        }
        particles.push(new Particle(pos.x, pos.y, particleVel, particleColor, charType));
    }
}

// Firework class (ascending fireworks)
class Firework {
    constructor() {
        this.pos = createVector(random(width * 0.3, width * 0.7), height);
        // Reduced initial upward speed for lower explosion height
        this.vel = createVector(random(-0.7, 0.7), random(-height * 0.014, -height * 0.010));
        this.acc = createVector(0, 0);
        this.exploded = false;
        this.color = random(psColors);
    }

    applyForce(force) { 
        this.acc.add(force); 
    }

    update() {
        if (!this.exploded) {
            this.applyForce(gravity.copy().mult(0.75));
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    show() {
        if (!this.exploded) {
            push();
            let trailColor = color(this.color[0], this.color[1], this.color[2], 50);
            stroke(trailColor);
            strokeWeight(5);
            point(this.pos.x - this.vel.x*2, this.pos.y - this.vel.y*2);
            stroke(this.color[0], this.color[1], this.color[2]);
            strokeWeight(3.5);
            point(this.pos.x, this.pos.y);
            pop();
        }
    }

    // Modified: Adjust explosion conditions for earlier explosion
    shouldExplode() { 
        return (this.vel.y >= -0.1 && !this.exploded); 
    }
    
    isOffScreen() { 
        return (this.pos.y > height + 20 || this.pos.y < -20); 
    }
}

// Particle class (explosion particles)
class Particle {
    constructor(x, y, vel, color, charType) {
        this.pos = createVector(x, y);
        this.vel = vel.copy();
        this.acc = createVector(0, 0);
        this.lifespan = config.particleLifespan + random(-60, 60);
        this.baseLifespan = this.lifespan;
        this.color = color;
        this.charType = charType;
        this.angle = random(TWO_PI);
        this.rotation = random(-config.particleRotationSpeed, config.particleRotationSpeed) * (random(1) < 0.5 ? 1 : -1);
    }

    applyForce(force) { 
        this.acc.add(force); 
    }

    update() {
        this.vel.mult(0.975);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= 2.5;
        this.angle += this.rotation;
    }

    show() {
        let sizeProgress = this.lifespan / this.baseLifespan;
        let currentSize = config.particleMinSize + (config.particleMaxSize - config.particleMinSize) * pow(sizeProgress, 0.5);
        currentSize = max(currentSize, config.particleMinSize * 0.5);

        const alpha = map(this.lifespan, 0, this.baseLifespan, 0, 100);
       
        drawingContext.shadowBlur = config.particleGlowBlur * (alpha / 100);
        drawingContext.shadowColor = color(this.color[0], this.color[1], 100, 50);

        stroke(this.color[0], this.color[1], this.color[2], alpha);
        strokeWeight(config.particleShapeStrokeWeight);
        noFill();

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
       
        switch (this.charType) {
            case 0: // Plus (+)
                let plusSize = currentSize * 0.6;
                line(-plusSize / 2, 0, plusSize / 2, 0);
                line(0, -plusSize / 2, 0, plusSize / 2);
                break;
            case 1: // Hollow triangle (△)
                let triSize = currentSize * 0.7;
                let triH = triSize * (sqrt(3)/2);
                triangle(0, -triH / 2, -triSize / 2, triH / 2, triSize / 2, triH / 2);
                break;
            case 2: // Hollow square (□)
                let sqSize = currentSize * 0.7;
                square(0, 0, sqSize);
                break;
            case 3: // Hollow circle (○)
                let circSize = currentSize * 0.8;
                ellipse(0, 0, circSize, circSize);
                break;
        }
        pop();

        drawingContext.shadowBlur = 0;
    }

    isFinished() { 
        return this.lifespan <= 0; 
    }
}

// Handle window resize
function windowResized() {
    if (canvas) {
        resizeCanvas(windowWidth, windowHeight);
        background(0, 0, 0, 0);
        fireworks = [];
        particles = [];
        rectMode(CENTER);
    }
}

// Performance optimization: Limit maximum particles
function limitParticles() {
    const maxParticles = 300;
    if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
    }
}

// Call limit function periodically
setInterval(limitParticles, 1000);

// Pause fireworks when page is not visible (performance optimization)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        noLoop();
    } else {
        loop();
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if fireworks should be enabled
    const fireworksContainer = document.getElementById('fireworks-canvas');
    if (fireworksContainer) {
        // p5.js will call setup() automatically
        console.log('Cyber fireworks initialized');
    }
}); 