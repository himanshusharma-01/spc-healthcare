"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function DetailedGlobe() {
  const globeRef = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeRef.current);

    globe
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundColor("rgba(255,255,255,0)") // transparent
      .showAtmosphere(true)
      .atmosphereColor("#3a7afe")
      .atmosphereAltitude(0.25);

    // Auto rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;

    // Camera position
    globe.camera().position.z = 300;

  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: "450px",
        height: "450px",
        margin: "0 auto",
      }}
    />
  );
}
