// Load real remaining spots from backend
fetch("/api/spots")
  .then(res => res.json())
  .then(data => {
    if (data.remaining !== null) {
      document.getElementById("spots").innerText = data.remaining;
    }
  });

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

// Handle form submit
document.getElementById("accessForm").addEventListener("submit", async function(e) {
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
    const data = await response.json();

    if (data.remaining !== undefined) {
      document.getElementById("spots").innerText = data.remaining;
    }

    window.location.href = "https://vincerorelics.com/products/priority-drop-access";
  } else {
    alert("Something went wrong.");
  }
});
