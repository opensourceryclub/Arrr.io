/* eslint-disable class-methods-use-this */
const Shape = require('./shape');

/**
 * Models all of the 
 *
 * @class Ship
 */
class Ship {
  constructor(type, cannons, hull, steering, speed, cargo) {
    // this ship type, unique per ship
    this.type = type;

    // the number of cannons on each side
    this.cannons = cannons.sides;
    // the damage a cannon shot deals
    this.cannonStrength = cannons.strength;
    // the speed of a cannon's shot
    this.cannonSpeed = cannons.speed;

    // the strength of the ships armor factors into how much damage it takes
    this.armor = hull.armor;
    // the health of the ship
    this.hp = hull.hp;
    // ship dimensions
    this.length = hull.length;
    this.width = hull.width;

    // the ships current steering angle
    this.steeringAngle = 0;
    // how quickly the ship can steer
    this.steeringSpeed = steering.angle;

    // the ships current speed
    this.speed = 0;
    // how fast the ship can travel
    this.maxSpeed = speed.max;
    // how quickly the ship accelerates
    this.acceleration = speed.acceleration;
    // how quickly the ship deaccelerates
    this.deacceleration = speed.deacceleration;

    // the carrying capacity of the ship
    this.carryingCapacity = cargo.capacity;
    // the current amount of capacity used
    this.capacityUsed = cargo.capacityUsed;
    // the current cargo held by the ship
    this.cargo = cargo.store;
  }
}

class ShipFactory {
  defaultShip() {
    const type = 1;
    // const hitbox = new Shape([[0, 0], [20, 0], [20, 20], [0, 20]], 0, 0);
    const cannons = {
      sides: [2, 1],
      strength: 1,
      speed: 1,
    };
    const hull = {
      hp: 10,
      armor: 1,
      length: 20,
      width: 5,
    };
    const steering = {
      angle: 0.20,
    };
    const speed = {
      maxSpeed: 10,
      acceleration: 1,
      deacceleration: 1,
    };
    const cargo = {
      capacity: 100,
      capacityUsed: 0,
      store: {},
    };
    return new Ship(type, cannons, hull, steering, speed, cargo);
  }
}

const shipFactory = new ShipFactory();

module.exports = {
  Ship,
  shipFactory,
};
