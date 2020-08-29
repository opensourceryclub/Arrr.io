const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt); // updates direction and position

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction);
    }

    return null;
  }

  /**
   * Calculate the player's new steer angle. This will depend on which keys the
   * player pressed, the steering speed of their ship, and whatever else idk.
   * 
   * @memberof Player
   */
  steer(keysPressed) {
    let tempDir = this.direction
    const TURN_L_KEY = 0
    const TURN_R_KEY = 1
    // update the player's direction based on their current direction and kep presses
    const STEERING_SPEED = 0.05
    const keyPresses = [ (keysPressed.a ? 1 : 0) , (keysPressed.d ? 1 : 0) ]
    tempDir -= keyPresses[ TURN_L_KEY ] * STEERING_SPEED // turns left
    tempDir += keyPresses[ TURN_R_KEY ] * STEERING_SPEED // turns right 
    
    this.setDirection(tempDir);
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
