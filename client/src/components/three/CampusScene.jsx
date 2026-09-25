import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import RealisticCampus3D from './RealisticCampus3D';

// Smooth interactive camera movement following mouse pointer for 3D parallax
const MouseCameraRig = () => {
  const cameraRef = useRef();

  useFrame((state) => {
    if (cameraRef.current) {
      // Gentle parallax - creates spatial 3D architectural depth as mouse moves
      const targetX = state.pointer.x * 1.5;
      const targetY = 0.2 + state.pointer.y * 0.8;
      const targetZ = 6.2;

      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);
      cameraRef.current.lookAt(0, 0.3, -4);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.2, 6.2]} fov={50} />;
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
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/backgrounds/campus_realistic.jpg')` }}
        />
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
          className="w-full h-full pointer-events-none"
        >
          <Suspense fallback={null}>
            {/* Warm twilight sunset atmospheric fog */}
            <fog attach="fog" args={['#140f0c', 10, 24]} />

            {/* Warm Golden Hour Sunset Architectural Lighting */}
            <ambientLight intensity={0.9} color="#ffedd5" />
            <directionalLight position={[8, 14, 8]} intensity={1.8} color="#fed7aa" />

            {/* Building facade accent point lights */}
            <pointLight position={[0, 4, 0]} intensity={1.6} color="#f59e0b" distance={12} />
            <pointLight position={[-4, 1, 1]} intensity={1.4} color="#f97316" distance={10} />
            <pointLight position={[4, 1, 1]} intensity={1.4} color="#fbbf24" distance={10} />

            {/* Mouse camera rig for live 3D depth */}
            <MouseCameraRig />

            {/* Live 3D Realistic Campus Building */}
            <RealisticCampus3D />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};

export default CampusScene;
