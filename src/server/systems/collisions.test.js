const { handleBulletCollisions } = require('./collisions');
const Constants = require('../../shared/constants');
const Player = require('../entities/player');
const Bullet = require('../entities/bullet');

describe('applyCollisions', () => {
  it('should not collide when outside radius', () => {
    const distanceFromPlayer = Constants.BULLET_RADIUS + Constants.PLAYER_RADIUS + 1;
    const players = [
      new Player('1', 'guest1', 1000, 40),
      new Player('2', 'guest2', 2000, 2000),
    ];
    const bullets = [
      new Bullet('2', 2000, 40, 0),
      new Bullet('2', 2000, 40, 0),
    ];

    handleBulletCollisions(players, bullets);
    expect(bullets).toHaveLength(2);
  });

  it('should not collide with own player', () => {
    const playerId = '1234';
    const player = new Player(playerId, 'guest', 40, 40);
    const bullet = new Bullet(playerId, 40, 40, 0);
    const bullets = [bullet];
    const players = [player];
    handleBulletCollisions(players, bullets);
    expect(bullets).toHaveLength(1);
  });

  it('should apply damage when bullet collides with player', () => {
    const player = new Player('1', 'guest', 40, 40);
    const bullet = new Bullet('2', 40, 40, 0);
    const players = [player];
    const bullets = [bullet];

    jest.spyOn(player, 'takeBulletDamage');

    handleBulletCollisions(players, bullets);
    expect(bullets).toHaveLength(0);
    expect(player.takeBulletDamage).toHaveBeenCalledTimes(1);
  });
});
