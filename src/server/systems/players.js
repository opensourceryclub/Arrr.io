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

function removeDeadPlayers(game, players, sockets) {
  Object.keys(sockets).forEach(playerID => {
    const socket = sockets[playerID];
    const player = players[playerID];
    if (player.hp <= 0) {
      socket.emit(Constants.MSG_TYPES.GAME_OVER);
      removePlayer(sockets, players, socket);
    }
  });
}

module.exports = {
  addPlayer,
  removePlayer,
  removeDeadPlayers,
};
