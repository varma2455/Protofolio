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
          <div className="relative p-8 rounded-2xl glass-panel border border-cyan-500/30 max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/40">
              <span className="text-2xl font-mono text-cyan-400">&lt;/&gt;</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">MERN Architecture Engine</h4>
            <p className="text-xs text-slate-400 font-mono">
              Hardware accelerated WebGL paused. Full application features active.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// 3D Gyroscopic Core Component
const GyroCore: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const centralMeshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth cursor interpolation
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
      lightRef.current.intensity = 2.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.6;
    }
  });

  // Metallic brushed titanium material
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2A3245'),
        metalness: 0.94,
        roughness: 0.22,
      }),
    []
  );

  // Chrome electric blue material
  const cyanChromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00E5FF'),
        metalness: 0.98,
        roughness: 0.12,
        emissive: new THREE.Color('#003B4D'),
        emissiveIntensity: 0.4,
      }),
    []
  );

  // Violet anodized material
  const violetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#6C63FF'),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color('#2A1855'),
        emissiveIntensity: 0.3,
      }),
    []
  );

  // Core crystalline prism
  const corePrismMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0F172A'),
        metalness: 0.9,
        roughness: 0.15,
        transmission: 0.35,
        thickness: 1.2,
        ior: 1.5,
        reflectivity: 0.95,
        clearcoat: 1.0,
      }),
    []
  );

  // MERN stack 4 satellite nodes
  const satelliteNodes = useMemo(
    () => [
      { pos: [1.8, 0.4, 0.5] as [number, number, number], color: '#10B981', label: 'M' },
      { pos: [-1.7, 0.8, -0.6] as [number, number, number], color: '#F59E0B', label: 'E' },
      { pos: [0.6, -1.8, 0.7] as [number, number, number], color: '#00E5FF', label: 'R' },
      { pos: [-0.8, -1.5, -0.8] as [number, number, number], color: '#6C63FF', label: 'N' },
    ],
    []
  );

  return (
    <Float speed={reducedMotion ? 0 : 2} rotationIntensity={reducedMotion ? 0 : 0.4} floatIntensity={reducedMotion ? 0 : 0.5}>
      <group position={[0, 0, 0]}>
        {/* Outer Ring — Machined Titanium */}
        <group ref={outerRingRef}>
          <mesh material={titaniumMaterial}>
            <torusGeometry args={[2.2, 0.045, 24, 100]} />
          </mesh>
          {/* Gimbal Calibrators */}
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}
              material={cyanChromeMaterial}
            >
              <boxGeometry args={[0.1, 0.1, 0.14]} />
            </mesh>
          ))}
        </group>

        {/* Mid Ring — Electric Violet Anodized */}
        <group ref={midRingRef}>
          <mesh material={violetMaterial}>
            <torusGeometry args={[1.7, 0.04, 24, 100]} />
          </mesh>
          {[Math.PI / 4, (Math.PI * 3) / 4, (Math.PI * 5) / 4, (Math.PI * 7) / 4].map((angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.7, 0, Math.sin(angle) * 1.7]}
              material={cyanChromeMaterial}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
            </mesh>
          ))}
        </group>

        {/* Inner Ring — High-Gloss Cyan */}
        <group ref={innerRingRef}>
          <mesh material={cyanChromeMaterial}>
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
          <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.2} />
        </mesh>

        {/* MERN Satellites */}
        {satelliteNodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              metalness={0.9}
            />
          </mesh>
        ))}

        {/* Dynamic Inner Point Light */}
        <pointLight
          ref={lightRef}
          color="#00E5FF"
          intensity={2.5}
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
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
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
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 6, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-5, -4, -4]} intensity={1.2} color="#6C63FF" />
            <pointLight position={[0, 3, 2]} intensity={1.8} color="#00E5FF" distance={10} />

            {/* Sparkles Particle Field */}
            {!reducedMotion && (
              <Sparkles
                count={55}
                scale={6}
                size={2}
                speed={0.4}
                opacity={0.6}
                color="#00E5FF"
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
