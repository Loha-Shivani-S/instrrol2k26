import { useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface RoboticArmProps {
  baseRotation: number;
  shoulderAngle: number;
  elbowAngle: number;
  wristAngle: number;
  gripperOpen: number;
}

export function RoboticArm({ 
  baseRotation, 
  shoulderAngle, 
  elbowAngle, 
  wristAngle, 
  gripperOpen 
}: RoboticArmProps) {
  const gripAmount = gripperOpen * 0.1;

  return (
    <group position={[0, 0, 0]}>
      {/* Heavy Base Platform */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Base mounting plate */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.04, 32]} />
        <meshStandardMaterial color="#2d3436" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Rotating Base Assembly */}
      <group position={[0, 0.15, 0]} rotation={[0, baseRotation, 0]}>
        {/* Base turret */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#0a84ff" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Base joint cover */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.04, 32]} />
          <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Shoulder Assembly */}
        <group position={[0, 0.3, 0]} rotation={[0, 0, shoulderAngle]}>
          {/* Shoulder joint housing */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.25, 32]} />
            <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Upper arm */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.12, 0.6, 0.1]} />
            <meshStandardMaterial color="#0a84ff" metalness={0.6} roughness={0.4} />
          </mesh>
          
          {/* Upper arm details */}
          <mesh position={[0.07, 0.35, 0]}>
            <boxGeometry args={[0.02, 0.5, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Elbow Assembly */}
          <group position={[0, 0.65, 0]} rotation={[0, 0, elbowAngle]}>
            {/* Elbow joint */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.18, 32]} />
              <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
            </mesh>
            
            {/* Forearm */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[0.09, 0.5, 0.08]} />
              <meshStandardMaterial color="#0a84ff" metalness={0.6} roughness={0.4} />
            </mesh>
            
            {/* Forearm cable guide */}
            <mesh position={[-0.055, 0.28, 0]}>
              <boxGeometry args={[0.02, 0.45, 0.06]} />
              <meshStandardMaterial color="#2d3436" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Wrist Assembly */}
            <group position={[0, 0.55, 0]} rotation={[0, 0, wristAngle]}>
              {/* Wrist joint */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.12, 32]} />
                <meshStandardMaterial color="#ff6b35" metalness={0.7} roughness={0.3} />
              </mesh>
              
              {/* Wrist rotator */}
              <mesh position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.04, 0.05, 0.06, 32]} />
                <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Gripper Base */}
              <mesh position={[0, 0.14, 0]}>
                <boxGeometry args={[0.1, 0.04, 0.06]} />
                <meshStandardMaterial color="#2d3436" metalness={0.7} roughness={0.3} />
              </mesh>
              
              {/* Gripper Fingers */}
              <mesh position={[-0.05 - gripAmount, 0.22, 0]}>
                <boxGeometry args={[0.02, 0.12, 0.04]} />
                <meshStandardMaterial color="#636e72" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0.05 + gripAmount, 0.22, 0]}>
                <boxGeometry args={[0.02, 0.12, 0.04]} />
                <meshStandardMaterial color="#636e72" metalness={0.8} roughness={0.2} />
              </mesh>
              
              {/* Gripper tips */}
              <mesh position={[-0.05 - gripAmount, 0.29, 0]}>
                <boxGeometry args={[0.025, 0.02, 0.045]} />
                <meshStandardMaterial color="#00b894" metalness={0.6} roughness={0.4} />
              </mesh>
              <mesh position={[0.05 + gripAmount, 0.29, 0]}>
                <boxGeometry args={[0.025, 0.02, 0.045]} />
                <meshStandardMaterial color="#00b894" metalness={0.6} roughness={0.4} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Status LED on base */}
        <mesh position={[0.2, 0.15, 0.15]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial 
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Label - moved to side */}
      <Html position={[1.0, 0.2, 0]} center>
        <div className="bg-card/90 px-3 py-1.5 rounded text-xs font-mono text-primary whitespace-nowrap border border-primary/30">
          6-Axis Robot ARM-200
        </div>
      </Html>
    </group>
  );
}
