import { Html } from "@react-three/drei";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MicrocontrollerProps {
  active: boolean;
  ledStates?: boolean[];
}

export function Microcontroller({ active, ledStates = [true, false, true, false, true, true, false, true] }: MicrocontrollerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pulseRef = useRef(0);

  useFrame((state) => {
    pulseRef.current = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
  });

  return (
    <group>
      {/* Main PCB Board */}
      <mesh 
        position={[0, 0.05, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <boxGeometry args={[1.4, 0.08, 0.9]} />
        <meshStandardMaterial 
          color={isHovered ? "#1a5c3a" : "#0d4026"} 
          metalness={0.3} 
          roughness={0.6} 
        />
      </mesh>

      {/* MCU Chip - Main processor */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.35, 0.08, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* MCU Chip Marker Dot */}
      <mesh position={[-0.12, 0.195, -0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Crystal Oscillator */}
      <mesh position={[0.35, 0.12, 0.15]}>
        <boxGeometry args={[0.12, 0.04, 0.06]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Voltage Regulator */}
      <mesh position={[-0.4, 0.14, -0.25]}>
        <boxGeometry args={[0.15, 0.1, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Capacitors */}
      {[
        [0.25, 0.12, 0.3],
        [0.35, 0.12, 0.3],
        [-0.25, 0.12, 0.3],
        [-0.3, 0.12, -0.3],
      ].map((pos, i) => (
        <mesh key={`cap-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.03, 0.03, 0.05, 12]} />
          <meshStandardMaterial color="#2d3436" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* USB Connector */}
      <mesh position={[-0.55, 0.12, 0]}>
        <boxGeometry args={[0.25, 0.1, 0.2]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* USB Port Opening */}
      <mesh position={[-0.68, 0.12, 0]}>
        <boxGeometry args={[0.02, 0.06, 0.14]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* GPIO Pin Headers - Left */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`pin-l-${i}`} position={[0.5 - i * 0.07, 0.14, 0.38]}>
          <boxGeometry args={[0.025, 0.12, 0.025]} />
          <meshStandardMaterial color="#c4a000" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* GPIO Pin Headers - Right */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`pin-r-${i}`} position={[0.5 - i * 0.07, 0.14, -0.38]}>
          <boxGeometry args={[0.025, 0.12, 0.025]} />
          <meshStandardMaterial color="#c4a000" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Power LED (Red) */}
      <mesh position={[0.55, 0.12, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.03, 12]} />
        <meshStandardMaterial 
          color={active ? "#ff3333" : "#330000"} 
          emissive={active ? "#ff0000" : "#000"}
          emissiveIntensity={active ? 1 : 0}
        />
      </mesh>

      {/* Status LEDs Row */}
      {ledStates.map((on, i) => (
        <mesh key={`led-${i}`} position={[0.4 - i * 0.08, 0.12, 0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.025, 12]} />
          <meshStandardMaterial 
            color={active && on ? "#00ff88" : "#003320"} 
            emissive={active && on ? "#00ff88" : "#000"}
            emissiveIntensity={active && on ? 0.8 : 0}
          />
        </mesh>
      ))}

      {/* Reset Button */}
      <mesh position={[0.5, 0.14, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
        <meshStandardMaterial color="#666" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* TX/RX LEDs */}
      <mesh position={[-0.35, 0.12, 0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.025, 12]} />
        <meshStandardMaterial 
          color={active ? "#00aaff" : "#001133"} 
          emissive={active ? "#00aaff" : "#000"}
          emissiveIntensity={active ? pulseRef.current : 0}
        />
      </mesh>
      <mesh position={[-0.42, 0.12, 0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.025, 12]} />
        <meshStandardMaterial 
          color={active ? "#ffaa00" : "#331100"} 
          emissive={active ? "#ffaa00" : "#000"}
          emissiveIntensity={active ? (1 - pulseRef.current) : 0}
        />
      </mesh>

      {/* PCB Traces (decorative lines) */}
      {[
        [0.2, 0.091, 0.15, 0.3, 0.02],
        [-0.1, 0.091, -0.1, 0.25, 0.015],
        [0.3, 0.091, -0.2, 0.15, 0.015],
      ].map((trace, i) => (
        <mesh key={`trace-${i}`} position={[trace[0], trace[1], trace[2]]}>
          <boxGeometry args={[trace[3], 0.002, trace[4]]} />
          <meshStandardMaterial color="#c4a000" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Mounting Holes */}
      {[
        [0.6, -0.35],
        [0.6, 0.35],
        [-0.6, -0.35],
        [-0.6, 0.35],
      ].map((pos, i) => (
        <mesh key={`hole-${i}`} position={[pos[0], 0.05, pos[1]]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.04, 0.015, 8, 16]} />
          <meshStandardMaterial color="#c4a000" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Info Label - moved to side */}
      <Html position={[1.2, 0.2, 0]} center>
        <div className="bg-card/95 px-3 py-2 rounded-lg border border-border text-xs font-mono whitespace-nowrap shadow-lg">
          <div className="text-primary font-semibold">Arduino Mega 2560</div>
          <div className="text-muted-foreground">ATmega2560 MCU</div>
          {active && (
            <div className="mt-1 pt-1 border-t border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary">Running</span>
            </div>
          )}
        </div>
      </Html>

      {/* Hover Glow */}
      {isHovered && active && (
        <pointLight position={[0, 0.3, 0]} intensity={0.2} color="#00ff88" distance={1.5} />
      )}
    </group>
  );
}
