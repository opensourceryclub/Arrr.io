const Constants = require('../../shared/constants');

function removeDeadPlayers(game, players, sockets) {
  Object.keys(sockets).forEach(playerID => {
    const socket = sockets[playerID];
    const player = players[playerID];
    if (player.hp <= 0) {
      socket.emit(Constants.MSG_TYPES.GAME_OVER);
      game.removePlayer(socket);
    }
  });
}

module.exports = {
  removeDeadPlayers,
};
