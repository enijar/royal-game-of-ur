import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Piece as PieceType } from "@/types";
import assets from "@/assets";
import config from "@/game/config";

type Props = {
  piece: PieceType;
};

export default function Piece({ piece }: Props) {
  const gl = useThree((state) => state.gl);

  const textures = useTexture([assets.piecePlayer1, assets.piecePlayer2]);
  React.useMemo(() => {
    textures.forEach((texture) => {
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    });
  }, [textures, gl]);
  const settings = React.useMemo(() => {
    const radius = config.board.tileSize[0] * 0.5 * config.board.pieceRadiusRatio;
    return {
      radius,
      height: config.board.tileSize[1] * config.board.pieceHeightRatio,
      textureSize: radius * config.board.pieceTextureRatio,
    };
  }, []);

  return (
    <>
      <mesh>
        <cylinderGeometry args={[settings.radius, settings.radius, settings.height, 32, 32]} />
        <meshStandardMaterial color={config.board.pieceColors[piece.playerIndex]} />
      </mesh>
      <group position-y={settings.height / 2}>
        <mesh renderOrder={1} rotation-x={THREE.MathUtils.degToRad(-90)}>
          <planeGeometry args={[settings.textureSize, settings.textureSize]} />
          <meshStandardMaterial
            depthWrite={false}
            depthTest={false}
            transparent={true}
            map={textures[piece.playerIndex]}
          />
        </mesh>
      </group>
    </>
  );
}
