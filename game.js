if (!localStorage.getItem('difficulty') || !localStorage.getItem('color')) {
    window.location.href = 'index.html';
}

const difficulty = localStorage.getItem('difficulty');
const color = localStorage.getItem('color');

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const overlay = document.getElementById('overlay');
const finalScoreEl = document.getElementById('finalScore');
const okButton = document.getElementById('okButton');

let score = 0;
let timeLeft = 30;
let timeoutId;

// Level settings
const settings = {
    easy:   { size: 120, squareTime: 2200 },
    medium: { size: 80,  squareTime: 1500 },
    hard:   { size: 50,  squareTime: 900  },
    insane: { size: 30,  squareTime: 600  }
};

const { size, squareTime } = settings[difficulty];

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function spawnSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;

    square.style.left = Math.random() * maxX + 'px';
    square.style.top = Math.random() * maxY + 'px';

    square.onclick = () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        clearTimeout(timeoutId);
        square.remove();
        spawnSquare();
    };

    gameArea.appendChild(square);

    timeoutId = setTimeout(() => {
        endGame();
    }, squareTime);
}

function endGame() {
    clearTimeout(timeoutId);
    gameArea.innerHTML = '';
    finalScoreEl.textContent = score;
    overlay.classList.remove('hidden');
    okButton.onclick = () => {
        overlay.classList.add('hidden');
    };
}

// Start game
startTimer();
spawnSquare();
