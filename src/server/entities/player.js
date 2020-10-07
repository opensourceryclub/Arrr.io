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
    const hitbox = new Shape([[0, 0], [76, 0], [76, 110], [0, 110]], x, y);
    super(id, x, y, 0, Constants.PLAYER_SPEED, hitbox);

    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.score = 0;

    // Milliseconds left until the player can shoot their cannons again
    this.fireCooldown = 0;

    // Give the player the default ship
    this.ship = shipFactory.defaultShip();

    this.rudderAngle = 0;

    // The amount of gold the player has
    this.gold = 100;
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
    };
  }
}

module.exports = Player;
