// Import node modules

const express = require('express');
const webpack = require('webpack');
const socketio = require('socket.io');
const webpackDevMiddleware = require('webpack-dev-middleware');

// Import local modules

const Game = require('./game');
const Constants = require('../shared/constants');
const webpackConfig = require('../../webpack.dev.js');

// Setup an Express server

const app = express();
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Start the express server, listening on a port

const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io

const io = socketio(server);

// Listen for socket.io connections

io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on(Constants.MSG_TYPES.SHOOT, handleShootCannons);
  socket.on('disconnect', onDisconnect);
});

// Initialize the game state

const game = new Game();

// Register handlers for messages from clients

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(steerControls) {
  game.handleSteer(this, steerControls);
}

function handleShootCannons(dir) {
  game.handleShootCannons(this, dir);
}

function onDisconnect() {
  game.removePlayer(this);
}
