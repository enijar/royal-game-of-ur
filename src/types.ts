export type Piece = {
  playerIndex: number;
  col: number;
  row: number;
};

export enum TileType {
  rosetta = "rosetta",
  eyes = "eyes",
  grid = "grid",
  dots = "dots",
  maze = "maze",
  void = "void",
}
