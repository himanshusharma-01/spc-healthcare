"use client";
import { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error - three-globe doesn't have TypeScript definitions
import Globe from "three-globe";

interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface ArcData {
  color?: string;
  [key: string]: unknown;
}

export function World({
  globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  },
  data = [],
}: {
  globeConfig?: GlobeConfig;
  data?: ArcData[];
}) {
  const globeRef = useRef<InstanceType<typeof Globe> | null>(null);
  const { scene } = useThree();

  // Create globe instance using Globe class
  const globe = useMemo(() => {
    if (typeof Globe !== 'undefined') {
      return new Globe();
    }
    return null;
  }, []);

  useEffect(() => {
    if (!globe) return;

    // Set globe properties - use a brighter earth texture
    globe.globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    
    // Configure globe appearance with strong glow effect
    const globeMaterial = globe.globeMaterial();
    globeMaterial.color = new THREE.Color("#00A3B4");
    globeMaterial.emissive = new THREE.Color("#00A3B4");
    globeMaterial.emissiveIntensity = 0.8; // Strong glow
    globeMaterial.shininess = 1.0;
    globeMaterial.metalness = 0.3;
    globeMaterial.roughness = 0.2;
    
    // Add a glowing overlay effect
    globeMaterial.onBeforeCompile = (shader: THREE.Shader) => {
      shader.uniforms.glowColor = { value: new THREE.Color("#00A3B4") };
      shader.uniforms.glowIntensity = { value: 1.5 };
    };

    // Set atmosphere with bright glow
    if (globeConfig.showAtmosphere) {
      globe.atmosphereColor("#00A3B4");
      globe.atmosphereAltitude(0.2);
      if (globe.atmosphereOpacity && typeof globe.atmosphereOpacity === 'function') {
        globe.atmosphereOpacity(0.3);
      }
    }

    // Set arcs data
    if (data.length > 0) {
      globe.arcsData(data);
      globe.arcColor((d: ArcData) => d.color || "#06b6d4");
      globe.arcDashLength(globeConfig.arcLength);
      globe.arcDashGap(1 - globeConfig.arcLength);
      globe.arcDashAnimateTime(globeConfig.arcTime);
    }

    // Add to scene
    scene.add(globe);
    
    // Set initial position using pointOfView if available, otherwise use camera
    if (globe.pointOfView && typeof globe.pointOfView === 'function') {
      globe.pointOfView(globeConfig.initialPosition, 0);
    }
    globeRef.current = globe;

    return () => {
      if (globe) {
        scene.remove(globe);
      }
    };
  }, [globe, globeConfig, data, scene]);

  useFrame(() => {
    if (globeRef.current && globeConfig.autoRotate) {
      globeRef.current.rotation.y += globeConfig.autoRotateSpeed * 0.01;
    }
  });

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 300]} 
        fov={45}
      />
      <ambientLight intensity={0.8} color={globeConfig.ambientLight} />
      <directionalLight
        position={[-10, 10, 5]}
        intensity={1.5}
        color={globeConfig.directionalLeftLight}
      />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color={globeConfig.directionalTopLight}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color={globeConfig.pointLight}
      />
      <pointLight
        position={[0, 10, 10]}
        intensity={1.5}
        color="#00A3B4"
      />
      <pointLight
        position={[0, -10, -10]}
        intensity={1}
        color="#00A676"
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={globeConfig.autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        target={[0, 0, 0]}
      />
    </>
  );
}
