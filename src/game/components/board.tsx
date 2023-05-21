import React from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { Piece as PieceType } from "@/types";
import { shuffleArray } from "@/utils";
import Piece from "@/game/components/piece";
import config from "@/game/config";
import assets from "@/assets";

export default function Board() {
  const tileTextures = useTexture([assets.tile1, assets.tile2, assets.tile3, assets.tile4, assets.tile5]);

  const tiles = React.useMemo(() => {
    return Array.from(Array(config.board.cols)).map((_, col) => {
      return Array.from(Array(config.board.rows)).map((_, row) => {
        const rosettaTiles = [
          { row: 0, col: 0 },
          { row: 0, col: 2 },
        ];
        function getTextureIndex(row: number, col: number): number {
          const rosettaTile = rosettaTiles.find((tile) => {
            return tile.row === row && tile.col === col;
          });
          if (rosettaTile !== undefined) {
            return 3;
          }
          return 0;
        }
        return {
          col,
          row,
          void: config.board.voidCols.includes(col) && config.board.voidRows.includes(row),
          textureIndex: getTextureIndex(row, col),
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
      position-x={config.board.tileSize[0] * (-(config.board.rows - 1) / 2)}
      position-z={config.board.tileSize[0] * ((config.board.cols - 1) / 2)}
    >
      <group rotation-y={THREE.MathUtils.degToRad(90)}>
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
                      <meshStandardMaterial color={config.board.color} attach="material-0" />
                      <meshStandardMaterial color={config.board.color} attach="material-1" />
                      <meshStandardMaterial map={tileTextures[tile.textureIndex]} attach="material-2" />
                      <meshStandardMaterial color={config.board.color} attach="material-3" />
                      <meshStandardMaterial color={config.board.color} attach="material-4" />
                      <meshStandardMaterial color={config.board.color} attach="material-5" />
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
    </group>
  );
}
