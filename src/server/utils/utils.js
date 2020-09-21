function rotateBy(direction, degrees) {
  let tempDirection = this.direction + (-directions[0] + directions[1]) * this.ship.steeringSpeed;
  if (tempDirection > Math.PI) {
    tempDirection = -1 * Math.PI + (tempDirection - Math.PI);
  }
  if (tempDirection < -1 * Math.PI) {
    tempDirection = Math.PI + (tempDirection + Math.PI);
  }
  return tempDirection;
}

module.exports = {
  rotateBy,
};
