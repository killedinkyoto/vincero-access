// Dynamic scarcity
let spots = Math.floor(Math.random() * 40) + 120;
document.getElementById("spots").innerText = spots;

setInterval(() => {
    if (spots > 12) {
        spots--;
        document.getElementById("spots").innerText = spots;
    }
}, 15000);

// Particle background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
    });
    requestAnimationFrame(animate);
}
animate();

// Form submit
document.getElementById("accessForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;

    const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    if (response.ok) {
        window.location.href = "https://vincerorelics.com/products/priority-drop-access";
    } else {
        alert("Something went wrong.");
    }
});


