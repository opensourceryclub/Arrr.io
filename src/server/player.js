/* eslint-disable max-len */
const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');
const { shipFactory } = require('./ship');
const Shape = require('./shape');

class Player extends ObjectClass {
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

    // The amount of gold the player has
    this.gold = 100;
  }

  update(dt) {
    // Update position
    super.update(dt);

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    this.box.x = this.x;
    this.box.y = this.y;

    // Decrease player's cooldowns
    this.fireCooldown -= dt;
  }

  /**
   * Calculate the player's new steer angle. This will depend on which keys the
   * player pressed, the steering speed of their ship, and whatever else idk.
   */
  steer(directions) {
    // directions : [turn left, turn right]
    let tempDirection = this.direction + (-directions[0] + directions[1]) * this.ship.steeringSpeed;
    if (tempDirection > Math.PI) {
      tempDirection = -1 * Math.PI + (tempDirection - Math.PI);
    }
    if (tempDirection < -1 * Math.PI) {
      tempDirection = Math.PI + (tempDirection + Math.PI);
    }
    this.direction = tempDirection;
    console.log(this.direction);
  }

  /**
   * Attempt to shoot the player's ship's cannon in the direction they're mouse
   * is pointing.
   *
   * @param {*} dir
   * @returns
   * @memberof Player
   */
  shootCannons(dir) {
    if (this.fireCooldown <= 0) {
      // are we firing left or right cannons? rn who cares unit circle hard
      // if (blahblahblah) {}
      this.fireCooldown += 1.0;

      const numCannons = this.ship.cannons[0];

      let tempDirection = this.direction + Math.PI / 2;
      if (tempDirection > Math.PI) {
        tempDirection = -1 * Math.PI + (tempDirection - Math.PI);
      }
      if (tempDirection < -1 * Math.PI) {
        tempDirection = Math.PI + (tempDirection + Math.PI);
      }
      // get x diff
      const xDiff = Math.cos(tempDirection);
      // get y diff
      const yDiff = Math.sin(tempDirection);

      // let offSet = this.ship.length

      const bullets = [];
      for (let i = 0; i < numCannons; i++) {
        bullets.push(new Bullet(this.id, this.x + 25 * i * xDiff, this.y + 25 * i * yDiff, dir));
      }
      return bullets;
    }
    return [];
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
