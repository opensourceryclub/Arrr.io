const { updateBulletPositions, updatePlayerPositions } = require('./systems/movement');
const { handleBulletCollisions } = require('./systems/collisions');
const { removeDeadPlayers } = require('./systems/removeDeadPlayers');
const { updateSails, updateSteering } = require('./systems/steering');
const { addPlayer, removePlayer } = require('./systems/players');
const { shootCannons } = require('./systems/shooting');
const { purchaseShip } = require('./systems/store');

const Constants = require('../shared/constants');

/**
 * Runs an instance of the game. Exposes an action handler, which callers can
 * use to pass player actions.
 *
 * @class Game
 */
class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.bullets = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    // Calculate time elapsed since the last update
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each bullet's position, remove them if they go out of the map's bounds
    updateBulletPositions(dt, this.bullets);

    // Update each player's position, score, and fireCooldown
    updatePlayerPositions(dt, this.players);

    // Apply collisions, deal damage to players, increase score for hitting another ship
    handleBulletCollisions(Object.values(this.players), this.bullets);

    // Check if any players are dead, if they are send them a game over message
    removeDeadPlayers(this, this.players, this.sockets);

    // Send a game update to each player every other time
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  createUpdate(player, leaderboard) {
    const nearbyPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
    const nearbyBullets = this.bullets.filter(
      b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map(p => p.serializeForUpdate()),
      bullets: nearbyBullets.map(b => b.serializeForUpdate()),
      leaderboard,
    };
  }

  handleAction(socket, action, data) {
    switch (action) {
      case 'connect':
        addPlayer(this.sockets, this.players, socket, data); return;
      case 'disconnect':
        removePlayer(this.sockets, this.players, socket); return;
      default:
        break;
    }

    // make sure the socket has a player
    if (!this.players[socket.id]) return;

    switch (action) {
      case 'sails':
        updateSails(this.players[socket.id], data); break;
      case 'steer':
        updateSteering(this.players[socket.id], data); break;
      case 'shoot':
        shootCannons(this.players[socket.id], this.bullets, data); break;
      case 'purchase':
        purchaseShip(this.players[socket.id], data); break;
      default:
        console.log(socket, action, data);
    }
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }
}

module.exports = Game;
