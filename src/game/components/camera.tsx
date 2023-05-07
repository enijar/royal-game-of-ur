import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import config from "@/game/config";

export default function Camera() {
  return (
    <>
      <PerspectiveCamera makeDefault position={config.camera.position} />
      <OrbitControls makeDefault />
    </>
  );
}
