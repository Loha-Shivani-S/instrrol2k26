import { Html } from "@react-three/drei";

interface IndustrialSensorProps {
  active: boolean;
}

export function IndustrialSensor({ active }: IndustrialSensorProps) {
  return (
    <group>
      {/* Sensor Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.8, 32]} />
        <meshStandardMaterial color="#2d3436" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Sensing Head */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#00b894" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Connection Thread */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.15, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Cable */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>
      
      {/* Indicator LED */}
      <mesh position={[0.1, 0.7, 0.12]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial 
          color={active ? "#0a84ff" : "#333"} 
          emissive={active ? "#0a84ff" : "#000"}
          emissiveIntensity={active ? 1 : 0}
        />
      </mesh>
      
      {/* Label */}
      <Html position={[0.3, 0.5, 0]} center>
        <div className="bg-card/90 px-2 py-1 rounded text-xs font-mono text-accent whitespace-nowrap">
          Proximity M18
        </div>
      </Html>
    </group>
  );
}
