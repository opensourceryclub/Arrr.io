const Constants = require('../../shared/constants');

function removeDeadPlayers(players, sockets) {
  Object.keys(sockets).forEach(playerID => {
    const socket = sockets[playerID];
    const player = players[playerID];
    if (player.hp <= 0) {
      socket.emit(Constants.MSG_TYPES.GAME_OVER);
      this.removePlayer(socket);
    }
  });
}

module.exports = {
  removeDeadPlayers,
};
