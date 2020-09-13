// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';
import { shootCannons } from './networking';

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

/* Listen for key presses and maintain state of what keys are currently pressed */

let keysPressed = {};

function onKeyDown(event) {
  keysPressed[event.key] = true;

  if (event.key == 'a' || event.key == 'd' ) {
    updateDirection([ (keysPressed.a ? 1 : 0) , (keysPressed.d ? 1 : 0) ]);
  }

  if (event.key == 'q' || event.key == 'e') {
    shootCannons(event.key == 'q' ? -1 : 1);
  }
}

function onKeyUp(event) {
  delete keysPressed[event.key];

  if (event.key == 'a' || event.key == 'd') {
    updateDirection([ (keysPressed.a ? 1 : 0) , (keysPressed.d ? 1 : 0) ]);
  }
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  shootCannons(dir)
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  // window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)

  // window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);

}
