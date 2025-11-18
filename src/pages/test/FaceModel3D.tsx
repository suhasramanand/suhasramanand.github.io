import React, { useRef, useMemo, useState, Suspense, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, Loader2, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

// Generate face vertices for a realistic human face mesh
function generateFaceVertices() {
  const vertices: number[] = [];
  const indices: number[] = [];
  const uv: number[] = [];
  
  // Create a face mesh with more subdivisions for smooth features
  const widthSegments = 32;
  const heightSegments = 32;
  
  // Generate vertices in a realistic human face shape
  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    
    for (let x = 0; x <= widthSegments; x++) {
      const u = x / widthSegments;
      
      // Map UV to face coordinates (centered at origin)
      // u: -0.5 to 0.5 (left to right)
      // v: 0 to 1 (chin to forehead)
      const faceX = (u - 0.5) * 2; // -1 to 1
      const faceY = v; // 0 to 1
      
      // Base face shape - oval/egg shape
      const faceWidth = 1.2;
      const faceHeight = 1.5;
      
      // Face contour - oval shape with variations
      let contourY = 1 - faceY; // Invert so chin is at bottom
      let widthFactor = 1.0;
      
      // Chin area (v = 0 to 0.2)
      if (faceY < 0.2) {
        widthFactor = 0.7 + faceY * 1.5; // Narrower at chin
        contourY *= 0.8;
      }
      // Cheek area (v = 0.2 to 0.5)
      else if (faceY < 0.5) {
        widthFactor = 1.0;
        contourY = 1 - faceY * 0.9;
      }
      // Upper face (v = 0.5 to 1.0)
      else {
        widthFactor = 1.0 - (faceY - 0.5) * 0.4; // Narrower at forehead
        contourY = (1 - faceY) * 1.1;
      }
      
      // Apply width factor to create oval shape
      const xOffset = faceX * widthFactor;
      const yPos = (contourY - 0.5) * faceHeight;
      const xPos = xOffset * faceWidth;
      
      // Calculate Z depth (forward/backward)
      let zDepth = 0;
      
      // Nose protrusion (center area, middle height)
      const noseX = faceX * 1.5;
      const noseY = (faceY - 0.45) * 2; // Nose area around v = 0.45
      const noseDist = Math.sqrt(noseX * noseX + noseY * noseY);
      if (noseDist < 0.3 && faceY > 0.35 && faceY < 0.65) {
        const noseHeight = Math.exp(-noseDist * 8) * 0.35;
        zDepth += noseHeight;
      }
      
      // Cheekbones (sides, mid-height)
      if (Math.abs(faceX) > 0.3 && faceY > 0.4 && faceY < 0.6) {
        const cheekFactor = Math.exp(-Math.pow((Math.abs(faceX) - 0.5) * 2, 2) - Math.pow((faceY - 0.5) * 3, 2));
        zDepth += cheekFactor * 0.15;
      }
      
      // Eye sockets (indentation)
      const leftEyeX = faceX - 0.25;
      const rightEyeX = faceX + 0.25;
      const eyeY = (faceY - 0.6) * 3; // Eyes around v = 0.6
      const eyeDist = Math.min(
        Math.sqrt(leftEyeX * leftEyeX + eyeY * eyeY),
        Math.sqrt(rightEyeX * rightEyeX + eyeY * eyeY)
      );
      if (eyeDist < 0.15 && faceY > 0.5 && faceY < 0.7) {
        const eyeDepth = Math.exp(-eyeDist * 12) * 0.12;
        zDepth -= eyeDepth; // Indent
      }
      
      // Mouth area (slight indentation)
      const mouthY = (faceY - 0.3) * 4;
      const mouthDist = Math.sqrt(faceX * faceX + mouthY * mouthY);
      if (mouthDist < 0.2 && faceY > 0.25 && faceY < 0.4 && Math.abs(faceX) < 0.35) {
        const mouthDepth = Math.exp(-mouthDist * 15) * 0.08;
        zDepth -= mouthDepth; // Slight indent
      }
      
      // Forehead curve
      if (faceY > 0.7) {
        const foreheadCurve = (faceY - 0.7) * 1.5;
        zDepth += Math.sin(Math.abs(faceX) * Math.PI) * foreheadCurve * 0.1;
      }
      
      // Jawline definition
      if (faceY < 0.3) {
        const jawCurve = Math.abs(faceX) * 0.8;
        zDepth -= Math.sin(jawCurve * Math.PI) * (1 - faceY) * 0.05;
      }
      
      // Final position
      vertices.push(xPos, yPos, zDepth);
      uv.push(u, 1 - v);
    }
  }
  
  // Generate indices for triangles
  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < widthSegments; x++) {
      const a = y * (widthSegments + 1) + x;
      const b = a + 1;
      const c = a + (widthSegments + 1);
      const d = c + 1;
      
      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }
  
  return { vertices, indices, uv };
}

