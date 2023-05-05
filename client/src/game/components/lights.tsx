import React from "react";
import { Environment } from "@react-three/drei";
import assets from "@/assets";

export default function Lights() {
  return (
    <>
      <ambientLight />
      <Environment files={assets.environment} />
    </>
  );
}
