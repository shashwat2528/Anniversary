// Initialize fireworks using the fireworks.js library
const fireworks = new Fireworks.default({
    selector: '.fireworks', // The class where fireworks will display
    speed: 3, // Control speed of the animation
    density: 50, // Control density of fireworks
    friction: 0.98, // Control the natural decay of fireworks
    opacity: 0.6, // Set opacity of the fireworks
    trail: true // If you want a trailing effect
});

// Start the fireworks when the page loads
window.onload = () => {
    fireworks.start();
};