// Vertex point component
function VertexPoint({ 
  position, 
  index,
  isHovered,
  originalPosition,
  setHoveredIndex
}: { 
  position: [number, number, number];
  index: number;
  isHovered: boolean;
  originalPosition: [number, number, number];
  setHoveredIndex: (index: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const pos = meshRef.current.position;
      
      if (hovered || isHovered) {
        // Fluid-like wave effect
        const distance = Math.sqrt(
          Math.pow(pos.x - originalPosition[0], 2) +
          Math.pow(pos.y - originalPosition[1], 2) +
          Math.pow(pos.z - originalPosition[2], 2)
        );
        
        const wave = Math.sin(time * 3 + distance * 5) * 0.1;
        const ripple = Math.exp(-distance * 2) * 0.2 * Math.sin(time * 4);
        
        pos.x = originalPosition[0] + (pos.x - originalPosition[0]) * 0.9 + wave;
        pos.y = originalPosition[1] + (pos.y - originalPosition[1]) * 0.9 + ripple;
        pos.z = originalPosition[2] + (pos.z - originalPosition[2]) * 0.9 + wave * 0.5;
        
        // Gentle pulsing
        const scale = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else {
        // Return to original position smoothly
        pos.x += (originalPosition[0] - pos.x) * 0.1;
        pos.y += (originalPosition[1] - pos.y) * 0.1;
        pos.z += (originalPosition[2] - pos.z) * 0.1;
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredIndex(index);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        setHoveredIndex(null);
      }}
    >
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshStandardMaterial 
        color={hovered || isHovered ? "#61DAFB" : "#4A90E2"}
        emissive={hovered || isHovered ? "#61DAFB" : "#4A90E2"}
        emissiveIntensity={hovered || isHovered ? 0.8 : 0.3}
      />
    </mesh>
  );
}

// Face mesh component with fluid deformation
function FaceMesh({ hoveredIndex, setHoveredIndex }: { 
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const [hovered, setHovered] = useState(false);
  
  const { vertices, indices, uv } = useMemo(() => generateFaceVertices(), []);
  const originalVertices = useMemo(() => new Float32Array(vertices), [vertices]);
  
  // Store vertex positions for individual point access
  const vertexPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    for (let i = 0; i < vertices.length; i += 3) {
      positions.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
    }
    return positions;
  }, [vertices]);

  useFrame((state) => {
    if (geometryRef.current && meshRef.current) {
      const positions = geometryRef.current.attributes.position;
      const time = state.clock.elapsedTime;
      
      if (hovered || hoveredIndex !== null) {
        // Fluid-like deformation
        for (let i = 0; i < positions.count; i++) {
          const index = i * 3;
          const origX = originalVertices[index];
          const origY = originalVertices[index + 1];
          const origZ = originalVertices[index + 2];
          
          // Calculate distance from hover point
          let distance = 1;
          if (hoveredIndex !== null) {
            const hoverPos = vertexPositions[hoveredIndex];
            distance = Math.sqrt(
              Math.pow(origX - hoverPos[0], 2) +
              Math.pow(origY - hoverPos[1], 2) +
              Math.pow(origZ - hoverPos[2], 2)
            );
          }
          
          // Wave effect based on distance
          const wave = Math.sin(time * 2 + distance * 3) * 0.05;
          const ripple = Math.exp(-distance * 1.5) * 0.15 * Math.sin(time * 3);
          
          positions.setXYZ(
            i,
            origX + wave + ripple * 0.5,
            origY + ripple,
            origZ + wave * 0.7 + ripple * 0.3
          );
        }
        
        positions.needsUpdate = true;
        geometryRef.current.computeVertexNormals();
      } else {
        // Smooth return to original
        for (let i = 0; i < positions.count; i++) {
          const index = i * 3;
          const origX = originalVertices[index];
          const origY = originalVertices[index + 1];
          const origZ = originalVertices[index + 2];
          
          const currentX = positions.getX(i);
          const currentY = positions.getY(i);
          const currentZ = positions.getZ(i);
          
          positions.setXYZ(
            i,
            currentX + (origX - currentX) * 0.1,
            currentY + (origY - currentY) * 0.1,
            currentZ + (origZ - currentZ) * 0.1
          );
        }
        
        positions.needsUpdate = true;
        geometryRef.current.computeVertexNormals();
      }
    }
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [vertices, indices, uv]);

  // Store reference to geometry
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current = geometry;
    }
  }, [geometry]);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Wireframe mesh */}
      <mesh
        ref={meshRef}
        geometry={geometry}
      >
        <meshStandardMaterial
          color="#4A90E2"
          wireframe
          transparent
          opacity={0.6}
          emissive="#4A90E2"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Solid face with transparency */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#61DAFB"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          emissive="#61DAFB"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Vertex points */}
      {vertexPositions.map((pos, index) => (
        <VertexPoint
          key={index}
          position={pos}
          index={index}
          isHovered={hoveredIndex === index}
          originalPosition={pos}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </group>
  );
}

// Main 3D scene component
function FaceScene({ hoveredIndex, setHoveredIndex, autoRotate }: {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  autoRotate: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#61DAFB" />
      <pointLight position={[0, 5, 5]} intensity={0.8} />
      
      <FaceMesh hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
      />
    </>
  );
}

// Client-only Canvas wrapper
function CanvasWrapper({ hoveredIndex, setHoveredIndex, autoRotate }: {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  autoRotate: boolean;
}) {
  const [canRender, setCanRender] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => setCanRender(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!canRender) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white font-serif">Initializing 3D face model...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white font-serif">Loading 3D face model...</p>
        </div>
      </div>
    }>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 1, 2)] : 1}
        frameloop="always"
      >
        <FaceScene hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} autoRotate={autoRotate} />
      </Canvas>
    </Suspense>
  );
}

