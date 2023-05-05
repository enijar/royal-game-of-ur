import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Piece as PieceType } from "@/types";
import assets from "@/assets";

type Props = {
  size: [radiusTop: number, radiusBottom: number, height: number, radialSegments: number, heightSegments: number];
  piece: PieceType;
};

export default function Piece({ size, piece }: Props) {
  const gl = useThree((state) => state.gl);

  const textures = useTexture([assets.piecePlayer1, assets.piecePlayer2]);
  React.useMemo(() => {
    textures.forEach((texture) => {
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    });
  }, [textures, gl]);

  const colors = React.useMemo(() => {
    return ["#86868f", "#dbd8bd"];
  }, []);

  return (
    <>
      <mesh>
        <cylinderGeometry args={size} />
        <meshStandardMaterial color={colors[piece.playerIndex]} />
      </mesh>
      <group position-y={size[2] / 2}>
        <mesh renderOrder={1} rotation-x={THREE.MathUtils.degToRad(-90)}>
          <planeGeometry args={[size[0] * 1.5, size[0] * 1.5]} />
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
