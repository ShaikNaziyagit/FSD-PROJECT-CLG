import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Building = ({ position, size, color, label, rotationSpeed = 0.2 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} position={position}>
      <group>
        {/* Core Structure */}
        <mesh ref={meshRef}>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color="#0b1329"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Glowing Edges */}
        <mesh position={meshRef.current?.position || [0, 0, 0]}>
          <boxGeometry args={[size[0] * 1.02, size[1] * 1.02, size[2] * 1.02]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>

        {/* Top Beacon Light */}
        <mesh position={[0, size[1] / 2 + 0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* Floating Label */}
        {label && (
          <Text
            position={[0, size[1] / 2 + 0.7, 0]}
            fontSize={0.28}
            color="#e2e8f0"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </group>
    </Float>
  );
};

// Orbital Data Ring
const OrbitRing = ({ radius, color = '#6366f1' }) => {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <mesh>
        <ringGeometry args={[radius, radius + 0.05, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Satellite Beacon */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
    </group>
  );
};

const DigitalCampusNodes = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Central Campus Operating System Core (Holographic Tower) */}
      <Building
        position={[0, 0, 0]}
        size={[1.8, 3.8, 1.8]}
        color="#06b6d4"
        label="Campus Core"
        rotationSpeed={0.15}
      />

      {/* Academics & Research Pod */}
      <Building
        position={[-3.6, 0.4, 1.2]}
        size={[1.3, 2.6, 1.3]}
        color="#818cf8"
        label="Academics"
        rotationSpeed={-0.12}
      />

      {/* Innovation & Hackathon Hub */}
      <Building
        position={[3.8, -0.2, 0.8]}
        size={[1.4, 3.0, 1.4]}
        color="#c084fc"
        label="Innovations"
        rotationSpeed={0.18}
      />

      {/* Resource & Knowledge Center */}
      <Building
        position={[-2.2, -0.8, -2.5]}
        size={[1.2, 2.0, 1.2]}
        color="#38bdf8"
        label="Resources"
        rotationSpeed={0.1}
      />

      {/* Community & Events Arena */}
      <Building
        position={[2.4, 0.6, -2.2]}
        size={[1.5, 2.2, 1.5]}
        color="#a855f7"
        label="Community"
        rotationSpeed={-0.14}
      />

      {/* Dynamic Data Orbit Rings */}
      <OrbitRing radius={5.2} color="#06b6d4" />
      <OrbitRing radius={7.0} color="#a855f7" />
    </group>
  );
};

export default DigitalCampusNodes;
