import { shuffleArray } from "@/utils";
import { TileType } from "@/types";

enum State {
  roll = "roll",
  move = "move",
}

type Tile = {
  col: number;
  row: number;
  type: TileType;
  playerIndex: number;
};

type Board = Tile[][];

export default class Engine {
  private playerIndexTurn: number = 0;

  private state: State = State.roll;

  private board: Board = [];

  playerTurn(playerIndex: number) {
    this.playerIndexTurn = playerIndex;
    this.state = State.roll;
  }

  roll(): number | null {
    if (this.state !== State.roll) {
      return null;
    }
    const dice = 4;
    const corners = [0, 1, 0, 1];
    let total = 0;
    for (let i = 0; i < dice; i++) {
      const rolledCorners = shuffleArray(corners);
      const result = rolledCorners[0];
      if (result === 1) {
        total++;
      }
    }
    return total;
  }

  move(from: Tile, to: Tile): Board {
    if (this.state !== State.move) {
      return this.board;
    }
    // Can't move another player's piece
    if (from.playerIndex !== this.playerIndexTurn) {
      return this.board;
    }
    // Can't move to a tile that's already occupied
    if (to.playerIndex > -1) {
      return this.board;
    }
    // Move is valid
    this.board[to.col][to.row].playerIndex = this.playerIndexTurn;
    return this.board;
  }
}
