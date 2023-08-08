const dice = document.getElementById('dice');
const rollHistory = document.getElementById('roll-history');

let historyList = [];
const diceFaces = {
    '1': '&#9856;',
    '2': '&#9857;',
    '3': '&#9858;',
    '4': '&#9859;',
    '5': '&#9860;',
    '6': '&#9861;'
}

const getDiceFace = (number) => diceFaces[number];
const rollDice = () => {
    const rollResult = Math.floor(Math.random() * 6) + 1;
    const diceFace = getDiceFace(rollResult);
    dice.innerHTML = diceFace;
    historyList.push(rollResult);
    updateRollHistory();
}

document.getElementById('roll-button').addEventListener('click', () => {
    dice.classList.add('roll-animation');
    setTimeout(() => {
        dice.classList.remove('roll-animation');
        rollDice()
    }, 1000)
});

function updateRollHistory() {
    rollHistory.innerHTML = '';
    historyList.forEach((x, i) => {
        const li = document.createElement('li');
        li.innerHTML = `Roll ${i + 1} <span>${getDiceFace(x)}</span>`;
        rollHistory.appendChild(li);
    })
}