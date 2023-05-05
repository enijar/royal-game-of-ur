import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Board from "@/game/components/board";

export default function Game() {
  return (
    <Canvas flat linear legacy>
      <ambientLight />
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls makeDefault />
      <Board />
    </Canvas>
  );
}
