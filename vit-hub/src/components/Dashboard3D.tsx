import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import FloatingCard3D from "./FloatingCard3D";
import * as THREE from "three";

interface Dashboard3DProps {
  onSelectTool: (toolName: string) => void;
}

// Center Mascot: Glowing floating cyber-orb
function CenterMascot() {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow float
    orbRef.current.position.y = -0.3 + Math.sin(time * 2.0) * 0.1;
    
    // Breathing rotation
    orbRef.current.rotation.y = time * 0.2;
    orbRef.current.rotation.x = time * 0.1;

    // Pulse light intensity
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(time * 3) * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          transmission={0.4}
          thickness={0.8}
        />
        {/* Glow rings around the orb */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.02, 16, 100]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </mesh>
      <pointLight ref={glowRef} position={[0, 0, 0]} color="#06b6d4" distance={5} intensity={2} />
    </group>
  );
}

export default function Dashboard3D({ onSelectTool }: Dashboard3DProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={0.8} />

        {/* Floating cyber stars */}
        <Stars radius={100} depth={50} count={3500} factor={6} saturation={0.5} fade speed={1.5} />

        {/* Cyber grid helper */}
        <gridHelper 
          args={[30, 20, "#4f46e5", "#1e1b4b"]} 
          position={[0, -2.2, 0]} 
          rotation={[0.1, 0, 0]}
        />

        {/* Center Mascot AI sphere */}
        <CenterMascot />

        {/* GPA Calculator */}
        <FloatingCard3D
          position={[-2.8, 0.5, 0]}
          title="GPA Calculator"
          symbol="📊"
          color="#06b6d4" // Cyan
          onClick={() => onSelectTool("GPA")}
        />

        {/* FFCS Planner */}
        <FloatingCard3D
          position={[-1.4, 1.2, 0.2]}
          title="FFCS Planner"
          symbol="🗓️"
          color="#a855f7" // Purple
          onClick={() => onSelectTool("FFCS")}
        />

        {/* NPTEL Hub */}
        <FloatingCard3D
          position={[0, 1.6, 0.4]}
          title="NPTEL Companion"
          symbol="🎓"
          color="#f59e0b" // Orange/Gold
          onClick={() => onSelectTool("NPTEL")}
        />

        {/* Mess Menu */}
        <FloatingCard3D
          position={[1.4, 1.2, 0.2]}
          title="Mess Menu"
          symbol="🍽️"
          color="#ec4899" // Pink
          onClick={() => onSelectTool("Mess")}
        />

        {/* Resources & PYQs */}
        <FloatingCard3D
          position={[2.8, 0.5, 0]}
          title="Notes & PYQs"
          symbol="📚"
          color="#10b981" // Green
          onClick={() => onSelectTool("Resources")}
        />
      </Canvas>
    </div>
  );
}
