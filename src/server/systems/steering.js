const { rotateBy } = require('../utils/utils');

/**
 * Update a ship's rudder angle. Player's can use the a,d keys to turn their rudder
 * to the left or right. This method will increase or decrease the rudder angle depending
 * on which keys are pressed. It will also ensure that the rudder angle stays within the
 * bounds of the ship's rudder. Each ship has a unique min,max rudder angle and speed for
 * how quickly the rudder can turn.
 *
 * @param {*} player
 * @param {*} directions
 */
function updateSteering(player, directions) {
  // Update the ship's rudder angle, turn it left or right depending on input and the ships steering speed
  player.rudderAngle = rotateBy(player.rudderAngle, (-directions[0] + directions[1]) * player.rudderSpeed);
  // Ensure the ship's rudder angle stays within its bounds, otherwise ships will turn wildly fast
  player.rudderAngle = Math.max(player.minRudderAngle, Math.min(player.maxRudderAngle, player.rudderAngle));
}

/**
 * Update a player's ship's sails. Whether or not a ship's sails are raised will determine
 * if its velocity will increase or begin decreasing. Players use the w,d keys to raise,lower
 * their sails. The velocity effects take place in the `updatePlayerPositions` system of
 * the game loop.
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
