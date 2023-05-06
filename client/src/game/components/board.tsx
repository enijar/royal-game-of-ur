import React from "react";
import { Piece as PieceType } from "@/types";
import { shuffleArray } from "@/utils";
import Piece from "@/game/components/piece";
import config from "@/game/config";

export default function Board() {
  const tiles = React.useMemo(() => {
    return Array.from(Array(config.board.cols)).map((_, col) => {
      return Array.from(Array(config.board.rows)).map((_, row) => {
        return {
          col,
          row,
          void: config.board.voidCols.includes(col) && config.board.voidRows.includes(row),
        };
      });
    });
  }, []);

  const [pieces, setPieces] = React.useState<PieceType[]>([]);

  React.useEffect(() => {
    const testPlayerIndices = [0, 1];
    setPieces(
      shuffleArray(tiles.flat().filter((tile) => !tile.void))
        .slice(0, 5)
        .map((tile, index) => {
          return {
            playerIndex: testPlayerIndices[index % 2],
            col: tile.col,
            row: tile.row,
          };
        })
    );
  }, [tiles]);

  return (
    <group
      position-x={config.board.tileSize[0] * -Math.floor(config.board.cols / 2)}
      position-z={config.board.tileSize[0] * -Math.floor(config.board.rows / 2)}
    >
      {tiles.map((rows, col) => {
        return (
          <group key={col} position-x={config.board.tileSize[0] * col}>
            {rows.map((tile, index) => {
              if (tile.void) {
                return <React.Fragment key={index}></React.Fragment>;
              }
              const piece = pieces.find((piece) => {
                return piece.col == tile.col && piece.row === tile.row;
              });
              return (
                <group key={index} position-z={tile.row * config.board.tileSize[0]}>
                  <mesh>
                    <boxGeometry args={config.board.tileSize} />
                    <meshStandardMaterial color="#bab8a1" />
                  </mesh>
                  {piece !== undefined && (
                    <group
                      position-y={
                        config.board.tileSize[1] / 2 + (config.board.tileSize[1] * config.board.pieceHeightRatio) / 2
                      }
                    >
                      <Piece piece={piece} />
                    </group>
                  )}
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
