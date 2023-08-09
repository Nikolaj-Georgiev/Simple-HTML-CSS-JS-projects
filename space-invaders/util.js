import { alienInvaders, aliensRemoved, squares } from "./app.js";

export function draw() {
    alienInvaders?.forEach((alien, i) => !aliensRemoved.includes(i) ? squares[alien]?.classList.add('invader') : null);
}

export function remove() {
    alienInvaders?.forEach((alien) => squares[alien]?.classList.remove('invader'));
}