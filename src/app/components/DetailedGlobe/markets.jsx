"use client";

import { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function DetailedGlobe() {
  const globeRef = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeRef.current);

    // ✅ Indian States Sample Data
    const indiaStates = [
      { name: "Punjab", lat: 31.1471, lng: 75.3412, color: "red" },
      { name: "Haryana", lat: 29.0588, lng: 76.0856, color: "blue" },
      { name: "Rajasthan", lat: 27.0238, lng: 74.2179, color: "green" },
      { name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, color: "orange" },
      { name: "Maharashtra", lat: 19.7515, lng: 75.7139, color: "purple" },
      { name: "Karnataka", lat: 15.3173, lng: 75.7139, color: "cyan" },
      { name: "Tamil Nadu", lat: 11.1271, lng: 78.6569, color: "yellow" },
      { name: "West Bengal", lat: 22.9868, lng: 87.8550, color: "pink" },
    ];

    globe
      // ✅ Detailed Earth textures
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")

      // ✅ Atmosphere effect
      .showAtmosphere(true)
      .atmosphereColor("#3a7afe")
      .atmosphereAltitude(0.25)

      // ✅ Background transparent
      .backgroundColor("rgba(255,255,255,0)")

      // ✅ Markers for states
      .pointsData(indiaStates)
      .pointAltitude(0.06)
      .pointRadius(0.8)
      .pointColor((d) => d.color)

      // ✅ Labels
      .labelsData(indiaStates)
      .labelText((d) => d.name)
      .labelLat((d) => d.lat)
      .labelLng((d) => d.lng)
      .labelColor(() => "black")
      .labelSize(1.2)
      .labelAltitude(0.1);

    // ✅ Auto rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;

    // ✅ Camera
    globe.camera().position.z = 300;

  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: "450px",
        height: "450px",
        margin: "0 auto"
      }}
    />
  );
}
