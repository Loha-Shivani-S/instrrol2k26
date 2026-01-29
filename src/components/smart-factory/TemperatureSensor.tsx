import { Html } from "@react-three/drei";
import { useState } from "react";

interface TemperatureSensorProps {
  active: boolean;
  temperature?: number;
  onTemperatureChange?: (temp: number) => void;
}

export function TemperatureSensor({ active, temperature = 25, onTemperatureChange }: TemperatureSensorProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Temperature affects the color - cold (blue) to hot (red)
  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return "#00b4d8";
    if (temp < 40) return "#00ff88";
    if (temp < 60) return "#ffaa00";
    return "#ff4444";
  };

  const tempColor = getTemperatureColor(temperature);

  return (
    <group>
      {/* Sensor Housing - Cylindrical body */}
      <mesh 
        position={[0, 0.4, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <cylinderGeometry args={[0.12, 0.15, 0.6, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#4a4a6e" : "#2d3436"} 
          metalness={0.85} 
          roughness={0.2} 
        />
      </mesh>

      {/* Stainless Steel Probe */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Probe Tip - Temperature sensitive */}
      <mesh position={[0, 1.12, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial 
          color={tempColor} 
          emissive={active ? tempColor : "#000"}
          emissiveIntensity={active ? 0.5 : 0}
          metalness={0.6} 
          roughness={0.3} 
        />
      </mesh>

      {/* Display Screen Housing */}
      <mesh position={[0.08, 0.4, 0.1]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.03]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Display Screen */}
      <mesh position={[0.085, 0.4, 0.115]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.14, 0.01]} />
        <meshStandardMaterial 
          color={active ? "#0a1628" : "#0a0a0f"} 
          emissive={active ? "#001a33" : "#000"}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Connection Threads */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.1, 16]} />
        <meshStandardMaterial color="#636e72" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Cable Connector */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.15, 16]} />
        <meshStandardMaterial color="#2d3436" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cable */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.2, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Status LED Ring */}
      <mesh position={[0, 0.68, 0]}>
        <torusGeometry args={[0.1, 0.015, 8, 24]} />
        <meshStandardMaterial 
          color={active ? tempColor : "#333"} 
          emissive={active ? tempColor : "#000"}
          emissiveIntensity={active ? 0.8 : 0}
        />
      </mesh>

      {/* Info Label - moved to side */}
      <Html position={[0.6, 0.3, 0]} center>
        <div className="bg-card/95 px-3 py-2 rounded-lg border border-border text-xs font-mono whitespace-nowrap shadow-lg">
          <div className="text-accent font-semibold">RTD PT100</div>
          <div className="text-muted-foreground">Temperature Sensor</div>
          {active && (
            <div className="mt-1 pt-1 border-t border-border">
              <span className="text-primary font-bold">{temperature}°C</span>
            </div>
          )}
        </div>
      </Html>

      {/* Interactive Glow Effect */}
      {isHovered && active && (
        <pointLight position={[0, 0.5, 0.2]} intensity={0.3} color={tempColor} distance={1} />
      )}
    </group>
  );
}
