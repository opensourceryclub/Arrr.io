/* eslint-disable no-multi-spaces */
const express = require('express');
const webpack = require('webpack');
const socketio = require('socket.io');
const webpackDevMiddleware = require('webpack-dev-middleware');
const Game = require('./game');
const Constants = require('../shared/constants');
const webpackConfig = require('../../webpack.dev.js');

// Start an express server and a socket.io server -- port determined by environment
const app = express();
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  app.use(express.static('dist'));
}
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const io = socketio(server);

// Whenever a new websocket connection is opened, this callback is triggered
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  // Register handlers for messages from this socket
  socket.on(Constants.MSG_TYPES.DISCONNECT,   onDisconnect);
  socket.on(Constants.MSG_TYPES.JOIN_GAME,    joinGame);
  socket.on(Constants.MSG_TYPES.INPUT,        handleInput);
  socket.on(Constants.MSG_TYPES.SHOOT,        handleShootCannons);
});

// Start the game, this will intialize the game state and begin the game loop
const game = new Game();

// Functions for handling incoming messages from clients
function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(steerControls) {
  // game.handleSteer(this, steerControls);
  game.handlePlayerAction(this, 'steer', steerControls);
}

function handleShootCannons(dir) {
  // game.handleShootCannons(this, dir);
  game.handlePlayerAction(this, 'shoot', dir);
}

function onDisconnect() {
  game.removePlayer(this);
}
