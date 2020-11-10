import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';
import { updateHUD } from './hud';

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

  updateHUD({ gold: me.gold, speed: me.speed, x: me.x, y: me.y });

  // Draw background
  renderBackground();

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

function renderBackground() {
  context.fillStyle = '#3f93fe';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { shipH, shipW, x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(getAsset('basic-ship.png'), -1 * shipW / 2, -1 * shipH / 2, shipW, shipH);

  // Draw a dot red square at the player's x,y
  context.fillStyle = 'red';
  context.fillRect(0, 0, 4, 4);
  context.restore();

  // Draw health bar, a solid white rectangle
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + 10 + (shipH / 2),
    PLAYER_RADIUS * 2,
    10,
  );
  // Draw the health lost bar, overlaps health bar
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + 10 + (shipH / 2),
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    10,
  );
  // Draw text for the player's hp, inside health bar
  context.fillStyle = 'black';
  context.font = '10px Georgia';
  context.textAlign = 'center';
  context.fillText(
    `${Math.floor(player.hp)}/100`,
    canvasX,
    canvasY + 92.5,
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
  renderBackground();
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
