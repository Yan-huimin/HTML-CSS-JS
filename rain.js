const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const rainDrops = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 5 + 2,
    length: Math.random() * 20 + 10,
    opacity: Math.random() * 0.5 + 0.3,
    width: Math.random() * 2 + 1,
}));

const ripples = [];
function addRipple(x, y) {
    ripples.push({ x, y, radius: 0, opacity: 0.5 });
}

function drawRipples() {
    ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ripple.radius += 1;
        ripple.opacity -= 0.02;

        if (ripple.opacity <= 0) {
            ripples.splice(index, 1);
        }
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rainDrops.forEach((drop) => {
        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${drop.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = drop.width;

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
            addRipple(drop.x, canvas.height);
        }
    });
}

function drawLightning() {
    if (Math.random() < 0.01) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function animateRain() {
    drawRain();
    drawRipples();
    drawLightning();
    requestAnimationFrame(animateRain);
}
animateRain();
