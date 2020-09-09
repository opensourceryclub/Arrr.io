const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');
const Shape = require('./shape');

class Bullet extends ObjectClass {
  constructor(parentID, x, y, dir) {
    const hitbox = new Shape([[0, 0], [3, 0], [3, 3], [0, 3]], x, y);
    super(shortid(), x, y, dir, Constants.BULLET_SPEED, hitbox);
    this.parentID = parentID;

    // need to get the length and width from the ship, but for now we do this shit
    this.box = new Shape([[0, 0], [3, 0], [3, 3], [0, 3]], x, y);
  }

  // Returns true if the bullet should be destroyed
  update(dt) {
    super.update(dt);
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

module.exports = Bullet;
