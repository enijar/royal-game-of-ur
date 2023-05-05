import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Camera() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[-5, 5, 5]} />
      <OrbitControls makeDefault />
    </>
  );
}
