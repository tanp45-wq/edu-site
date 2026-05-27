import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Edges } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCard3DProps {
  position: [number, number, number];
  title: string;
  symbol: string;
  color: string;
  onClick: () => void;
}

export default function FloatingCard3D({ position, title, symbol, color, onClick }: FloatingCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Slow floating rotation and mouse-dependent tilt
  useFrame((state) => {
    if (!meshRef.current) return;

    // Idle floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.15;
    
    // Smooth transition for scale
    const targetScale = clicked ? 1.3 : hovered ? 1.15 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Mouse tracking tilt when hovered
    if (hovered && !clicked) {
      const mouseX = state.pointer.x * 0.5;
      const mouseY = state.pointer.y * 0.5;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX + Math.PI * 0.05, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.1);
    } else {
      // Idle slow spin
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 
        Math.sin(time * 0.5) * 0.1, 
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        0, 
        0.05
      );
    }
  });

  const handleCardClick = (e: any) => {
    e.stopPropagation();
    setClicked(true);
    onClick();
    // Reset clicked state shortly after transition triggers
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleCardClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
    setHovered(false);
    document.body.style.cursor = "default";
  }}
    >
      {/* Box dimensions representing a credit card size */}
      <boxGeometry args={[2.2, 1.4, 0.1]} />
      
      {/* Glassmorphism physical material */}
      <meshPhysicalMaterial
        roughness={0.15}
        metalness={0.1}
        transmission={0.85}
        ior={1.5}
        thickness={0.5}
        transparent={true}
        opacity={0.8}
        color={hovered ? color : "#ffffff"}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />

      {/* Cyber edge glow */}
      <Edges
        threshold={15}
        color={hovered ? color : "rgba(255,255,255,0.15)"}
        lineWidth={hovered ? 2.5 : 1}
      />

      {/* Title Text */}
      <Text
        position={[0, -0.3, 0.06]}
        fontSize={0.15}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/orbitron/v30/y73S4afd30JTLXmHOR29_ac.woff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.0}
      >
        {title}
      </Text>

      {/* Futuristic Center Symbol */}
      <Text
        position={[0, 0.25, 0.06]}
        fontSize={0.45}
        color={hovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </mesh>
  );
}
