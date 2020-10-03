function updateSteering(player, directions) {
  // directions : [turn left, turn right]
  let tempDirection = player.direction + (-directions[0] + directions[1]) * player.ship.steeringSpeed;
  if (tempDirection > Math.PI) {
    tempDirection = -1 * Math.PI + (tempDirection - Math.PI);
  }
  if (tempDirection < -1 * Math.PI) {
    tempDirection = Math.PI + (tempDirection + Math.PI);
  }
  player.direction = tempDirection;
}

module.exports = {
  updateSteering,
};
