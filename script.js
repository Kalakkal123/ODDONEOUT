/* ============================================================
   BEHAVIOR MIRROR — FINAL YEAR PROJECT
   Author: You
   Purpose: Study frustration, attention & reaction behavior
   ============================================================ */

/* ============================================================
   GLOBAL STATE
============================================================ */

let state = {
    started: false,
    darkMode: false,
    attempts: 0,
    correctIndex: 0,
    focus: 100,
    rage: 0,
    score: 0,
    clicks: [],
    lastClickTime: Date.now(),
    hesitationCount: 0,
    speedMistakes: 0,
    confidenceDrops: 0,
    fakeSkill: 100,
    level: 1,
    sessionTime: Date.now()
};

/* ============================================================
   DOM ELEMENTS
============================================================ */

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

init();

function init() {
    log("Session started");
    buildGrid();
    attachEvents();
    updateUI();
}

/* ============================================================
   GRID GENERATION
============================================================ */

function buildGrid() {
    grid.innerHTML = "";

    const base = rand(110, 170);
    state.correctIndex = rand(0, 15);

    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.className = "square";

        const color =
            i === state.correctIndex
                ? `rgb(${base + 3}, ${base + 3}, ${base + 3})`
                : `rgb(${base}, ${base}, ${base})`;

        tile.style.background = color;
        tile.dataset.index = i;

        tile.onclick = () => handleClick(i);
        tile.onmouseenter = () => handleHover();

        grid.appendChild(tile);
    }
}

/* ============================================================
   EVENT HANDLING
============================================================ */

function attachEvents() {
    document.addEventListener("mousemove", handleMouseMove);

    easyBtn.addEventListener("click", activateDarkMode);
    newBtn.addEventListener("click", resetGame);
}

/* ============================================================
   CLICK LOGIC
============================================================ */

function handleClick(index) {
    const now = Date.now();
    const delta = now - state.lastClickTime;
    state.lastClickTime = now;

    state.clicks.push(delta);
    state.attempts++;

    analyzeBehavior(delta);

    const isCorrect = index === state.correctIndex;

    if (shouldLie()) {
        showMessage(randomFailMessage());
        applyPenalty();
    } else {
        if (isCorrect) {
            showMessage("Correct.");
            state.score++;
        } else {
            showMessage(randomFailMessage());
        }
    }

    updateStats();
    checkEndCondition();
    rebuildWithChaos();
}

/* ============================================================
   BEHAVIOR ANALYSIS
============================================================ */

function analyzeBehavior(delta) {
    if (delta < 200) {
        state.speedMistakes++;
        state.rage += 2;
    }

    if (delta > 1500) {
        state.hesitationCount++;
        state.rage += 1;
    }

    if (state.attempts % 5 === 0) {
        state.confidenceDrops++;
    }
}

/* ============================================================
   DECEPTION SYSTEM
============================================================ */

function shouldLie() {
    let chance = 0.7;

    if (state.rage > 5) chance = 0.85;
    if (state.focus < 40) chance = 0.9;

    return Math.random() < chance;
}

/* ============================================================
   RAGE MECHANICS
============================================================ */

function applyPenalty() {
    state.focus -= rand(2, 6);
    state.fakeSkill -= rand(3, 7);

    if (state.focus < 0) state.focus = 0;
    if (state.fakeSkill < 0) state.fakeSkill = 0;
}

/* ============================================================
   FEEDBACK SYSTEM
============================================================ */

function showMessage(text) {
    msg.textContent = text;
}

function randomFailMessage() {
    const messages = [
        "Too slow.",
        "Wrong.",
        "Try again.",
        "That wasn’t it.",
        "Almost.",
        "You hesitated.",
        "Not quite.",
        "Focus.",
        "Overthinking.",
        "You rushed.",
        "Still wrong.",
        "Missed it.",
        "Think again.",
        "That felt off.",
        "Nope.",
        "You blinked.",
        "Try harder."
    ];
    return messages[rand(0, messages.length)];
}

/* ============================================================
   DARK MODE TRAP
============================================================ */

function activateDarkMode() {
    if (state.darkMode) return;

    state.darkMode = true;
    document.body.classList.add("dark");
    flash.classList.add("active");

    easyBtn.classList.add("fall");

    setTimeout(() => {
        easyBtn.style.display = "none";
        const t = document.createElement("div");
        t.textContent = "It doesn’t get easier.";
        t.className = "bwahaha";
        document.querySelector(".controls").appendChild(t);
    }, 1200);
}

/* ============================================================
   FLASHLIGHT
============================================================ */

function handleMouseMove(e) {
    if (!state.darkMode) return;

    flash.style.background = `
        radial-gradient(
            circle 120px at ${e.clientX}px ${e.clientY}px,
            transparent 0%,
            rgba(0,0,0,0.95) 90%
        )
    `;
}

/* ============================================================
   PROGRESSION & ADAPTATION
============================================================ */

function rebuildWithChaos() {
    if (state.attempts % 3 === 0) {
        state.correctIndex = rand(0, 15);
    }

    if (state.attempts % 5 === 0) {
        buildGrid();
    }
}

/* ============================================================
   END CONDITIONS
============================================================ */

function checkEndCondition() {
    if (state.focus <= 0) {
        showEndScreen();
    }
}

/* ============================================================
   END SCREEN
============================================================ */

function showEndScreen() {
    bot.style.display = "flex";
    bot.innerHTML = `
        <div>
            <h2>Session Complete</h2>
            <p>Focus: ${state.focus}</p>
            <p>Rage Level: ${state.rage}</p>
            <p>Clicks: ${state.attempts}</p>
            <p>Behavior Logged</p>
        </div>
    `;
}

/* ============================================================
   RESET
============================================================ */

function resetGame() {
    location.reload();
}

/* ============================================================
   UTILITIES
============================================================ */

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function log(msg) {
    console.log("[Behavior Mirror]", msg);
}
