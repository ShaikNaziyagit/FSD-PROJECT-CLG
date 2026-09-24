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
      {/* Infinite grid helper */}
      <gridHelper
        args={[40, 40, '#6366f1', '#1e293b']}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* Inner glowing cyber ring */}
      <mesh ref={gridRef} position={[0, 0, 0.05]}>
        <ringGeometry args={[6, 6.15, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default DigitalGrid;
