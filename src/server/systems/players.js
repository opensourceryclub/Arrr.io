const Constants = require('../../shared/constants');
const Player = require('../entities/player');

function addPlayer(sockets, players, socket, username) {
  sockets[socket.id] = socket;
  // Generate a position to start this player at.
  const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
  const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
  players[socket.id] = new Player(socket.id, username, x, y);
}

function removePlayer(sockets, players, socket) {
  delete sockets[socket.id];
  delete players[socket.id];
}

module.exports = {
  addPlayer,
  removePlayer,
};
