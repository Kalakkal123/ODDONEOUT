/* ============================================================
   RAGE CAPTCHA — PSYCHOLOGICAL WARFARE EDITION
   Version: 3.0
   Author: You 😈
   ============================================================ */

/* ============================================================
   GLOBAL STATE
============================================================ */

let gameStarted = false;
let darkMode = false;
let rageLevel = 0;
let triesLeft = 3;
let correctIndex = 0;
let flashlightActive = false;
let lastMoveTime = Date.now();
let hoverTimeout = null;
let deceptionMode = true;
let fakeMercy = false;
let sanity = 100;
let clickHistory = [];
let rageThreshold = 6;

/* ============================================================
   DOM ELEMENTS
============================================================ */

const captchaBox = document.getElementById("captcha");
const captchaClick = document.getElementById("captchaBox");
const game = document.getElementById("game");
const grid = document.getElementById("grid");
const msg = document.getElementById("msg");
const triesText = document.getElementById("tries");
const flash = document.getElementById("flash");
const bot = document.getElementById("bot");
const easyBtn = document.getElementById("easyBtn");
const newBtn = document.getElementById("newBtn");

/* ============================================================
   INITIALIZATION
============================================================ */

captchaClick.addEventListener("click", () => {
    captchaBox.style.display = "none";
    game.style.display = "block";
    startGame();
});

/* ============================================================
   GAME START
============================================================ */

function startGame() {
    gameStarted = true;
    rageLevel = 0;
    triesLeft = 3;
    sanity = 100;
    updateTries();
    buildGrid();
    attachGlobalListeners();
}

/* ============================================================
   GRID CREATION
============================================================ */

function buildGrid() {
    grid.innerHTML = "";

    const base = rand(100, 160);
    correctIndex = rand(1, 16);

    for (let i = 1; i <= 16; i++) {
        const tile = document.createElement("div");
        tile.className = "square";
        tile.textContent = i;

        let color = `rgb(${base}, ${base}, ${base})`;

        if (i === correctIndex) {
            color = `rgb(${base + 3}, ${base + 3}, ${base + 3})`;
        }

        tile.style.background = color;

        tile.addEventListener("mouseenter", () => onHover(tile));
        tile.addEventListener("click", () => onClickTile(i, tile));

        grid.appendChild(tile);
    }
}

/* ============================================================
   TILE INTERACTION
============================================================ */

function onHover(tile) {
    if (!darkMode) return;

    if (Math.random() < 0.35) {
        tile.style.filter = "brightness(0.4)";
    }

    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        showMessage("Thinking too hard?");
    }, 1800);
}

function onClickTile(index, tile) {
    if (!gameStarted) return;

    clickHistory.push(index);
    triesLeft--;
    rageLevel++;

    updateTries();

    const isCorrect = index === correctIndex;

    if (shouldLie()) {
        lieToPlayer();
    } else {
        if (isCorrect) {
            showMessage("Correct.");
        } else {
            showMessage(randomRageLine());
        }
    }

    if (triesLeft <= 0) {
        triggerBot();
        return;
    }

    if (rageLevel > rageThreshold) {
        activatePsychologicalPressure();
    }
}

/* ============================================================
   DECEPTION SYSTEM
============================================================ */

function shouldLie() {
    if (!deceptionMode) return false;
    if (Math.random() < 0.8) return true;
    return false;
}

function lieToPlayer() {
    const lies = [
        "Almost.",
        "Nope.",
        "Wrong again.",
        "You hesitated.",
        "That felt wrong.",
        "Not quite.",
        "Too slow.",
        "Think again."
    ];

    showMessage(lies[rand(0, lies.length)]);
}

/* ============================================================
   PSYCHOLOGICAL ATTACKS
============================================================ */

function activatePsychologicalPressure() {
    if (rageLevel === 3) {
        showMessage("You're getting worse.");
    }

    if (rageLevel === 5) {
        showMessage("You were better earlier.");
    }

    if (rageLevel === 7) {
        showMessage("You're panicking.");
    }

    if (rageLevel >= 9) {
        fakeMercy = true;
        showMessage("Okay… I'll help you.");
    }
}

/* ============================================================
   MESSAGE SYSTEM
============================================================ */

function showMessage(text) {
    msg.textContent = text;
    msg.style.color = "#ff4444";
}

/* ============================================================
   EASY BUTTON TRAP
============================================================ */

easyBtn.addEventListener("click", () => {
    if (darkMode) return;

    darkMode = true;
    document.body.classList.add("dark");
    flash.classList.add("active");

    easyBtn.classList.add("fall");

    setTimeout(() => {
        easyBtn.style.display = "none";
        const evil = document.createElement("div");
        evil.className = "bwahaha";
        evil.textContent = "You trusted it.";
        document.querySelector(".controls").appendChild(evil);
    }, 1200);
});

/* ============================================================
   FLASHLIGHT TRACKING
============================================================ */

document.addEventListener("mousemove", e => {
    if (!darkMode) return;

    flash.style.background = `
        radial-gradient(
            circle 120px at ${e.clientX}px ${e.clientY}px,
            transparent 0%,
            rgba(0,0,0,0.97) 90%
        )
    `;
});

/* ============================================================
   BOT MODE
============================================================ */

function triggerBot() {
    bot.style.display = "flex";
    msg.textContent = "";

    setTimeout(() => {
        bot.innerHTML = `
            <div>
                <h1>🤖 BOT DETECTED</h1>
                <p>Human verification failed.</p>
                <p>Sanity: ${sanity}%</p>
            </div>
        `;
    }, 1000);
}

/* ============================================================
   UTILITIES
============================================================ */

function updateTries() {
    triesText.textContent = triesLeft;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* ============================================================
   RAGE MESSAGES
============================================================ */

function randomRageLine() {
    const lines = [
        "Wrong.",
        "Nope.",
        "Try again.",
        "You're rushing.",
        "Slow down.",
        "That was bad.",
        "Missed it.",
        "Not even close.",
        "You hesitated.",
        "Too confident.",
        "You blinked.",
        "You flinched.",
        "Almost… not really.",
        "Think harder.",
        "Focus."
    ];
    return lines[rand(0, lines.length)];
}

/* ============================================================
   SUBTLE SABOTAGE
============================================================ */

// Randomly change correct tile after hover
setInterval(() => {
    if (!gameStarted || !darkMode) return;
    if (Math.random() < 0.2) {
        correctIndex = rand(1, 16);
    }
}, 1200);

// Reduce sanity slowly
setInterval(() => {
    if (!gameStarted) return;
    sanity -= 1;
    if (sanity < 0) sanity = 0;
}, 2000);

/* ============================================================
   END OF FILE
============================================================ */
