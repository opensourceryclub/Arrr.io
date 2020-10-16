function rotateBy(direction, degrees) {
  let tempDirection = direction + degrees;
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
