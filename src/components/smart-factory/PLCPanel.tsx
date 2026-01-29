import { Html } from "@react-three/drei";

interface PLCPanelProps {
  active: boolean;
}

export function PLCPanel({ active }: PLCPanelProps) {
  return (
    <group>
      {/* Main Panel Body */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 1.5, 0.3]} />
        <meshStandardMaterial color={active ? "#1a1a2e" : "#16213e"} metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Panel Frame */}
      <mesh position={[0, 0.75, 0.16]}>
        <boxGeometry args={[2.1, 1.6, 0.02]} />
        <meshStandardMaterial color="#3a3a5e" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Input LEDs Row */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((x, i) => (
        <mesh key={`input-${i}`} position={[x, 1.2, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial 
            color={active && i < 3 ? "#00ff88" : "#333"} 
            emissive={active && i < 3 ? "#00ff88" : "#000"}
            emissiveIntensity={active && i < 3 ? 0.8 : 0}
          />
        </mesh>
      ))}
      
      {/* Output LEDs Row */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((x, i) => (
        <mesh key={`output-${i}`} position={[x, 0.9, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial 
            color={active && i < 2 ? "#ff6b35" : "#333"} 
            emissive={active && i < 2 ? "#ff6b35" : "#000"}
            emissiveIntensity={active && i < 2 ? 0.8 : 0}
          />
        </mesh>
      ))}
      
      {/* CPU Module */}
      <mesh position={[0, 0.5, 0.17]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial color="#0a84ff" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Status LED */}
      <mesh position={[-0.3, 0.5, 0.2]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial 
          color={active ? "#00ff88" : "#ff4444"} 
          emissive={active ? "#00ff88" : "#ff4444"}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Label */}
      <Html position={[0.2, 0.5, 0.25]} center>
        <div className="bg-card/90 px-2 py-1 rounded text-xs font-mono text-primary whitespace-nowrap">
          CPU-1214C
        </div>
      </Html>
    </group>
  );
}
