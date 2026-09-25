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
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      spd[i * 3] = (Math.random() - 0.5) * 0.004;
      spd[i * 3 + 1] = Math.random() * 0.007 + 0.002; // slow upward drift
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
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
        size={0.14}
        color="#0284c7"
        transparent
        opacity={0.65}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export default FloatingParticles;
