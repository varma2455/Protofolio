import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTheme; // 0.0 for dark, 1.0 for light

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  vec2 mouseNorm = (uMouse / uResolution.xy) * 2.0 - 1.0;
  
  // Multi-layered animated domain warping
  float t = uTime * 0.04;
  float n1 = snoise(st * 1.5 + vec2(t * 0.5, t * 0.3));
  float n2 = snoise(st * 2.2 - vec2(n1 * 0.4, t * 0.4) + mouseNorm * 0.15);
  float n3 = snoise(st * 3.5 + vec2(n2 * 0.3, n1 * 0.2));

  // Editorial dark palette
  vec3 darkBg = vec3(0.031, 0.039, 0.059); // #080A0F
  vec3 darkAccentBlue = vec3(0.392, 0.549, 1.0); // #648CFF
  vec3 darkAccentViolet = vec3(0.584, 0.458, 1.0); // #9575FF
  vec3 darkCard = vec3(0.063, 0.078, 0.114); // #10141D

  // Editorial light palette
  vec3 lightBg = vec3(0.972, 0.980, 0.988); // #F8FAFC
  vec3 lightAccent = vec3(0.2, 0.4, 0.9);
  vec3 lightMuted = vec3(0.91, 0.93, 0.96);

  // Blend color based on noise
  float intensity = smoothstep(-0.4, 0.8, n3);
  float blueRays = smoothstep(0.3, 0.95, n2) * 0.15;
  float violetRays = smoothstep(0.4, 0.98, n1) * 0.12;

  vec3 darkColor = mix(darkBg, darkCard, intensity * 0.6);
  darkColor += darkAccentBlue * blueRays;
  darkColor += darkAccentViolet * violetRays;

  vec3 lightColor = mix(lightBg, lightMuted, intensity * 0.4);
  lightColor += lightAccent * (blueRays * 0.5);

  vec3 finalColor = mix(darkColor, lightColor, uTheme);

  // Subtle vignette
  vec2 uvVignette = gl_FragCoord.xy / uResolution.xy;
  float vignette = uvVignette.x * uvVignette.y * (1.0 - uvVignette.x) * (1.0 - uvVignette.y);
  vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);

  gl_FragColor = vec4(finalColor * (0.85 + 0.15 * vignette), 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const ShaderPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTheme: { value: theme === 'light' ? 1.0 : 0.0 },
    }),
    []
  );

  useEffect(() => {
    uniforms.uTheme.value = theme === 'light' ? 1.0 : 0.0;
  }, [theme, uniforms]);

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    const handleMouseMove = (e: MouseEvent) => {
      // Damped target update
      uniforms.uMouse.value.x += (e.clientX - uniforms.uMouse.value.x) * 0.08;
      uniforms.uMouse.value.y += ((window.innerHeight - e.clientY) - uniforms.uMouse.value.y) * 0.08;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [uniforms]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const ShaderBackground: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Elegant fallback CSS gradient
    return (
      <div className="fixed inset-0 pointer-events-none -z-50 bg-[#080A0F] bg-radial-hero transition-colors duration-500" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden opacity-90 transition-opacity duration-700">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'low-power',
          preserveDrawingBuffer: false,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};
