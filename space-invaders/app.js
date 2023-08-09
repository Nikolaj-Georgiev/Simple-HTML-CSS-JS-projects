import { draw, remove } from "./util.js";
const btn = document.querySelector('.start')
btn.addEventListener('click', () => location.reload());
btn.disabled = true;
const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
let currentShooterIndex = 202;
let width = 15;
let invadersId;
let direction = 1;
let goingRight = true;
export let aliensRemoved = [];
let result = 0;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

export const squares = [...document.querySelectorAll('.grid div')];

export const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
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