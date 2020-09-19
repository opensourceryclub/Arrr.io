// Handle movement for all entites with position and path components

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

function updateShipPositions(dt, ships) {
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    ship.x += dt * ship.speed * Math.sin(ship.direction);
    ship.y -= dt * ship.speed * Math.cos(ship.direction);
    ship.hitbox.x = ship.x;
    ship.hitbox.y = ship.y;
  }
  return ships;
}

module.exports = {
  updateBulletPositions,
  updateShipPositions,
};
