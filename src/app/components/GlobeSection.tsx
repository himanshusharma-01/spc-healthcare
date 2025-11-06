"use client";
import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import "./Homepage.css";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeSection() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#00A3B4",
    showAtmosphere: true,
    atmosphereColor: "#00A3B4",
    atmosphereAltitude: 0.15,
    emissive: "#00A3B4",
    emissiveIntensity: 0.3,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#00A3B4",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#00A3B4",
    pointLight: "#00A3B4",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#00A3B4", "#00A676", "#06b6d4"];
  
  // Sample arcs showing global connections for SPC Healthcare
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  ];

  return (
    <section className="l3-globe-section l3-section">
      <div className="l3-container-inner">
        <div className="l3-globe-content">
          <div className="l3-globe-text">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
            >
              <h2 className="l3-globe-title">Trusted Worldwide</h2>
              <p className="l3-globe-description">
                SPC Healthcare is trusted by healthcare professionals and patients across the globe. 
                Our commitment to quality, innovation, and excellence has made us a leading name 
                in pharmaceutical manufacturing, serving communities in over 80 countries worldwide.
              </p>
              <div className="l3-globe-stats">
                <div className="l3-globe-stat">
                  <div className="l3-globe-stat-number">80+</div>
                  <div className="l3-globe-stat-label">Countries</div>
                </div>
                <div className="l3-globe-stat">
                  <div className="l3-globe-stat-number">500+</div>
                  <div className="l3-globe-stat-label">Products</div>
                </div>
                <div className="l3-globe-stat">
                  <div className="l3-globe-stat-number">25+</div>
                  <div className="l3-globe-stat-label">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="l3-globe-visual">
            <div className="l3-globe-container">
              <div className="l3-globe-wrapper">
                <Canvas
                  camera={{
                    position: [0, 0, 300],
                    fov: 45,
                  }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

