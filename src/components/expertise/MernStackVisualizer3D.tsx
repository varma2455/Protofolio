import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TechCategoryType } from '../../types';

interface MernStackVisualizer3DProps {
  activeCategory: TechCategoryType;
  onSelectCategory: (cat: TechCategoryType) => void;
}

const NodeModule: React.FC<{
  position: [number, number, number];
  color: string;
  letter: string;
  label: string;
  sublabel: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ position, color, letter, label, sublabel, isActive, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isActive ? 0.8 : 0.25);
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.12;
      } else {
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1);
      }
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(isActive ? color : '#2A3342'),
        metalness: 0.9,
        roughness: isActive ? 0.15 : 0.35,
        emissive: new THREE.Color(isActive ? color : '#000000'),
        emissiveIntensity: isActive ? 0.35 : 0.0,
      }),
    [isActive, color]
  );

  return (
    <group ref={meshRef} position={position} onClick={onClick}>
      {/* Outer Hexagonal Tech Platform */}
      <mesh material={material}>
        <cylinderGeometry args={[0.75, 0.85, 0.22, 6]} />
      </mesh>

      {/* Floating Holographic Ring */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.02, 16, 32]} />
        <meshBasicMaterial color={color} transparent opacity={isActive ? 0.9 : 0.3} />
      </mesh>

      {/* Floating Center Glyph */}
      <mesh position={[0, 0.45, 0]}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.6 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Native 3D Positioned HTML Label */}
      <Html position={[0, -0.55, 0]} center distanceFactor={8} pointerEvents="none">
        <div className="flex flex-col items-center justify-center select-none pointer-events-none">
          <span
            className={`font-heading font-extrabold text-base leading-none ${
              isActive ? 'text-white' : 'text-slate-400'
            }`}
          >
            {letter}
          </span>
          <span
            className="text-[10px] font-mono mt-0.5 tracking-wider font-semibold whitespace-nowrap"
            style={{ color: isActive ? color : '#64748B' }}
          >
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
};

export const MernStackVisualizer3D: React.FC<MernStackVisualizer3DProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      data-cursor="drag"
      className="w-full h-80 relative rounded-2xl bg-[#080A0F] border border-white/10 overflow-hidden shadow-2xl cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 1.8, 4.6], fov: 42 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#648CFF" />
        <directionalLight position={[-4, -2, -2]} intensity={1.5} color="#9575FF" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, 0, 0]}>
            {/* MongoDB (Database) */}
            <NodeModule
              position={[-2.4, 0, 0]}
              color="#10B981"
              letter="M"
              label="MongoDB"
              sublabel="Database"
              isActive={activeCategory === 'database'}
              onClick={() => onSelectCategory('database')}
            />

            {/* Express.js (Backend) */}
            <NodeModule
              position={[-0.8, 0, 0]}
              color="#F59E0B"
              letter="E"
              label="Express.js"
              sublabel="REST APIs"
              isActive={activeCategory === 'backend'}
              onClick={() => onSelectCategory('backend')}
            />

            {/* React.js (Frontend) */}
            <NodeModule
              position={[0.8, 0, 0]}
              color="#648CFF"
              letter="R"
              label="React.js"
              sublabel="Client UI"
              isActive={activeCategory === 'frontend'}
              onClick={() => onSelectCategory('frontend')}
            />

            {/* Node.js (Runtime / Realtime) */}
            <NodeModule
              position={[2.4, 0, 0]}
              color="#9575FF"
              letter="N"
              label="Node.js"
              sublabel="Runtime"
              isActive={activeCategory === 'workflow' || activeCategory === 'realtime'}
              onClick={() => onSelectCategory('workflow')}
            />

            {/* Connecting Optical Circuit Line */}
            <lineSegments position={[0, -0.05, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-2.4, 0, 0, -0.8, 0, 0, -0.8, 0, 0, 0.8, 0, 0, 0.8, 0, 0, 2.4, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#648CFF" transparent opacity={0.3} />
            </lineSegments>
          </group>
        </Float>
      </Canvas>

      <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-[#10141D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D MERN Architecture Matrix • Click Pillars to Filter</span>
      </div>
    </div>
  );
};
