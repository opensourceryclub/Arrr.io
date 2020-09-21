// Handle movement for all entites with position and path components

const Constants = require('../../shared/constants');

function updateBulletPositions(dt, bullets) {
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    bullet.x += dt * bullet.speed * Math.sin(bullet.direction);
    bullet.y -= dt * bullet.speed * Math.cos(bullet.direction);
    bullet.hitbox.x = bullet.x;
    bullet.hitbox.y = bullet.y;
  }
  return bullets;
}

function updatePlayerPositions(dt, ships) {
  for (let key in ships) {
    const ship = ships[key];
    ship.fireCooldown -= dt;
    ship.x += dt * ship.speed * Math.sin(ship.direction);
    ship.y -= dt * ship.speed * Math.cos(ship.direction);
    ship.hitbox.x = ship.x;
    ship.hitbox.y = ship.y;
    // Make sure the player stays in bounds
    ship.x = Math.max(0, Math.min(Constants.MAP_SIZE, ship.x));
    ship.y = Math.max(0, Math.min(Constants.MAP_SIZE, ship.y));
  }
  return ships;
}

module.exports = {
  updateBulletPositions,
  updatePlayerPositions,
};
