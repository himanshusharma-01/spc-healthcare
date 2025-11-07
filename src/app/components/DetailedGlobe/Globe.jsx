"use client";

import { useEffect, useRef, useState } from "react";

export default function DetailedGlobe() {
  const globeRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !globeRef.current || !isClient) return;

    // Dynamically import Globe only on client side
    import("globe.gl").then((GlobeModule) => {
      const Globe = GlobeModule.default;
      if (!globeRef.current) return;

      const globe = Globe()(globeRef.current);

      const updateSize = () => {
        if (globeRef.current) {
          const width = globeRef.current.offsetWidth || 480;
          const height = globeRef.current.offsetHeight || 480;
          globe.width(width);
          globe.height(height);
        }
      };

      // Marker data with lat/lng coordinates
      const markers = [
        { name: "Punjab", lat: 31.1471, lng: 75.3412 },
        { name: "Haryana", lat: 29.0588, lng: 76.0856 },
        { name: "Rajasthan", lat: 27.0238, lng: 74.2179 },
        { name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
        { name: "Maharashtra", lat: 19.7515, lng: 75.7139 },
        { name: "Karnataka", lat: 15.3173, lng: 75.7139 },
        { name: "Tamil Nadu", lat: 11.1271, lng: 78.6569 },
        { name: "West Bengal", lat: 22.9868, lng: 87.8550 },
      ];

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("rgba(255,255,255,0)") // transparent
        .showAtmosphere(false) // Remove blue atmosphere shade
        // Add red markers
        .pointsData(markers)
        .pointLat((d) => d.lat)
        .pointLng((d) => d.lng)
        .pointAltitude(0.06)
        .pointRadius(1.2)
        .pointColor(() => "#ff0000") // Red color
        .pointLabel((d) => d.name)
        .pointResolution(2);

      // Disable auto rotate - manual control only
      globe.controls().autoRotate = false;
      
      // Disable zoom (pinch zoom)
      globe.controls().enableZoom = false;
      globe.controls().minDistance = 320;
      globe.controls().maxDistance = 320;
      
      // Enable rotation with touch/mouse
      globe.controls().enableRotate = true;
      globe.controls().enablePan = false;

      // Camera position - zoomed out more for better view
      globe.camera().position.z = 320;
      
      // Set initial size first
      updateSize();
      
      // Force render after a short delay to ensure markers appear
      setTimeout(() => {
        globe.pointsData(markers);
      }, 100);
      
      // Handle resize
      const resizeObserver = new ResizeObserver(updateSize);
      if (globeRef.current) {
        resizeObserver.observe(globeRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    });
  }, [isClient]);

  if (!isClient) {
    return (
      <div
        ref={globeRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      />
    );
  }

  return (
    <div
      ref={globeRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    />
  );
}
