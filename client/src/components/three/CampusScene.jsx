import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import DigitalCampusNodes from './DigitalCampusNodes';
import FloatingParticles from './FloatingParticles';
import DigitalGrid from './DigitalGrid';

// Smooth interactive camera movement following mouse pointer
const MouseCameraRig = () => {
  const cameraRef = useRef();

  useFrame((state) => {
    if (cameraRef.current) {
      const targetX = state.pointer.x * 1.5;
      const targetY = 2 + state.pointer.y * 0.8;

      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 9]} fov={55} />;
};

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn('[WebGL Fallback Activated]:', err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#050713] to-[#0d1527] border border-white/5 rounded-3xl">
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 bg-cyan-500/10 text-cyan-400">
              ⚡
            </div>
            <p className="text-sm text-slate-300 font-medium">CampusOS Digital Layer Active</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const CampusScene = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative ${className}`}>
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full pointer-events-auto"
        >
          <Suspense fallback={null}>
            {/* Cinematic Fog for Kage-like atmosphere */}
            <fog attach="fog" args={['#050713', 8, 22]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-6, 4, 3]} intensity={2.5} color="#06b6d4" distance={15} />
            <pointLight position={[6, 3, -3]} intensity={2.5} color="#a855f7" distance={15} />

            {/* Camera with mouse parallax */}
            <MouseCameraRig />

            {/* Futuristic Ground Grid */}
            <DigitalGrid />

            {/* Miniature Holographic Campus */}
            <DigitalCampusNodes />

            {/* Atmospheric Drifting Particles */}
            <FloatingParticles count={150} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};

export default CampusScene;
