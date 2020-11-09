const Bullet = require('../entities/bullet');

// store starting position for each # cannons instead of calcuating each time
const spacing = 25;
const startingOffsets = {
  1: 0,
  2: -1 * spacing / 2,
  3: -1 * spacing,
};

function shootCannons(player, bullets, dir) {
  if (player.fireCooldown <= 0) {
    // increase the players cooldown after they fire their cannons
    player.fireCooldown += 1.0;

    // determine the direction to fire the cannonballs
    let tempDirection = player.direction + Math.PI / 2;
    if (tempDirection > Math.PI) tempDirection = -1 * Math.PI + (tempDirection - Math.PI);
    if (tempDirection < -1 * Math.PI) tempDirection = Math.PI + (tempDirection + Math.PI);
    const xDiff = Math.cos(tempDirection);
    const yDiff = Math.sin(tempDirection);

    // create 1 bullet for each cannons on the players ship
    const numCannons = 2;
    for (let i = 0; i < numCannons; i++) {
      // evenly space cannonballs relative to the ships broadside
      const x = player.x + ((startingOffsets[numCannons] + (i * spacing)) * xDiff);
      const y = player.y + ((startingOffsets[numCannons] + (i * spacing)) * yDiff);
      bullets.push(new Bullet(player.id, x, y, dir));
    }
  }
}

module.exports = {
  shootCannons,
};
