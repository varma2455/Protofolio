import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const TechOrbMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.1;
      wireframeRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group>
        {/* Inner geometric core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#648CFF"
            wireframe
            transparent
            opacity={0.35}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer subtle node sphere */}
        <lineSegments ref={wireframeRef}>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(2.0, 2)]} />
          <lineBasicMaterial color="#9575FF" transparent opacity={0.15} />
        </lineSegments>

        {/* Central glowing point */}
        <pointLight position={[0, 0, 0]} intensity={2} color="#648CFF" distance={5} />
      </group>
    </Float>
  );
};

export const HeroVisual3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] pointer-events-none absolute inset-0 -z-1 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#648CFF" />
        <TechOrbMesh />
      </Canvas>
    </div>
  );
};
