const socketio = require('socket.io');
const Game = require('./game');
const Constants = require('../shared/constants');
const app = require('./app');

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port);
const io = socketio(server);

// Whenever a new websocket connection is opened, this callback is triggered
io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, updateSteering);
  socket.on(Constants.MSG_TYPES.SHOOT, shootCannons);
});

// Start the game, this will intialize the game state and begin the game loop
const game = new Game();

// Functions for handling incoming messages from clients
function joinGame(username) {
  game.addPlayer(this, username);
}

function onDisconnect() {
  game.removePlayer(this);
}

function updateSteering(data) {
  game.handleAction(this, 'steer', data);
}

function shootCannons(data) {
  game.handleAction(this, 'shoot', data);
}
