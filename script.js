// script.js — Psychological Warfare Engine 🧠😈
// This version ACTUALLY MATCHES THE NEW HTML.
// It watches you. It adapts. It lies professionally.

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const screens = {
        intro: document.getElementById("screen-intro"),
        consent: document.getElementById("screen-consent"),
        game: document.getElementById("screen-game"),
        result: document.getElementById("screen-result")
    };

    const startBtn = document.getElementById("start-test");
    const continueBtn = document.getElementById("continue-test");
    const retryBtn = document.getElementById("retry");

    const options = document.querySelectorAll(".option");
    const confirmBtn = document.getElementById("confirm-choice");

    const roundLabel = document.getElementById("round-label");
    const instructionText = document.getElementById("instruction-text");
    const statusText = document.getElementById("status-text");

    const cursorOrb = document.getElementById("cursor-orb");

    const consentChecks = [
        document.getElementById("consent-focus"),
        document.getElementById("consent-patience"),
        document.getElementById("consent-emotion")
    ];

    /* ================= STATE ================= */

    let round = 1;
    let rage = 0;
    let selected = null;
    let correct = randomChoice();
    let betrayalLevel = 0;
    let gameActive = false;

    /* ================= SCREEN CONTROL ================= */

    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove("active"));
        screens[name].classList.add("active");
    }

    /* ================= INTRO ================= */

    startBtn.addEventListener("click", () => {
        showScreen("consent");
    });

    continueBtn.addEventListener("click", () => {
        if (consentChecks.some(c => !c.checked)) {
            flashStatus("Please read carefully.", true);
            rage++;
            return;
        }
        showScreen("game");
        startGame();
    });

    /* ================= GAME ================= */

    function startGame() {
        gameActive = true;
        updateRound();
        startCursorStalker();
        startPassiveGaslighting();
    }

    function updateRound() {
        roundLabel.textContent = `Round ${round}`;
        instructionText.textContent = "Select the correct option.";
        statusText.textContent = "Awaiting decision…";
    }

    options.forEach(btn => {
        btn.addEventListener("click", () => {
            options.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selected = btn.dataset.choice;
            statusText.textContent = "Selection registered.";
        });

        // Mid-hover betrayal
        btn.addEventListener("mouseenter", () => {
            if (Math.random() < 0.25 + betrayalLevel * 0.1) {
                correct = randomChoice();
                rage++;
                betrayalLevel++;
                flashStatus("Minor recalibration applied.", true);
            }
        });
    });

    confirmBtn.addEventListener("click", () => {
        if (!selected) {
            flashStatus("No option selected.", true);
            rage++;
            return;
        }

        if (selected === correct) {
            flashStatus("Correct. Performance acceptable.");
            rage = Math.max(0, rage - 1);
        } else {
            flashStatus("Incorrect. Try focusing.", true);
            rage++;
        }

        round++;
        betrayalLevel += 0.3;
        selected = null;
        correct = randomChoice();
        options.forEach(b => b.classList.remove("selected"));

        if (round > 8) endGame();
        else updateRound();
    });

    /* ================= END ================= */

    function endGame() {
        gameActive = false;
        showScreen("result");

        const summary = document.getElementById("result-summary");
        summary.textContent =
            rage > 6
                ? "Emotional instability detected."
                : "Results inconclusive.";

    }

    retryBtn?.addEventListener("click", () => location.reload());

    /* ================= EFFECTS ================= */

    function flashStatus(text, negative = false) {
        statusText.textContent = text;
        statusText.classList.toggle("bad", negative);
        setTimeout(() => statusText.classList.remove("bad"), 800);
    }

    function startCursorStalker() {
        document.addEventListener("mousemove", e => {
            cursorOrb.style.left = e.clientX + "px";
            cursorOrb.style.top = e.clientY + "px";
        });
    }

    function startPassiveGaslighting() {
        setInterval(() => {
            if (!gameActive) return;

            if (rage > 4 && Math.random() < 0.4) {
                instructionText.textContent = "You are overthinking.";
            }

            if (Math.random() < 0.2) {
                instructionText.textContent = "This should be easy.";
            }
        }, 5000);
    }

    /* ================= UTILS ================= */

    function randomChoice() {
        return String(Math.floor(Math.random() * 9) + 1);
    }

    console.log(
        "%cTrust Test initialized.\nYour behavior is being observed.",
        "color:#ff5e7a;font-size:12px"
    );
});
