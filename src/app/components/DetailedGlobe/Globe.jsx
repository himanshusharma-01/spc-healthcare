"use client";

import { useEffect, useRef, useState } from "react";

export default function DetailedGlobe() {
  const globeRef = useRef(null);
  const dotsContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const globeInstanceRef = useRef(null);

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
      globeInstanceRef.current = globe;

      const updateSize = () => {
        if (globeRef.current) {
          const width = globeRef.current.offsetWidth || 480;
          const height = globeRef.current.offsetHeight || 480;
          globe.width(width);
          globe.height(height);
        }
      };

      // Marker data with lat/lng coordinates - 9 Indian States
      const markers = [
        { name: "Punjab", lat: 31.1471, lng: 75.3412 },
        { name: "Haryana", lat: 29.0588, lng: 76.0856 },
        { name: "Rajasthan", lat: 27.0238, lng: 74.2179 },
        { name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
        { name: "Maharashtra", lat: 19.7515, lng: 75.7139 },
        { name: "Karnataka", lat: 15.3173, lng: 75.7139 },
        { name: "Tamil Nadu", lat: 11.1271, lng: 78.6569 },
        { name: "West Bengal", lat: 22.9868, lng: 87.8550 },
        { name: "Gujarat", lat: 23.0225, lng: 72.5714 },
      ];

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("rgba(255,255,255,0)") // transparent
        .showAtmosphere(false) // Remove blue atmosphere shade
        // Use HTML elements for flickering dots
        .htmlElementsData(markers)
        .htmlElement((d) => {
          const el = document.createElement('div');
          el.className = 'flicker-dot';
          el.style.width = '10px';
          el.style.height = '10px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = 'red';
          el.style.position = 'absolute';
          el.style.pointerEvents = 'none';
          return el;
        })
        .htmlLat((d) => d.lat)
        .htmlLng((d) => d.lng)
        .htmlAltitude(0.01);

      // Disable auto rotate - manual control only
      globe.controls().autoRotate = false;
      
      // Disable zoom (pinch zoom)
      globe.controls().enableZoom = false;
      globe.controls().minDistance = 320;
      globe.controls().maxDistance = 320;
      
      // Enable rotation with touch/mouse
      globe.controls().enableRotate = true;
      globe.controls().enablePan = false;

      // Increase rotation sensitivity for mobile devices
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      if (isMobile) {
        // Increase rotate speed for mobile (default is usually 1.0)
        globe.controls().rotateSpeed = 2.5; // Much more sensitive for mobile
      } else {
        globe.controls().rotateSpeed = 1.0; // Normal speed for desktop
      }

      // Camera position - zoomed out more for better view
      globe.camera().position.z = 320;
      
      // Set initial size first
      updateSize();

      // Dots are now created via htmlElementsData above
      // No need for manual dot creation

      // No need for manual position updates - globe.gl handles HTML element positioning
      
      // Handle resize
      const resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
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
    >
      <div
        ref={dotsContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
}
