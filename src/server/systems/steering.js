const { rotateBy } = require('../utils/utils');

function updateSteering(player, directions) {
  // Update the ship's rudder angle, turn it left or right depending on input and the ships steering speed
  player.rudderAngle = rotateBy(player.rudderAngle, (-directions[0] + directions[1]) * player.rudderSpeed);
  // Ensure the ship's rudder angle stays within its bounds, otherwise ships will turn wildly fast
  player.rudderAngle = Math.max(player.minRudderAngle, Math.min(player.maxRudderAngle, player.rudderAngle));
}

/**
 * Update a player's ship's sails.
 *
 * @param {*} player
 * @param {*} input
 */
function updateSails(player, input) {
  player.sailsRaised = input.raiseSails;
}

module.exports = {
  updateSteering,
  updateSails,
};
