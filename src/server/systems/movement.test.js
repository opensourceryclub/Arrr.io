const Bullet = require('../entities/bullet');
const Player = require('../entities/player');
const { updateBulletPositions, updateShipPositions } = require('./movement');

describe('updateBulletPositions', () => {
  it('bullets position should be updated according to the dt, bullet direction, and bullet speed', () => {
    // Setup test data
    const dt = 50;
    const originalBullets = [
      new Bullet('1', 100, 100, 0),
      new Bullet('1', 100, 100, Math.PI / 2),
      new Bullet('1', 100, 100, Math.PI),
      new Bullet('1', 100, 100, -1 * Math.PI),
      new Bullet('1', 100, 100, -1 * Math.PI / 2),
      new Bullet('1', 0, 0, 0),
      new Bullet('1', 0, 0, Math.PI / 2),
      new Bullet('1', 0, 0, Math.PI),
      new Bullet('1', 0, 0, -1 * Math.PI),
      new Bullet('1', 0, 0, -1 * Math.PI / 2),
    ];
    const originalBulletsCopy = JSON.parse(JSON.stringify(originalBullets));

    // Update bullet positions
    const updatedBullets = updateBulletPositions(dt, originalBulletsCopy);

    // Assert that each bullet's position was correctly updated
    for (let i = 0; i < updatedBullets.length; i++) {
      const originalBullet = originalBullets[i];
      const updatedBullet = updatedBullets[i];
      // calculate expected position
      const expectedX = originalBullet.x + (dt * originalBullet.speed * Math.sin(originalBullet.direction));
      const expectedY = originalBullet.y - (dt * originalBullet.speed * Math.cos(originalBullet.direction));
      // assert the update bullet has the expected position
      expect(updatedBullet.x).toEqual(expectedX);
      expect(updatedBullet.y).toEqual(expectedY);
      expect(updatedBullet.hitbox.x).toEqual(expectedX);
      expect(updatedBullet.hitbox.y).toEqual(expectedY);
    }
  });
});

describe('updateShipPositions', () => {
  it('ships position should be updated according to the dt, ship direction, and ship speed', () => {
    // Setup test data
    const dt = 50;
    const ships = {
      1: new Player(1, 'username', 100, 100),
    };
    const shipsCopy = JSON.parse(JSON.stringify(ships));

    // Update ships positions
    const updatedShips = updateShipPositions(dt, shipsCopy);

    // Assert that each ship's position was correctly updated
    for (let ship in updatedShips) {
      const originalShip = ships[ship];
      const updatedShip = updatedShips[ship];
      // calculate expected position
      const expectedX = originalShip.x + (dt * originalShip.speed * Math.sin(originalShip.direction));
      const expectedY = originalShip.y - (dt * originalShip.speed * Math.cos(originalShip.direction));
      // assert the update bullet has the expected position
      expect(updatedShip.x).toEqual(expectedX);
      expect(updatedShip.y).toEqual(expectedY);
      expect(updatedShip.hitbox.x).toEqual(expectedX);
      expect(updatedShip.hitbox.y).toEqual(expectedY);
    }
  });
});
