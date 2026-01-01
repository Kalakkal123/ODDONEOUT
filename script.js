// script.js - The Ultimate Betrayal Engine 😈
// This thing is ALIVE, it HATES you, and it will make you question reality.
// 250+ lines of pure, concentrated chaos. Enjoy the rage!

document.addEventListener('DOMContentLoaded', () => {
    // Grab all the important victims... I mean elements
    const verification = document.getElementById('verification');
    const humanCheck = document.getElementById('human-check');
    const game = document.getElementById('game');
    const grid = document.getElementById('grid');
    const squares = document.querySelectorAll('.square');
    const submitBtn = document.getElementById('submit-btn');
    const overlay = document.getElementById('overlay');
    const cursorLight = document.getElementById('cursor-light');
    const container = document.getElementById('container');

    // Game state of pure evil
    let currentCorrect = Math.floor(Math.random() * 9) + 1;
    let rageLevel = 0;
    let darkening = false;
    let buttonFalling = false;
    let gridFading = false;
    let colorShiftInterval = null;
    let midHoverSwapInterval = null;
    let betrayalActive = false;

    // Fake "help" messages that are actually lies
    const fakeHelpMessages = [
        "You're doing great! Keep going!",
        "Almost there! Just one more click!",
        "The correct square is totally not moving!",
        "Trust me, I'm here to help 😇",
        "This game is 100% fair and balanced!",
        "No tricks here, promise!",
        "You're so close to winning!",
        "The button is right where you left it!"
    ];

    // When they tick "I'm human" → unleash hell
    humanCheck.addEventListener('change', () => {
        if (humanCheck.checked) {
            verification.classList.add('fade-out');
            setTimeout(() => {
                verification.style.display = 'none';
                game.classList.remove('hidden');
                game.classList.add('fade-in');
                startTheBetrayal();
            }, 800);
        }
    });

    // Main betrayal starter
    function startTheBetrayal() {
        betrayalActive = true;
        highlightCorrectSquare();
        startCursorLight();
        startSlowDarkening();
        startButtonTease();
        startGridFade();
        startColorShift();
        startMidHoverSwap();
        occasionalFakeHelp();
    }

    // Highlight the "correct" square (it will lie later)
    function highlightCorrectSquare() {
        squares.forEach(sq => {
            sq.classList.remove('correct');
            sq.style.backgroundColor = '';
        });
        const correctSq = document.querySelector(`.square[data-id="${currentCorrect}"]`);
        correctSq.classList.add('correct');
    }

    // Cursor light that follows like a creepy stalker
    function startCursorLight() {
        document.addEventListener('mousemove', (e) => {
            cursorLight.style.left = e.clientX + 'px';
            cursorLight.style.top = e.clientY + 'px';
        });
        cursorLight.style.opacity = '1';
    }

    // Screen slowly darkens → feels like the game is dying on you
    function startSlowDarkening() {
        setTimeout(() => {
            darkening = true;
            let opacity = 0;
            const darkenInterval = setInterval(() => {
                opacity += 0.002;
                overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
                if (opacity >= 0.7) {
                    clearInterval(darkenInterval);
                    // Brief fake "help"
                    showFakeHelp("It's getting dark... but you're still winning!");
                }
            }, 100);
        }, 8000);
    }

    // Button falls off screen like it’s committing suicide
    function startButtonTease() {
        setTimeout(() => {
            buttonFalling = true;
            submitBtn.style.transition = 'transform 4s ease-in';
            submitBtn.style.transform = 'translateY(120vh)';
            showFakeHelp("Don't worry, the button is just stretching its legs!");
        }, 12000);
    }

    // Grid slowly fades away → removes control
    function startGridFade() {
        setTimeout(() => {
            gridFading = true;
            let opacity = 1;
            const fadeInterval = setInterval(() => {
                opacity -= 0.003;
                grid.style.opacity = opacity;
                if (opacity <= 0.2) {
                    clearInterval(fadeInterval);
                    showFakeHelp("The squares are just shy, they'll come back!");
                }
            }, 150);
        }, 15000);
    }

    // Colors shift over time → nothing stays trustworthy
    function startColorShift() {
        colorShiftInterval = setInterval(() => {
            const hue = Math.floor(Math.random() * 360);
            document.body.style.backgroundColor = `hsl(${hue}, 20%, 10%)`;
            container.style.filter = `hue-rotate(${hue}deg)`;
        }, 4000);
    }

    // The ultimate betrayal: correct square changes MID-HOVER 😈
    function startMidHoverSwap() {
        squares.forEach(sq => {
            sq.addEventListener('mouseenter', () => {
                if (Math.random() < 0.4 + rageLevel * 0.1) {
                    // Swap the correct one!
                    currentCorrect = Math.floor(Math.random() * 9) + 1;
                    while (currentCorrect === parseInt(sq.dataset.id)) {
                        currentCorrect = Math.floor(Math.random() * 9) + 1;
                    }
                    highlightCorrectSquare();
                    showFakeHelp("Oops, small adjustment! You're still good!");
                    rageLevel++;
                }
            });
        });
    }

    // Occasional fake encouragement → real psychological damage
    function occasionalFakeHelp() {
        setInterval(() => {
            if (betrayalActive) {
                const msg = fakeHelpMessages[Math.floor(Math.random() * fakeHelpMessages.length)];
                showFakeHelp(msg);
            }
        }, 7000 + Math.random() * 8000);
    }

    // Display fake help as a floating toast
    function showFakeHelp(text) {
        const toast = document.createElement('div');
        toast.className = 'fake-help-toast';
        toast.textContent = text;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 4000);
    }

    // When they finally click the button (if they can catch it)
    submitBtn.addEventListener('click', () => {
        // It does NOTHING useful. Just more lies.
        showFakeHelp("Great click! Processing your victory... any century now!");
        // Reset some things to give false hope
        setTimeout(() => {
            currentCorrect = Math.floor(Math.random() * 9) + 1;
            highlightCorrectSquare();
            rageLevel = Math.max(0, rageLevel - 0.5);
        }, 2000);

        // Sometimes make the button jump away last second
        if (Math.random() < 0.3) {
            submitBtn.style.transform = 'translateX(-300px) rotate(360deg)';
            setTimeout(() => {
                submitBtn.style.transform = 'translateY(120vh)';
            }, 500);
        }
    });

    // Bonus rage: sometimes steal cursor control briefly
    setInterval(() => {
        if (Math.random() < 0.15 && betrayalActive) {
            document.body.style.cursor = 'none';
            cursorLight.style.opacity = '0.3';
            showFakeHelp("Where did your cursor go? It's playing hide and seek!");
            setTimeout(() => {
                document.body.style.cursor = 'default';
                cursorLight.style.opacity = '1';
            }, 3000);
        }
    }, 15000);

    // Extra spice: randomly shuffle square positions
    setInterval(() => {
        if (Math.random() < 0.2 && betrayalActive) {
            squares.forEach(sq => {
                const randX = Math.random() * 100 - 50;
                const randY = Math.random() * 100 - 50;
                sq.style.transform = `translate(\( {randX}px, \){randY}px) rotate(${Math.random() * 40 - 20}deg)`;
            });
            showFakeHelp("Just reorganizing for better feng shui!");
        }
    }, 18000);

    // Make the whole page slightly shake when rageLevel is high
    setInterval(() => {
        if (rageLevel > 5) {
            container.style.animation = 'rageShake 0.5s infinite';
        } else {
            container.style.animation = '';
        }
    }, 1000);

    // Final touch: after 60 seconds, pretend to crash
    setTimeout(() => {
        if (betrayalActive) {
            overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
            overlay.innerHTML = '<h1 style="color:white; text-align:center; margin-top:40vh;">FATAL ERROR: Player too angry</h1>';
            showFakeHelp("Just kidding! Or am I?");
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }, 60000);

    // You thought it was over? Nope. More betrayal layers incoming if you survive.
    console.log("The game is alive. It sees you. It hates you. Good luck, meatbag. 🐙");
});
