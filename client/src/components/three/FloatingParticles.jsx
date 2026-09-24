import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingParticles = ({ count = 120 }) => {
  const meshRef = useRef();

  // Generate particle positions and randomized movement speeds
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = Math.random() * 0.008 + 0.002; // slow upward drift
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const array = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i * 3 + 1];

      // Reset when particle floats too high
      if (array[i * 3 + 1] > 8) {
        array[i * 3 + 1] = -8;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#06b6d4"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default FloatingParticles;
