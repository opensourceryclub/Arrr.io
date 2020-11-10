/* eslint-disable max-len */
const Object = require('./object');
const Constants = require('../../shared/constants');
const { shipFactory } = require('./ship');
const Shape = require('./shape');

class Player extends Object {
  /**
   * Creates an instance of Player.
   */
  constructor(id, username, x, y) {
    // TODO: don't do this here
    const hitbox = new Shape([[0, 0], [76, 0], [76, 110], [0, 110]], x, y);
    super(id, x, y, 0, 0, hitbox);

    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.score = 0;

    // Milliseconds left until the player can shoot their cannons again
    this.fireCooldown = 0;

    // Give the player the default ship
    this.ship = shipFactory.defaultShip();

    // Ship size parameters, default ship valkues for now
    this.shipH = 150;
    this.shipW = 75;

    // Ship movement parameters
    this.sailsRaised = true;
    this.rudderAngle = 0;
    this.rudderSpeed = 1 / 500;
    this.maxRudderAngle = Math.PI / 200;
    this.minRudderAngle = -1 * Math.PI / 200;
    this.speed = 0;
    this.maxSpeed = 100;
    this.minSpeed = 0;
    this.velocDir = 0;
    this.velocX = 0;
    this.velocY = 0;
    this.accel = 10;
    this.dccel = 10;
    this.directionVel = 0;

    // The amount of gold the player has
    this.gold = 1000;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }

  onDealtDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      gold: this.gold,
      speed: this.speed,
      shipH: this.ship.shipH,
      shipW: this.ship.shipW,
      name: this.username,
      ship: this.ship.name,
    };
  }
}

module.exports = Player;
