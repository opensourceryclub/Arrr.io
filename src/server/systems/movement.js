// Handle movement for all entites with position and path components

const Constants = require('../../shared/constants');

function updateBulletPositions(dt, bullets) {
  bullets.forEach(bullet => {
    bullet.x += dt * bullet.speed * Math.sin(bullet.direction);
    bullet.y -= dt * bullet.speed * Math.cos(bullet.direction);
    bullet.hitbox.x = bullet.x;
    bullet.hitbox.y = bullet.y;
  });
}

function updatePlayerPositions(dt, players) {
  Object.keys(players).forEach(playerId => {
    const player = players[playerId];
    player.fireCooldown -= dt;
    player.x += dt * player.speed * Math.sin(player.direction);
    player.y -= dt * player.speed * Math.cos(player.direction);
    player.hitbox.x = player.x;
    player.hitbox.y = player.y;
    // Make sure the player stays in bounds
    player.x = Math.max(0, Math.min(Constants.MAP_SIZE, player.x));
    player.y = Math.max(0, Math.min(Constants.MAP_SIZE, player.y));
  });
}

module.exports = {
  updateBulletPositions,
  updatePlayerPositions,
};
