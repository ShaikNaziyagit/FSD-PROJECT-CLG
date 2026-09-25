import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Live 3D Realistic Campus Stage with Interactive Parallax and Architectural Accents
const RealisticCampus3D = () => {
  const groupRef = useRef();
  const beaconRef = useRef();
  const clockHandRef = useRef();

  // Load the realistic campus building texture
  const texture = useLoader(THREE.TextureLoader, '/assets/backgrounds/campus_realistic.jpg');
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  // Real-time animation loop
  useFrame((state) => {
    // Subtle cinematic breathing sway
    if (groupRef.current) {
      groupRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }

    // Pulsing pinnacle beacon light on top of central tower
    if (beaconRef.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 3) + 1) * 0.5;
      beaconRef.current.material.opacity = 0.4 + pulse * 0.6;
    }

    // Rotating clock hand on central tower
    if (clockHandRef.current) {
      clockHandRef.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
  });

  // Pre-generate warm sunset drifting embers/dust
  const particles = useMemo(() => {
    const coords = [];
    for (let i = 0; i < 90; i++) {
      coords.push({
        x: (Math.random() - 0.5) * 22,
        y: Math.random() * 9 - 1,
        z: (Math.random() - 0.5) * 12 + 1,
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        scale: 0.04 + Math.random() * 0.06,
        color: Math.random() > 0.4 ? '#f97316' : '#fbbf24',
      });
    }
    return coords;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* 
        Main Realistic Campus Building Backdrop
        Mapped onto a large curved architectural 3D cyclorama
      */}
      <mesh position={[0, 0.4, -4.5]}>
        <planeGeometry args={[26, 14.6, 32, 18]} />
        <meshBasicMaterial
          map={texture}
          transparent={false}
          toneMapped={false}
        />
      </mesh>

      {/* 3D Dynamic Architectural Lights positioned on Building Facade */}
      {/* Central Founders Hall Main Entrance Warm Illumination */}
      <pointLight position={[0, 0, -3.8]} color="#f59e0b" intensity={2.8} distance={8} />

      {/* Clock Tower Pinnacle Ambient Light */}
      <pointLight position={[0, 4.8, -3.8]} color="#fb923c" intensity={2.2} distance={7} />

      {/* West Wing Classroom Lights */}
      <pointLight position={[-6.5, 0.8, -3.8]} color="#f97316" intensity={1.8} distance={7} />

      {/* East Wing Classroom Lights */}
      <pointLight position={[6.5, 0.8, -3.8]} color="#f97316" intensity={1.8} distance={7} />

      {/* Live 3D Pinnacle Beacon Light on Clock Tower Apex */}
      <group position={[0.02, 5.75, -4.2]}>
        <mesh ref={beaconRef}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
        <pointLight color="#fbbf24" intensity={2.5} distance={6} />
      </group>

      {/* Live 3D Clock Minute Hand on Tower Face */}
      <group position={[0.02, 3.82, -4.2]}>
        <mesh ref={clockHandRef}>
          <boxGeometry args={[0.04, 0.35, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Clock center pin */}
        <mesh>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#ea580c" />
        </mesh>
      </group>

      {/* Live 3D Campus Lampposts casting warm golden pools on the Quad */}
      {[-4.8, -1.8, 1.8, 4.8].map((x, idx) => (
        <group key={idx} position={[x, -2.4, -1.8]}>
          {/* Post */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 1.6, 8]} />
            <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Lantern Head */}
          <mesh position={[0, 1.65, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, 1.65, 0]} color="#f59e0b" intensity={1.2} distance={4} />
        </group>
      ))}

      {/* Live 3D Drifting Golden Sunset Embers & Particles */}
      {particles.map((p, i) => (
        <ParticleItem key={i} particle={p} />
      ))}
    </group>
  );
};

// Animated drifting sunset particle
const ParticleItem = ({ particle }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * particle.speed + particle.offset;
      meshRef.current.position.y = particle.y + Math.sin(t) * 0.4;
      meshRef.current.position.x = particle.x + Math.cos(t * 0.7) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[particle.x, particle.y, particle.z]}>
      <sphereGeometry args={[particle.scale, 8, 8]} />
      <meshBasicMaterial color={particle.color} transparent opacity={0.65} />
    </mesh>
  );
};

export default RealisticCampus3D;
