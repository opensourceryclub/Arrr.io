const socketio = require('socket.io');
const Game = require('./game');
const Constants = require('../shared/constants');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');

// Create express app
const app = express();
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  app.use(express.static('dist'));
}

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port);
const io = socketio(server);

// Whenever a new websocket connection is opened, this callback is triggered
io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.SAILS, updateSails);
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

function updateSails(data) {
  game.handleAction(this, 'sails', data);
}

function updateSteering(data) {
  game.handleAction(this, 'steer', data);
}

function shootCannons(data) {
  game.handleAction(this, 'shoot', data);
}
