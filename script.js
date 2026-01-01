/* =========================================================
   HUMAN VERIFICATION GAME — UNHINGED EDITION
   Author: You 😈
   Version: 2.0 (Evil Build)
   ========================================================= */

class ColorGame {
    constructor() {
        // UI Elements
        this.initialCaptcha = document.getElementById("initialCaptcha");
        this.captchaCheckbox = document.getElementById("captchaCheckbox");
        this.checkbox = this.captchaCheckbox.querySelector(".checkbox");

        this.container = document.querySelector(".container");
        this.grid = document.getElementById("grid");
        this.message = document.getElementById("message");
        this.triesElement = document.getElementById("tries");

        this.newButton = document.getElementById("new");
        this.easierButton = document.getElementById("easier");

        this.botPopup = document.getElementById("botPopup");
        this.flashlightOverlay = document.getElementById("flashlightOverlay");

        // Game State
        this.verified = false;
        this.gameOver = false;
        this.darkMode = false;
        this.lightsGone = false;

        this.level = 1;
        this.triesLeft = 3;
        this.correctIndex = 0;

        this.baseColor = "";
        this.differentColor = "";

        this.sanity = 100;

        this.taunts = [
            "Nice try, robot.",
            "You sure about that?",
            "Interesting… but wrong.",
            "Humans usually fail here.",
            "You hesitated. Suspicious.",
            "That was… embarrassing.",
            "Try using your eyes.",
            "This is getting sad.",
            "Even AI would do better."
        ];

        this.init();
    }

    /* ==========================
       INIT
    ========================== */
    init() {
        this.setupCaptcha();
    }

    setupCaptcha() {
        this.captchaCheckbox.addEventListener("click", () => {
            if (this.verified) return;

            this.checkbox.classList.add("loading");
            this.captchaCheckbox.style.pointerEvents = "none";

            setTimeout(() => {
                this.initialCaptcha.style.display = "none";
                this.container.style.display = "block";
                this.verified = true;
                this.startGame();
            }, 900);
        });
    }

    /* ==========================
       GAME START
    ========================== */
    startGame() {
        this.newButton.onclick = () => this.resetGame();
        this.easierButton.onclick = () => this.activateDarkMode();

        this.setupFlashlight();
        this.buildGrid();
    }

    /* ==========================
       GRID LOGIC
    ========================== */
    buildGrid() {
        if (this.gameOver) return;

        this.grid.innerHTML = "";
        this.message.textContent = "Find the odd one.";
        this.message.style.color = "#aaa";

        this.triesElement.textContent = this.triesLeft;

        const size = 4;
        const total = size * size;

        const baseR = this.rand(90, 160);
        const baseG = this.rand(90, 160);
        const baseB = this.rand(90, 160);

        this.baseColor = `rgb(${baseR}, ${baseG}, ${baseB})`;

        const diff = Math.random() > 0.5 ? 3 : -3;
        const channel = this.rand(0, 3);

        let dr = baseR;
        let dg = baseG;
        let db = baseB;

        if (channel === 0) dr += diff;
        if (channel === 1) dg += diff;
        if (channel === 2) db += diff;

        this.differentColor = `rgb(${dr}, ${dg}, ${db})`;

        // EVIL LOGIC: only even numbers
        const evilSlots = [2, 4, 6, 8, 10, 12, 14, 16];
        this.correctIndex = evilSlots[Math.floor(Math.random() * evilSlots.length)];

        for (let i = 1; i <= total; i++) {
            const tile = document.createElement("div");
            tile.className = "square";
            tile.textContent = i;

            tile.style.background =
                i === this.correctIndex
                    ? this.differentColor
                    : this.baseColor;

            tile.onclick = () => this.handleClick(i, tile);

            this.grid.appendChild(tile);
        }
    }

    /* ==========================
       CLICK HANDLER
    ========================== */
    handleClick(index, tile) {
        if (this.gameOver) return;

        this.triesLeft--;
        this.triesElement.textContent = this.triesLeft;

        const lie = Math.random() < 0.9;

        if (index === this.correctIndex && !lie) {
            this.message.textContent = "Hmm… lucky guess.";
            this.level++;
            this.buildGrid();
            return;
        }

        this.message.textContent =
            this.taunts[Math.floor(Math.random() * this.taunts.length)];

        this.message.style.color = "#ff5555";
        tile.style.border = "2px solid red";

        this.sanity -= 10;

        if (this.triesLeft <= 0) {
            this.triggerBot();
        }
    }

    /* ==========================
       DARK MODE
    ========================== */
    activateDarkMode() {
        if (this.lightsGone) return;

        this.lightsGone = true;
        this.darkMode = true;

        document.body.classList.add("dark-mode");
        this.flashlightOverlay.classList.add("active");

        this.easierButton.textContent = "…";
        this.easierButton.disabled = true;

        setTimeout(() => {
            const evil = document.createElement("div");
            evil.textContent = "bwahahaha.";
            evil.style.color = "red";
            evil.style.textAlign = "center";
            evil.style.marginTop = "10px";
            this.easierButton.parentNode.appendChild(evil);
        }, 1200);
    }

    setupFlashlight() {
        document.addEventListener("mousemove", e => {
            if (!this.darkMode) return;

            this.flashlightOverlay.style.background = `
                radial-gradient(
                    circle 120px at ${e.clientX}px ${e.clientY}px,
                    transparent 0%,
                    rgba(0,0,0,0.97) 80%
                )
            `;
        });
    }

    /* ==========================
       BOT MODE
    ========================== */
    triggerBot() {
        this.gameOver = true;
        this.botPopup.style.display = "flex";

        const squares = document.querySelectorAll(".square");
        squares.forEach(s => {
            s.style.pointerEvents = "none";
            s.style.opacity = "0.6";
        });

        this.newButton.disabled = true;
        this.easierButton.disabled = true;

        setTimeout(() => {
            this.botPopup.innerHTML = `
                <div style="text-align:center">
                    <h1>🤖 BOT CONFIRMED</h1>
                    <p>Human verification failed.</p>
                    <p>Sanity Level: ${this.sanity}%</p>
                </div>
            `;
        }, 1000);
    }

    /* ==========================
       RESET
    ========================== */
    resetGame() {
        this.level = 1;
        this.triesLeft = 3;
        this.gameOver = false;
        this.sanity = 100;

        this.botPopup.style.display = "none";

        this.buildGrid();
    }

    /* ==========================
       UTILS
    ========================== */
    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

/* ==========================
   START THE CHAOS
========================== */
new ColorGame();
