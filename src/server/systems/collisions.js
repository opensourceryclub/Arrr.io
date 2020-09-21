function handleBulletCollisions(players, bullets) {
  const bulletsToRemove = [];
  for (let i = 0; i < bullets.length; i++) {
    // Look for a player (who didn't create the bullet) to collide each bullet with.
    // As soon as we find one, break out of the loop to prevent double counting a bullet.
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i];
      const player = players[j];
      if (bullet.parentID !== player.id && player.hitbox.checkCollision(bullet.hitbox)) {
        bulletsToRemove.push(i);
        player.takeBulletDamage();
        break;
      }
    }
  }
  // Remove all of the bullets that collided with players
  for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
    bullets.splice(bulletsToRemove[i], 1);
  }
}

module.exports = {
  handleBulletCollisions,
};
