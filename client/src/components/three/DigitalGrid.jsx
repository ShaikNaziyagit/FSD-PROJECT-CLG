import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const DigitalGrid = () => {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[0, -3.5, 0]} rotation={[-Math.PI / 2.2, 0, 0]}>
      {/* Soft light grid helper */}
      <gridHelper
        args={[40, 40, '#a5b4fc', '#e2e8f0']}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* Inner glowing cyber ring */}
      <mesh ref={gridRef} position={[0, 0, 0.05]}>
        <ringGeometry args={[6, 6.12, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default DigitalGrid;
