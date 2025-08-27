const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "      0    1      ";
const fontSize = 10;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 70);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

(function initTypewriterSequence() {
    let started = false;

    function start() {
        if (started) return;
        started = true;

        const overlay = document.querySelector(".overlay");
        const title =
            document.querySelector("h1[data-text].glitch") ||
            document.querySelector("h1[data-text]") ||
            document.querySelector(".overlay h1") ||
            document.querySelector("h1");

        if (!title) return;

        if (overlay) {
            overlay.style.position = overlay.style.position || "relative";
            overlay.style.zIndex = "10";
        }
        title.style.position = "relative";
        title.style.zIndex = "11";
        title.style.opacity = "1";
        title.style.visibility = "visible";
        title.style.color = title.style.color || "red";

        const fullText =
            title.getAttribute("data-text") || title.textContent || "";
        title.classList.remove("glitch");
        title.textContent = "";

        let i = 0;
        const speed = 160;

        const interval = setInterval(() => {
            if (!document.body.contains(title)) {
                clearInterval(interval);
                return;
            }

            if (i < fullText.length) {
                title.textContent += fullText.charAt(i++);
            } else {
                clearInterval(interval);

                title.classList.add("glitch");

                if (overlay) {
                    overlay.style.zIndex = "1";
                }

                title.style.zIndex = "";
            }
        }, speed);
    }

    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(start, 0);
    } else {
        document.addEventListener("DOMContentLoaded", start, { once: true });
        window.addEventListener("load", start, { once: true });
    }
})();
