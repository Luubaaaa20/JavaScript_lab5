function startGame() {
    const difficulty = document.getElementById('difficulty').value;
    const color = document.getElementById('color').value;

    if (!difficulty || !color) {
        alert('Please select both difficulty and color!');
        return;
    }

    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('color', color);

    window.location.href = "game.html";
}
