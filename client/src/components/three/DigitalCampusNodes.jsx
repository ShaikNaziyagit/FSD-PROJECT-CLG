import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Building = ({ position, size, color, label, rotationSpeed = 0.15, isCore = false }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.3} position={position}>
      <group>
        {/* Core Structure: Frosted white crystal / pearl glass */}
        <mesh ref={meshRef}>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={isCore ? '#fff7ed' : '#ffffff'}
            roughness={0.15}
            metalness={0.2}
            transparent={true}
            opacity={0.92}
          />
        </mesh>

        {/* Glowing Accent Edges */}
        <mesh position={meshRef.current?.position || [0, 0, 0]}>
          <boxGeometry args={[size[0] * 1.015, size[1] * 1.015, size[2] * 1.015]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
        </mesh>

        {/* Top Beacon Light */}
        <mesh position={[0, size[1] / 2 + 0.22, 0]}>
          <sphereGeometry args={[isCore ? 0.22 : 0.14, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* Floating Label */}
        {label && (
          <Text
            position={[0, size[1] / 2 + 0.65, 0]}
            fontSize={isCore ? 0.32 : 0.24}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#ea580c"
          >
            {label}
          </Text>
        )}
      </group>
    </Float>
  );
};

// Orbital Data Ring
const OrbitRing = ({ radius, color = '#f97316', speed = 0.12, tilt = Math.PI / 3 }) => {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <group ref={ringRef} rotation={[tilt, 0, 0]}>
      <mesh>
        <ringGeometry args={[radius, radius + 0.04, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Satellite Beacon */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#f97316" />
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
        color="#f97316"
        label="CAMPII CORE"
        rotationSpeed={0.12}
        isCore={true}
      />

      {/* Academics Node */}
      <Building
        position={[-3.4, 0.5, 1.0]}
        size={[1.2, 2.5, 1.2]}
        color="#f59e0b"
        label="Academics"
        rotationSpeed={-0.1}
      />

      {/* Placements Node */}
      <Building
        position={[3.5, 0.2, 0.8]}
        size={[1.3, 2.8, 1.3]}
        color="#ea580c"
        label="Placements"
        rotationSpeed={0.12}
      />

      {/* Exams Node */}
      <Building
        position={[-2.4, -0.6, -2.2]}
        size={[1.1, 2.0, 1.1]}
        color="#fb923c"
        label="Exams"
        rotationSpeed={0.08}
      />

      {/* Events Node */}
      <Building
        position={[2.4, 0.7, -2.0]}
        size={[1.3, 2.2, 1.3]}
        color="#facc15"
        label="Events"
        rotationSpeed={-0.12}
      />

      {/* Clubs & Societies */}
      <Building
        position={[-4.5, -0.3, -0.8]}
        size={[1.0, 1.8, 1.0]}
        color="#d97706"
        label="Clubs"
        rotationSpeed={0.09}
      />

      {/* Resources & Labs */}
      <Building
        position={[4.6, -0.2, -0.6]}
        size={[1.1, 2.1, 1.1]}
        color="#fdba74"
        label="Resources"
        rotationSpeed={-0.11}
      />

      {/* Campus Safety */}
      <Building
        position={[0, -0.8, 3.2]}
        size={[1.1, 1.9, 1.1]}
        color="#ef4444"
        label="Safety"
        rotationSpeed={0.1}
      />

      {/* Dynamic Data Orbit Rings */}
      <OrbitRing radius={5.2} color="#f97316" speed={0.12} tilt={Math.PI / 3.2} />
      <OrbitRing radius={6.8} color="#f59e0b" speed={-0.08} tilt={Math.PI / 2.8} />
      <OrbitRing radius={8.2} color="#fb923c" speed={0.06} tilt={Math.PI / 4} />
    </group>
  );
};

export default DigitalCampusNodes;
