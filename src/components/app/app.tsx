import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppReset } from "@/components/app/app.styles";

const Home = React.lazy(() => import("@/pages/home"));
const Play = React.lazy(() => import("@/pages/play"));

export default function App() {
  return (
    <>
      <AppReset />
      <React.Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </React.Suspense>
    </>
  );
}
