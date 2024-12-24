// Get the canvas element and its drawing context
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

// Set the canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star class to create a star object with position and size
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2; // Random star size
        this.alpha = Math.random() * 0.5 + 0.3; // Random opacity for stars to give a twinkling effect
    }

    // Draw the star on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // White with some transparency
        ctx.fill();
    }
}

// Create a collection of stars
let stars = [];
for (let i = 0; i < 150; i++) {
    stars.push(new Star());
}

// Function to draw the moon
function drawMoon() {
    const moonRadius = 50; // Radius of the moon
    const moonX = 100;     // X position of the moon
    const moonY = 100;     // Y position of the moon
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // Light white color for moon
    ctx.fill();
    ctx.stroke();
}

// Define the Particle class for the explosion particles
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Increased initial velocity for faster movement of particles
        this.velocity = {
            x: (Math.random() - 0.5) * 12, // Faster horizontal movement
            y: (Math.random() - 0.5) * 12  // Faster vertical movement
        };
        this.alpha = 1; // Opacity of the particle
        this.friction = 0.98; // Friction to slow down particles
    }

    // Draw a particle on the canvas
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update the particle position and opacity
    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015; // Fade out the particle faster for quicker explosions
    }
}

// Define the Firework class for the rockets
class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Increased initial upward velocity for faster ascent
        this.velocity = {x: 0, y: Math.random() * -3 - 1};  // Faster upward movement
        this.particles = []; // Particles for explosion
        this.lifespan = 120; // Shortened lifespan for quicker explosion
        this.hasExploded = false; // Track if the firework has exploded
    }

    // Draw the firework rocket on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Create particles for explosion
    explode() {
        for (let i = 0; i < 70; i++) { // Increased number of particles for more intensity
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    // Update the firework position, check for explosion
    update() {
        this.lifespan--;

        // Check if the firework should explode
        if (this.lifespan <= 0 && !this.hasExploded) {
            this.explode();
            this.velocity = {x: 0, y: 0};
            this.hasExploded = true;
        } else if (this.lifespan > 0) {
            this.y += this.velocity.y; // Move the firework upwards
        }

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}

// Array to store the fireworks
let fireworks = [];

// Function to animate the fireworks
function animate() {
    // Request the next animation frame
    requestAnimationFrame(animate);

    // Clear the canvas and create a trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the stars on the background
    stars.forEach(star => {
        star.draw();
    });

    // Draw the moon in the top left corner
    drawMoon();

    // Update and draw each firework
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        // Remove fireworks that have finished exploding
        if (firework.lifespan <= 0 && firework.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    // Occasionally create a new firework
    if (Math.random() < 0.02) {  // More frequent firework generation for higher intensity
        const x = Math.random() * canvas.width;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        fireworks.push(new Firework(x, canvas.height, color));
    }
}

// Start the animation
animate();

// Handle forgiveness actions
function forgiveMe() {
    document.getElementById("love-message").style.display = "block";
    document.getElementById("apology-section").style.display = "none";
}

function dontForgive() {
    alert("I understand. I’ll work hard to earn your forgiveness.");
}
