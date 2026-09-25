import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Procedural stylized tree for campus greenery
const CampusTree = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.9, 6]} />
        <meshStandardMaterial color="#2d1b11" roughness={0.9} />
      </mesh>
      {/* Foliage Tier 1 */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.55, 0.9, 6]} />
        <meshStandardMaterial color="#14532d" roughness={0.7} />
      </mesh>
      {/* Foliage Tier 2 */}
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.42, 0.7, 6]} />
        <meshStandardMaterial color="#166534" roughness={0.7} />
      </mesh>
      {/* Foliage Top */}
      <mesh position={[0, 1.9, 0]}>
        <coneGeometry args={[0.26, 0.5, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Illuminated Walkway Lamp / Bollard
const PathwayLamp = ({ position, color = '#f97316' }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#292524" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight position={[0, 0.75, 0]} color={color} intensity={0.5} distance={2.5} />
    </group>
  );
};

// Animated Glowing Skywalk / Bridge between campus buildings
const Skywalk = ({ start, end, color = '#f97316' }) => {
  const pulseRef = useRef();
  
  // Calculate mid point, length and rotation
  const vStart = new THREE.Vector3(...start);
  const vEnd = new THREE.Vector3(...end);
  const vMid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
  const distance = vStart.distanceTo(vEnd);
  
  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.elapsedTime * 0.4) % 1;
      pulseRef.current.position.lerpVectors(vStart, vEnd, t);
    }
  });

  return (
    <group>
      {/* Glass Skybridge Tube */}
      <mesh position={vMid.toArray()}>
        <boxGeometry args={[0.45, 0.4, distance]} />
        <meshStandardMaterial
          color="#1c1917"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* Glowing Handrails */}
      <mesh position={[vMid.x + 0.22, vMid.y + 0.15, vMid.z]}>
        <boxGeometry args={[0.04, 0.04, distance]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      <mesh position={[vMid.x - 0.22, vMid.y + 0.15, vMid.z]}>
        <boxGeometry args={[0.04, 0.04, distance]} />
        <meshBasicMaterial color={color} opacity={0.8} transparent />
      </mesh>
      {/* Animated Light Pulse traveling between buildings */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// 1. Central University Administration & Clock Tower Citadel
const CentralUniversityTower = ({ position = [0, 0, 0] }) => {
  const beaconRef = useRef();
  const clockHandRef = useRef();

  useFrame((state) => {
    if (beaconRef.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 4) + 1) * 0.5;
      beaconRef.current.material.opacity = 0.5 + pulse * 0.5;
    }
    if (clockHandRef.current) {
      clockHandRef.current.rotation.z = -state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Base Tier / Entrance Portico */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[4.2, 1.2, 3.4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Grand Entrance Steps */}
      <mesh position={[0, 0.2, 1.9]}>
        <boxGeometry args={[2.4, 0.4, 0.8]} />
        <meshStandardMaterial color="#292524" roughness={0.6} />
      </mesh>
      {/* Portico Entrance Arch Columns */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 1.7]}>
          <cylinderGeometry args={[0.08, 0.09, 0.8, 12]} />
          <meshStandardMaterial color="#f97316" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}

      {/* Main Building Body Tier 1 */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[3.4, 2.0, 2.8]} />
        <meshStandardMaterial color="#171412" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Window Matrices (Illuminated warm golden and vibrant orange office lights) */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <React.Fragment key={`win-${i}`}>
          <mesh position={[x, 2.4, 1.42]}>
            <boxGeometry args={[0.35, 0.5, 0.02]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#f97316' : '#f59e0b'} opacity={0.85} transparent />
          </mesh>
          <mesh position={[x, 1.7, 1.42]}>
            <boxGeometry args={[0.35, 0.4, 0.02]} />
            <meshBasicMaterial color={i % 2 === 1 ? '#f97316' : '#f59e0b'} opacity={0.75} transparent />
          </mesh>
        </React.Fragment>
      ))}

      {/* Tower Tier 2 */}
      <mesh position={[0, 3.9, 0]}>
        <boxGeometry args={[2.2, 1.4, 2.0]} />
        <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Clock Chamber Tier 3 */}
      <mesh position={[0, 5.1, 0]}>
        <boxGeometry args={[1.5, 1.0, 1.5]} />
        <meshStandardMaterial color="#292524" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Clock Faces (Front and Back) */}
      <mesh position={[0, 5.1, 0.76]}>
        <circleGeometry args={[0.38, 24]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>
      <mesh position={[0, 5.1, 0.78]} ref={clockHandRef}>
        <boxGeometry args={[0.04, 0.32, 0.01]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Spire Base Roof */}
      <mesh position={[0, 5.8, 0]}>
        <coneGeometry args={[1.1, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#44281d" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Pinnacle Architectural Spire */}
      <mesh position={[0, 6.7, 0]}>
        <cylinderGeometry args={[0.03, 0.08, 1.4, 8]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Pulsing Beacon Light on Top */}
      <mesh position={[0, 7.45, 0]} ref={beaconRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffedd5" transparent opacity={0.95} />
      </mesh>
      <pointLight position={[0, 7.5, 0]} color="#f97316" intensity={2.0} distance={8} />

      {/* Central Floating Label */}
      <Text
        position={[0, 4.8, 1.1]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#ea580c"
      >
        CAMPII CENTRAL
      </Text>
    </group>
  );
};

// 2. Computer Science & IT Tech Complex (West Campus)
const ComputerScienceTechBlock = ({ position = [-4.6, 0, -0.6] }) => {
  return (
    <group position={position}>
      {/* Main Glass Curtain Block */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2.6, 3.6, 2.2]} />
        <meshStandardMaterial
          color="#1c1917"
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Orange Corner Struts */}
      {[-1.3, 1.3].map((x, xi) =>
        [-1.1, 1.1].map((z, zi) => (
          <mesh key={`${xi}-${zi}`} position={[x, 1.8, z]}>
            <boxGeometry args={[0.06, 3.62, 0.06]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
        ))
      )}

      {/* Floor Plate Dividers */}
      {[0.9, 1.8, 2.7, 3.5].map((y, i) => (
        <mesh key={`flr-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[2.64, 0.08, 2.24]} />
          <meshBasicMaterial color="#f59e0b" opacity={0.6} transparent />
        </mesh>
      ))}

      {/* Internal Server Room Glowing Data Cubes */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.2, 2.2, 1.0]} />
        <meshBasicMaterial color="#ea580c" opacity={0.35} transparent />
      </mesh>

      {/* Rooftop Communications Satellite Dish */}
      <mesh position={[0.6, 3.85, 0.4]} rotation={[0.4, 0.6, 0]}>
        <sphereGeometry args={[0.35, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#e7e5e4" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.6, 3.7, 0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {/* Antenna Mast */}
      <mesh position={[-0.7, 4.1, -0.4]}>
        <cylinderGeometry args={[0.02, 0.04, 0.8, 8]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>
      <mesh position={[-0.7, 4.5, -0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffedd5" />
      </mesh>

      <Text
        position={[0, 3.3, 1.15]}
        fontSize={0.18}
        color="#ffedd5"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ea580c"
      >
        CS & ENGINEERING
      </Text>
    </group>
  );
};

// 3. Central University Library & Rotunda Atrium (North Campus)
const CentralLibraryRotunda = ({ position = [0, 0, -4.8] }) => {
  return (
    <group position={position}>
      {/* Stepped Base Podium */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.6, 32]} />
        <meshStandardMaterial color="#292524" roughness={0.6} />
      </mesh>

      {/* Main Cylinder Reading Hall with warm interior glow */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 1.6, 32]} />
        <meshStandardMaterial color="#1c1917" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Architectural Library Windows */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = Math.cos(angle) * 2.21;
        const z = Math.sin(angle) * 2.21;
        return (
          <mesh key={i} position={[x, 1.4, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <boxGeometry args={[0.22, 1.1, 0.02]} />
            <meshBasicMaterial color="#f59e0b" opacity={0.85} transparent />
          </mesh>
        );
      })}

      {/* Upper Gallery Ring */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.2, 32]} />
        <meshStandardMaterial color="#292524" metalness={0.8} />
      </mesh>

      {/* Translucent Glass Dome Skylight */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[1.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#f97316"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>
      <pointLight position={[0, 2.5, 0]} color="#f59e0b" intensity={2.0} distance={6} />

      {/* Dome Top Crown */}
      <mesh position={[0, 3.4, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffedd5" />
      </mesh>

      <Text
        position={[0, 2.1, 2.35]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ea580c"
      >
        CAMPUS LIBRARY
      </Text>
    </group>
  );
};

// 4. Placements & Career Innovation Pavilion (East Campus)
const PlacementsInnovationCenter = ({ position = [4.8, 0, -0.4] }) => {
  return (
    <group position={position}>
      {/* Angled Modern Cantilever Structure */}
      <mesh position={[0, 1.5, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[2.5, 3.0, 2.4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Cantilevered Top Executive Floor */}
      <mesh position={[0.4, 2.8, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[2.8, 0.7, 2.6]} />
        <meshStandardMaterial color="#292524" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Placement Marquee Digital Strip */}
      <mesh position={[0.4, 2.8, 1.33]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[2.7, 0.25, 0.02]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>

      {/* Glass Windows */}
      {[-0.8, -0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 1.4, 1.22]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.45, 1.5, 0.02]} />
          <meshBasicMaterial color="#fb923c" opacity={0.7} transparent />
        </mesh>
      ))}

      {/* Rooftop Solar Array / Tech Grid */}
      <mesh position={[0.4, 3.22, 0]} rotation={[0.1, -0.2, 0]}>
        <boxGeometry args={[2.4, 0.04, 2.2]} />
        <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.2} />
      </mesh>

      <Text
        position={[0.4, 2.4, 1.35]}
        fontSize={0.17}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ea580c"
      >
        CAREERS & PLACEMENTS
      </Text>
    </group>
  );
};

// 5. Student Quad, Auditorium & Sports Pavilion (South-West)
const StudentAuditoriumPavilion = ({ position = [-3.8, 0, 3.2] }) => {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Modern Arched Arena Roof */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 2.4, 24, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#292524" roughness={0.3} metalness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Base Foundation */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.6, 0.6, 2.6]} />
        <meshStandardMaterial color="#1c1917" />
      </mesh>
      {/* Glowing Auditorium Glass Front */}
      <mesh position={[0, 0.8, 1.21]}>
        <boxGeometry args={[2.0, 0.7, 0.02]} />
        <meshBasicMaterial color="#f59e0b" opacity={0.8} transparent />
      </mesh>

      <Text
        position={[0, 1.6, 0.8]}
        fontSize={0.16}
        color="#ffedd5"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ea580c"
      >
        AUDITORIUM & QUAD
      </Text>
    </group>
  );
};

// 6. Science & Biotechnology Center (South-East)
const ScienceBiotechHub = ({ position = [3.8, 0, 3.4] }) => {
  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[2.2, 2.8, 2.0]} />
        <meshStandardMaterial color="#1c1917" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Glowing Bio-Hex pattern windows */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 1.4, 1.02]}>
          <boxGeometry args={[0.35, 1.8, 0.02]} />
          <meshBasicMaterial color="#f97316" opacity={0.8} transparent />
        </mesh>
      ))}
      {/* Observatory Dome on roof */}
      <mesh position={[0, 2.9, 0]}>
        <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
      </mesh>

      <Text
        position={[0, 2.5, 1.05]}
        fontSize={0.16}
        color="#ffedd5"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ea580c"
      >
        SCIENCE & RESEARCH
      </Text>
    </group>
  );
};

// Main Campus Scene Assembly
const CollegeCampusBuildings = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.06;
    }
  });

  const treePositions = useMemo(() => [
    [-1.8, 0, 1.8], [-2.4, 0, 1.4], [1.8, 0, 1.8], [2.4, 0, 1.4],
    [-1.2, 0, 2.6], [1.2, 0, 2.6],
    [-2.6, 0, -2.8], [-1.8, 0, -3.6], [2.6, 0, -2.8], [1.8, 0, -3.6],
    [-5.8, 0, 1.8], [-5.6, 0, -2.2], [5.8, 0, 1.8], [5.6, 0, -2.2],
    [-0.8, 0, -5.8], [0.8, 0, -5.8], [3.2, 0, 4.6], [-3.2, 0, 4.6],
  ], []);

  const lampPositions = useMemo(() => [
    [-1.2, 0, 1.2], [1.2, 0, 1.2],
    [-1.2, 0, 2.4], [1.2, 0, 2.4],
    [-2.2, 0, -0.4], [2.2, 0, -0.4],
    [-1.4, 0, -2.2], [1.4, 0, -2.2],
    [0, 0, 3.4],
  ], []);

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {/* Ground Architectural Campus Plaza */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14.5, 0.1, 48]} />
        <meshStandardMaterial color="#14110e" roughness={0.8} metalness={0.4} />
      </mesh>

      {/* Subtle Paved Walkways */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.6, 48]} />
        <meshBasicMaterial color="#f97316" opacity={0.25} transparent />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 12]} />
        <meshBasicMaterial color="#292524" opacity={0.7} transparent />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[1.2, 14]} />
        <meshBasicMaterial color="#292524" opacity={0.7} transparent />
      </mesh>

      {/* Buildings */}
      <CentralUniversityTower position={[0, 0, 0]} />
      <ComputerScienceTechBlock position={[-4.5, 0, -0.4]} />
      <CentralLibraryRotunda position={[0, 0, -4.6]} />
      <PlacementsInnovationCenter position={[4.6, 0, -0.3]} />
      <StudentAuditoriumPavilion position={[-3.8, 0, 3.2]} />
      <ScienceBiotechHub position={[3.8, 0, 3.3]} />

      {/* Elevated Glass Skywalk Bridges Connecting Campus Wings */}
      <Skywalk start={[-2.1, 2.4, 0]} end={[-3.2, 2.4, -0.2]} color="#f97316" />
      <Skywalk start={[2.1, 2.4, 0]} end={[3.3, 2.4, -0.1]} color="#f59e0b" />
      <Skywalk start={[0, 2.6, -1.6]} end={[0, 2.2, -3.2]} color="#ea580c" />

      {/* Campus Greenery (Trees) */}
      {treePositions.map((pos, i) => (
        <CampusTree key={i} position={pos} scale={0.75 + (i % 3) * 0.15} />
      ))}

      {/* Pathway Illuminated Bollards / Street Lamps */}
      {lampPositions.map((pos, i) => (
        <PathwayLamp key={i} position={pos} color={i % 2 === 0 ? '#f97316' : '#f59e0b'} />
      ))}

      {/* Subtle Orbital Data Energy Stream Ring */}
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[6.8, 6.88, 64]} />
        <meshBasicMaterial color="#f97316" opacity={0.3} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default CollegeCampusBuildings;
