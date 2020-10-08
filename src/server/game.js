const { updateBulletPositions, updatePlayerPositions } = require('./systems/movement');
const { handleBulletCollisions } = require('./systems/collisions');
const { removeDeadPlayers } = require('./systems/removeDeadPlayers');
const { updateSteering } = require('./systems/updateSteering');
const { shootCannons } = require('./systems/shootCannons');
const Constants = require('../shared/constants');
const Player = require('./entities/player');

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
      this.sendUpdates();
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  sendUpdates() {
    const leaderboard = this.getLeaderboard();
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
    });
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

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;
    // Generate a position to start this player at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleAction(socket, action, data) {
    // make sure the socket has a player
    if (!this.players[socket.id]) return;

    switch (action) {
      case 'steer':
        updateSteering(this.players[socket.id], data);
        break;
      case 'shoot':
        shootCannons(this.players[socket.id], this.bullets, data);
        break;
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
