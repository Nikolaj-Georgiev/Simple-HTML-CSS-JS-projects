import { draw, remove } from "./util.js";
const btn = document.querySelector('.start')
btn.addEventListener('click', () => location.reload());
btn.disabled = true;
const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
let currentShooterIndex = 587;
let width = 25;
let invadersId;
let direction = 1;
let goingRight = true;
export let aliensRemoved = [];
let result = 0;

for (let i = 0; i < 625; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

export const squares = [...document.querySelectorAll('.grid div')];

export const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
];


draw();


squares[currentShooterIndex].classList.add('shooter');


function moveShooter(e) {

    squares[currentShooterIndex].classList.remove('shooter');
    e.key === 'ArrowLeft' ? (currentShooterIndex % width !== 0 ? currentShooterIndex -= 1 : null) : null;
    e.key === 'ArrowRight' ? (currentShooterIndex % width < width - 1 ? currentShooterIndex += 1 : null) : null;
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    btn.disabled = true;
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;

        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    draw();

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'Game Over';
        clearInterval(invadersId);
        btn.disabled = false;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length - width) {
            resultsDisplay.innerHTML = 'Game Over';
            clearInterval(invadersId);
            btn.disabled = false;
        }
    }
    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'You Win!';
        clearInterval(invadersId);
        btn.disabled = false;
    }
}

invadersId = setInterval(moveInvaders, 150);

function shoot(e) {

    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        if (currentLaserIndex > width - 1) {
            currentLaserIndex -= width;

            squares[currentLaserIndex].classList.add('laser');

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 100);
                clearInterval(laserId);
                const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
                result++;
                resultsDisplay.innerHTML = result;
                aliensRemoved.push(alienRemoved);
            }



        }
    }

    e.key === ' ' ? laserId = setInterval(moveLaser, 100) : null;
}

document.addEventListener('keydown', shoot);