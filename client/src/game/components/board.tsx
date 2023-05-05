import React from "react";
import { Piece as PieceType } from "@/types";
import { shuffleArray } from "@/utils";
import Piece from "@/game/components/piece";

export default function Board() {
  const settings = React.useMemo(() => {
    const tileSize: [width: number, height: number, depth: number] = [1, 0.75, 1];
    const pieceRadius = tileSize[0] * 0.5 * 0.75;
    return {
      cols: 3,
      rows: 8,
      tileSize,
      pieceSize: [pieceRadius, pieceRadius, tileSize[1] * 0.2, 32, 32] as [
        radiusTop: number,
        radiusBottom: number,
        height: number,
        radialSegments: number,
        heightSegments: number
      ],
    };
  }, []);

  const tiles = React.useMemo(() => {
    const voidCols = [0, 2];
    const voidRows = [4, 5];
    return Array.from(Array(settings.cols)).map((_, col) => {
      return Array.from(Array(settings.rows)).map((_, row) => {
        return {
          col,
          row,
          void: voidCols.includes(col) && voidRows.includes(row),
        };
      });
    });
  }, [settings.cols, settings.rows]);

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
      position-x={settings.tileSize[0] * -Math.floor(settings.cols / 2)}
      position-z={settings.tileSize[0] * -Math.floor(settings.rows / 2)}
    >
      {tiles.map((rows, col) => {
        return (
          <group key={col} position-x={settings.tileSize[0] * col}>
            {rows.map((tile, index) => {
              if (tile.void) {
                return <React.Fragment key={index}></React.Fragment>;
              }
              const piece = pieces.find((piece) => {
                return piece.col == tile.col && piece.row === tile.row;
              });
              return (
                <group key={index} position-z={tile.row * settings.tileSize[0]}>
                  <mesh>
                    <boxGeometry args={settings.tileSize} />
                    <meshStandardMaterial color="#bab8a1" />
                  </mesh>
                  {piece !== undefined && (
                    <group position-y={settings.tileSize[1] / 2 + settings.pieceSize[2] / 2}>
                      <Piece size={settings.pieceSize} piece={piece} />
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
