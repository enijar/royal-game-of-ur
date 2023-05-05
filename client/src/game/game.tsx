import React from "react";
import { Canvas } from "@react-three/fiber";
import Camera from "@/game/components/camera";
import Lights from "@/game/components/lights";
import Board from "@/game/components/board";

export default function Game() {
  return (
    <Canvas flat linear legacy>
      <Lights />
      <Camera />
      <Board />
    </Canvas>
  );
}
