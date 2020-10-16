// Handle movement for all entites with position and path components

const Constants = require('../../shared/constants');
const { rotateBy } = require('../utils/utils');

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

    /*
      Reduce the ship's firing cooldown, this could be moved somewhere else, but it
      would require an extra loop over every ship
    */
    player.fireCooldown -= dt;

    /*
      This algorithm is supposed to produce the drifting effect that you'd expect
      from a ship. A few values need to be updated:
        - the ship's velocity
        - the ship's position
        - the ship's rudder angle
        - the ship's heading angle - which direction the ship is facing

      Updating the ship's velocity: the ship's velocity will be updated according to
      a formula which considers the current velocity, if the sails are raised, and
      the rudder angle.
    */

    // Update the ship's speed, depending on if the sails are raised
    if (player.sailsRaised) player.speed = Math.min(player.maxSpeed, player.speed + (dt * player.accel));
    else                    player.speed = Math.max(player.minSpeed, player.speed - (dt * player.dccel));

    // Update the ship's velocity
    // player.rudderAngle = -1 * Math.PI / 200;
    if (player.rudderAngle !== 0) player.velocDir = rotateBy(player.velocDir, player.rudderAngle);
    player.velocX = player.speed * Math.sin(player.velocDir);
    player.velocY = player.speed * Math.cos(player.velocDir);

    // Update the ship's position
    player.x += dt * player.velocX;
    player.y -= dt * player.velocY;

    // Ensure the ship's position stays within the map
    player.x = Math.max(0, Math.min(Constants.MAP_SIZE, player.x));
    player.y = Math.max(0, Math.min(Constants.MAP_SIZE, player.y));

    // Update the ship's hitbox position
    player.hitbox.x = player.x;
    player.hitbox.y = player.y;

    // Update the ship's heading angle - which direction the ship is facing
    player.direction = rotateBy(player.direction, player.rudderAngle);
  });
}

module.exports = {
  updateBulletPositions,
  updatePlayerPositions,
};
