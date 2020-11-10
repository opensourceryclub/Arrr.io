const SHIP_NAMES = {
  SLOOP: 'sloop',
  CARAVEL: 'caravel',
  FRIGATE: 'frigate',
};

const SHIP_COSTS = {};
SHIP_COSTS[SHIP_NAMES.SLOOP] = 100;
SHIP_COSTS[SHIP_NAMES.CARAVEL] = 250;
SHIP_COSTS[SHIP_NAMES.FRIGATE] = 1000;

const SHIPS = {};
SHIPS[SHIP_NAMES.SLOOP] = {
  shipH: 150,
  shipW: 75,
  rudderSpeed: 1 / 500,
  maxRudderAngle: Math.PI / 200,
  minRudderAngle: Math.PI / 200 * -1,
  maxSpeed: 100,
  minSpeed: 0,
  accel: 10,
  dccel: 10,
};
SHIPS[SHIP_NAMES.CARAVEL] = {
  shipH: 150,
  shipW: 75,
  rudderSpeed: 1 / 500,
  maxRudderAngle: Math.PI / 200,
  minRudderAngle: Math.PI / 200 * -1,
  maxSpeed: 250,
  minSpeed: 0,
  accel: 15,
  dccel: 10,
};

function purchaseShip(player, data) {
  if (player.gold >= 500) {
    player.gold -= SHIP_COSTS[data.ship];
    player.ship = SHIPS[data.ship];
  }
}

module.exports = { purchaseShip };
