import { Vector3 } from "@react-three/fiber";

const config = {
  board: {
    cols: 3,
    rows: 8,
    voidCols: [0, 2] as number[],
    voidRows: [4, 5] as number[],
    tileSize: [1, 0.75, 1] as [width: number, height: number, depth: number],
    pieceRadiusRatio: 0.75,
    pieceHeightRatio: 0.2,
    pieceTextureRatio: 2,
    pieceColors: ["#86868f", "#dbd8bd"],
    color: "#bab8a1",
  },
  camera: {
    position: [0, 7, 7] as Vector3,
  },
} as const;

export default config;
