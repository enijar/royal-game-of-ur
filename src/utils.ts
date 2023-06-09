import { TileType } from "@/types";

export function shuffleArray<T = any>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getTextureIndex(type: TileType): number {
  const types = Object.values(TileType);
  return types.indexOf(type);
}
