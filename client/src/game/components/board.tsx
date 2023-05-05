import React from "react";
import { BoxGeometryProps } from "@react-three/fiber";

export default function Board() {
  const settings = React.useMemo(() => {
    return {
      cols: 3,
      rows: 8,
      tileSize: [1, 0.75, 1] as [width: number, height: number, depth: number],
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
              return (
                <group key={index} position-z={tile.row * settings.tileSize[0]}>
                  <mesh>
                    <boxGeometry args={settings.tileSize} />
                    <meshStandardMaterial color="#dbd8bd" />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