const FaceModel3D: React.FC = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <CrazyMenu />
      
      <main className="relative min-h-screen pt-20 pb-16">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/test')}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground mb-6"
            >
              <Home size={18} />
              <span>Back to Test Lab</span>
            </button>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black dark:text-foreground mb-2 flex items-center gap-3">
                  <Eye className="text-black dark:text-foreground" />
                  3D Face Modeling
                </h1>
                <p className="text-lg text-ink-gray dark:text-muted-foreground font-serif">
                  Interactive 3D face mesh with fluid-like deformation on hover
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                >
                  <RotateCcw size={18} />
                  <span>{autoRotate ? 'Auto Rotate ON' : 'Auto Rotate OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="paper-card p-0 overflow-hidden mb-8">
            <div className="h-[700px] w-full bg-gradient-to-b from-black via-gray-900 to-black dark:from-background dark:via-background/95 dark:to-background relative">
              {!isMounted ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
                    <p className="text-white font-serif">Initializing 3D face model...</p>
                  </div>
                </div>
              ) : (
                <CanvasWrapper 
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  autoRotate={autoRotate}
                />
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="paper-card">
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">
                How to Use
              </h2>
              <ul className="space-y-3 text-body text-ink-gray dark:text-muted-foreground font-serif">
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Hover over any vertex (dot)</strong> to see fluid-like deformation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Click and drag</strong> to rotate the 3D face</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Scroll</strong> to zoom in/out</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Watch the wave effects</strong> ripple across the face mesh</span>
                </li>
              </ul>
            </div>

            <div className="paper-card">
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">
                Features
              </h2>
              <ul className="space-y-3 text-body text-ink-gray dark:text-muted-foreground font-serif">
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Wireframe mesh</strong> showing face structure</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Vertex points (dots)</strong> at each mesh intersection</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Fluid deformation</strong> with wave and ripple effects</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-black dark:text-foreground mt-1">•</span>
                  <span><strong>Smooth animations</strong> for natural movement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FaceModel3D;

