# Royal Game of Ur

A digital implementation of the ancient [Royal Game of Ur](https://en.wikipedia.org/wiki/Royal_Game_of_Ur).

### Basic Rules

[The British Museum game demo video](https://www.youtube.com/watch?v=WZskjLq040I).

1. Both players start the game with 7 pieces
2. Each player takes it in turn to roll four tetrahedron-shaped dice (counting the total white dots facing upwards)
3. Pieces start on the board from the run of four tiles closest to the player
4. Landing on a rosette grants to player another roll of the dice
5. When a player lands on another player's piece that piece is removed from the board
6. Pieces that land on the center rosette cannot be removed by another piece
7. If a piece lands on an occupied center rosette, that piece must skip forward one tile
8. Pieces can only move off the board if they roll the exact number of tiles remaining in front of their piece plus one


### Getting Started

Start app in development mode:

```shell
nvm use # uses supported Node version for this project
npm install
npm start
```

### Production Build

Build app in production mode:

```shell
nvm use # uses supported Node version for this project
npm install
npm run build
```
