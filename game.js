const difficulty = localStorage.getItem('difficulty');
const color = localStorage.getItem('color');

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let score = 0;
let timeoutId;

const settings = {
    lazy: { size: 100, time: 2000 },
    normal: { size: 70, time: 1300 },
    hard: { size: 40, time: 800 }
};

const { size, time } = settings[difficulty];

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
    }, time);
}

function endGame() {
    gameArea.innerHTML = '';
    messageDisplay.innerHTML = `<h2>Game Over!</h2><p>Your score: ${score}</p><p>Refresh the page to play again.</p>`;
}

spawnSquare();
