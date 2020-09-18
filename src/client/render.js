import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

// This stuff isn't going to be constant, but for now...
const Constants = require('../shared/constants');

const {
  PLAYER_RADIUS,
  PLAYER_MAX_HP,
  BULLET_RADIUS,
  MAP_SIZE,
} = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets } = getCurrentState();
  if (!me) {
    return;
  }

  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // Draw all bullets
  bullets.forEach(renderBullet.bind(null, me));

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
      backgroundX,
      backgroundY,
      MAP_SIZE / 10,
      backgroundX,
      backgroundY,
      MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'black');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  let canvasX = canvas.width / 2 + x - me.x;
  let canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  const shipW = 76;
  const shipH = 110;
  context.drawImage(getAsset('ship.png'), -1 * shipW / 2, -1 * shipH / 2, shipW, shipH);

  // draw a dot red square at the player's x,y
  context.fillStyle = 'red';
  context.fillRect(0, 0, 4, 4);
  context.restore();

  // Draw health bar
  context.fillStyle = 'white';
  context.fillRect(
      canvasX - PLAYER_RADIUS,
      canvasY + 55,
      PLAYER_RADIUS * 2,
      2,
  );
  context.fillStyle = 'red';
  context.fillRect(
      canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
      canvasY + PLAYER_RADIUS + 8,
      PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
      2,
  );
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
      getAsset('bullet.svg'),
      canvas.width / 2 + x - me.x - BULLET_RADIUS,
      canvas.height / 2 + y - me.y - BULLET_RADIUS,
      BULLET_RADIUS * 5,
      BULLET_RADIUS * 5,
  );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
