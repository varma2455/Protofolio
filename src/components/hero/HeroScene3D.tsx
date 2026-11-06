import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GyroscopicCore: React.FC = () => {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerFacetRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Mouse vector tracking
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Smooth mouse parallax interpolation
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.05);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.05);

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.25;
      outerRingRef.current.rotation.y = targetRotation.current.y * 0.6;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y += delta * 0.35;
      midRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerFacetRef.current) {
      innerFacetRef.current.rotation.x -= delta * 0.4;
      innerFacetRef.current.rotation.y += delta * 0.45;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.4;
    }
  });

  // Metallic brushed titanium material settings
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3A4454'),
        metalness: 0.92,
        roughness: 0.2,
        envMapIntensity: 1.5,
      }),
    []
  );

  const chromeAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#648CFF'),
        metalness: 0.96,
        roughness: 0.12,
        emissive: new THREE.Color('#1B2B50'),
        emissiveIntensity: 0.25,
      }),
    []
  );

  const corePrismMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0A0E17'),
        metalness: 0.85,
        roughness: 0.15,
        transmission: 0.4,
        thickness: 1.2,
        ior: 1.5,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[0, 0, 0]}>
        
        {/* Outer Gimbal Ring (Machined Titanium) */}
        <group ref={outerRingRef}>
          <mesh material={titaniumMaterial}>
            <torusGeometry args={[2.3, 0.035, 24, 100]} />
          </mesh>
          {/* Ring Calibration Nodes */}
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0]}
              material={chromeAccentMaterial}
            >
              <boxGeometry args={[0.08, 0.08, 0.12]} />
            </mesh>
          ))}
        </group>

        {/* Middle Gimbal Ring (Counter-Rotating) */}
        <group ref={midRingRef}>
          <mesh material={chromeAccentMaterial}>
            <torusGeometry args={[1.85, 0.028, 20, 90]} />
          </mesh>
          <mesh material={titaniumMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.86, 1.86, 0.02, 32, 1, true]} />
          </mesh>
        </group>

        {/* Inner Optical Core Prism */}
        <mesh ref={innerFacetRef} material={corePrismMaterial}>
          <octahedronGeometry args={[1.05, 0]} />
        </mesh>

        {/* Geometric Wireframe Cage around Core */}
        <lineSegments>
          <wireframeGeometry args={[new THREE.OctahedronGeometry(1.22, 0)]} />
          <lineBasicMaterial color="#648CFF" transparent opacity={0.3} />
        </lineSegments>

        {/* Internal Core Pulsing Light Source */}
        <pointLight
          ref={lightRef}
          position={[0, 0, 0]}
          color="#648CFF"
          intensity={2.2}
          distance={6}
        />
        
        {/* Accent Violet Inner Point Light */}
        <pointLight
          position={[0.5, -0.5, 0.5]}
          color="#9575FF"
          intensity={1.5}
          distance={4}
        />

      </group>
    </Float>
  );
};

export const HeroScene3D: React.FC = () => {
  return (
    <div
      data-cursor="drag"
      className="w-full h-full min-h-[380px] sm:min-h-[460px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        {/* Cinematic Environmental Lighting */}
        <ambientLight intensity={0.4} color="#0d1424" />
        
        {/* Key Light (Cyan-Blue) */}
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.0}
          color="#648CFF"
        />

        {/* Rim Light (Violet Sheen) */}
        <directionalLight
          position={[-6, -4, -3]}
          intensity={2.5}
          color="#9575FF"
        />

        {/* Warm Subtle Fill */}
        <pointLight
          position={[3, -4, 3]}
          intensity={0.6}
          color="#F59E0B"
        />

        {/* Atmospheric Floating Dust Particles */}
        <Sparkles
          count={55}
          scale={7}
          size={2.2}
          speed={0.4}
          opacity={0.35}
          color="#648CFF"
        />
        <Sparkles
          count={35}
          scale={6}
          size={2.8}
          speed={0.3}
          opacity={0.25}
          color="#9575FF"
        />

        {/* 3D Gyroscopic Core */}
        <GyroscopicCore />
      </Canvas>

      {/* Interactive Hint Indicator */}
      <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-400 pointer-events-none flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
        <span>Interactive 3D Core • Drag / Orbit</span>
      </div>
    </div>
  );
};
