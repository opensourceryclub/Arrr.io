<div align="center">
  <h1>Arrr.io</h1>
  <img src="https://user-images.githubusercontent.com/24238074/92659677-d76e5500-f2c6-11ea-8969-54025e018597.png" width="200" height="200" alt="Build Status"></img>
  </a>
</div>

Arrr.io is a face-paced multiplayer pirate game built on the <a href="https://example-io-game.victorzhou.com">example.io</a> skeleton with [Node.js](https://nodejs.org/), [socket.io](https://socket.io/), and [HTML5 Canvas](https://www.w3schools.com/html/html5_canvas.asp).

## Documentation

Documentation for the server and client are in their respective directories `src/server` and `src/client`.

## Production

If you just want to start the server, make sure you have Node (>14.2.0) and NPM installed. Then run:

``` bash
$ npm install
$ npm run build:prod
$ npm run start:prod
```

and you'll have a server running on localhost:3000.


## Development

To get started, make sure you have Node (>14.2.0) and NPM installed. Then run:

```bash
$ npm install
$ npm run build:dev
$ npm run start:dev
```

to start a server on localhost:3000.

## Testing

To run all the jest tests:

```bash
$ npm run test
```

Tests for any module's functionality should be added in the same directory and named `filename.test.js`.