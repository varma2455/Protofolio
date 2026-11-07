import React, { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Fallback error boundary for WebGL environments
interface ErrorBoundaryState {
  hasError: boolean;
}

export class Scene3DErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGL 3D Context Warning:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[380px] flex items-center justify-center p-6 text-center">
          <div className="relative p-8 rounded-2xl bg-[#191713] border border-[rgba(214,179,106,0.20)] max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#211D17] flex items-center justify-center border border-[#D6B36A]/30">
              <span className="text-2xl font-mono text-[#D6B36A]">&lt;/&gt;</span>
            </div>
            <h4 className="text-lg font-bold text-[#F5F0E6] mb-2">MERN Architecture Engine</h4>
            <p className="text-xs text-[#B9B2A5] font-mono">
              Hardware accelerated WebGL paused. Full application features active.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// 3D Gyroscopic Core Component with Obsidian Gold Materials
const GyroCore: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const centralMeshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.35;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.06);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.06);

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2;
      outerRingRef.current.rotation.y = targetRotation.current.y * 0.5;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y += delta * 0.3;
      midRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.35;
      innerRingRef.current.rotation.x += targetRotation.current.x * 0.4;
    }
    if (centralMeshRef.current) {
      centralMeshRef.current.rotation.x += delta * 0.4;
      centralMeshRef.current.rotation.y += delta * 0.5;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 2.5) * 0.4;
    }
  });

  // Elevated obsidian metallic surface material
  const obsidianMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#211D17'),
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  // Refined champagne gold chrome material
  const champagneGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D6B36A'),
        metalness: 0.94,
        roughness: 0.15,
        emissive: new THREE.Color('#423314'),
        emissiveIntensity: 0.35,
      }),
    []
  );

  // Warm bronze gold anodized material
  const bronzeGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#B99555'),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color('#332510'),
        emissiveIntensity: 0.25,
      }),
    []
  );

  // Core crystalline prism (Obsidian Glass)
  const corePrismMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#191713'),
        metalness: 0.88,
        roughness: 0.18,
        transmission: 0.3,
        thickness: 1.2,
        ior: 1.48,
        reflectivity: 0.92,
        clearcoat: 0.92,
      }),
    []
  );

  // MERN stack 4 satellite nodes
  const satelliteNodes = useMemo(
    () => [
      { pos: [1.8, 0.4, 0.5] as [number, number, number], color: '#10B981', label: 'M' },
      { pos: [-1.7, 0.8, -0.6] as [number, number, number], color: '#F59E0B', label: 'E' },
      { pos: [0.6, -1.8, 0.7] as [number, number, number], color: '#D6B36A', label: 'R' },
      { pos: [-0.8, -1.5, -0.8] as [number, number, number], color: '#B99555', label: 'N' },
    ],
    []
  );

  return (
    <Float speed={reducedMotion ? 0 : 2} rotationIntensity={reducedMotion ? 0 : 0.4} floatIntensity={reducedMotion ? 0 : 0.5}>
      <group position={[0, 0, 0]}>
        {/* Outer Ring — Elevated Obsidian Metal */}
        <group ref={outerRingRef}>
          <mesh material={obsidianMetalMaterial}>
            <torusGeometry args={[2.2, 0.045, 24, 100]} />
          </mesh>
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}
              material={champagneGoldMaterial}
            >
              <boxGeometry args={[0.1, 0.1, 0.14]} />
            </mesh>
          ))}
        </group>

        {/* Mid Ring — Warm Bronze Gold Anodized */}
        <group ref={midRingRef}>
          <mesh material={bronzeGoldMaterial}>
            <torusGeometry args={[1.7, 0.04, 24, 100]} />
          </mesh>
          {[Math.PI / 4, (Math.PI * 3) / 4, (Math.PI * 5) / 4, (Math.PI * 7) / 4].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.7, 0, Math.sin(angle) * 1.7]}
              material={champagneGoldMaterial}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
            </mesh>
          ))}
        </group>

        {/* Inner Ring — High-Gloss Champagne Gold */}
        <group ref={innerRingRef}>
          <mesh material={champagneGoldMaterial}>
            <torusGeometry args={[1.25, 0.035, 24, 80]} />
          </mesh>
        </group>

        {/* Central Polyhedral Developer Core */}
        <mesh ref={centralMeshRef} material={corePrismMaterial}>
          <octahedronGeometry args={[0.72, 0]} />
        </mesh>

        {/* Floating Wireframe Halo */}
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#D6B36A" wireframe transparent opacity={0.18} />
        </mesh>

        {/* MERN Satellites */}
        {satelliteNodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
              metalness={0.9}
            />
          </mesh>
        ))}

        {/* Dynamic Inner Point Light (Soft Gold Illumination) */}
        <pointLight
          ref={lightRef}
          color="#D6B36A"
          intensity={2.0}
          distance={8}
          decay={2}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
};

export interface Scene3DProps {
  className?: string;
  enableInteraction?: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({ className = 'w-full h-full' }) => {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={`relative ${className}`}>
      <Scene3DErrorBoundary>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D6B36A]/20 border-t-[#D6B36A] animate-spin" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            {/* Ambient & Key Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 6, 5]} intensity={1.2} color="#F5F0E6" />
            <directionalLight position={[-5, -4, -4]} intensity={1.0} color="#B99555" />
            <pointLight position={[0, 3, 2]} intensity={1.5} color="#D6B36A" distance={10} />

            {/* Sparkles Particle Field */}
            {!reducedMotion && (
              <Sparkles
                count={45}
                scale={6}
                size={1.8}
                speed={0.3}
                opacity={0.5}
                color="#D6B36A"
              />
            )}

            {/* Gyroscopic Core */}
            <GyroCore reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </Scene3DErrorBoundary>
    </div>
  );
};

export default Scene3D;
