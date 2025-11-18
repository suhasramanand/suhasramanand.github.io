import React, { useRef, useMemo, useState, Suspense, useEffect, useLayoutEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { 
  Home, RotateCcw, Layers, Loader2, Search, Filter, X, Zap, 
  BarChart3, Eye, EyeOff, Download, Grid3x3, Minus, Plus,
  TrendingUp, Code, Cloud, Database, Settings
} from 'lucide-react';
import { gsap } from 'gsap';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

// Two color scheme for skill nodes
const COLOR_PRIMARY = '#4A90E2'; // Blue
const COLOR_SECONDARY = '#61DAFB'; // Cyan/Teal

// Skill data with relationships
interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: number;
  color: string;
  connections: string[]; // IDs of connected skills
}

// Helper function to assign color based on category (alternating pattern)
const getNodeColor = (index: number, category: string): string => {
  const categories = ['Languages', 'Frontend', 'Backend', 'Databases', 'Cloud', 'DevOps', 'Tools'];
  const categoryIndex = categories.indexOf(category);
  // Alternate between two colors based on category and index
  return (categoryIndex % 2 === 0) ? COLOR_PRIMARY : COLOR_SECONDARY;
};

const skillNodesData = [
  // Programming Languages
  { id: 'js', name: 'JavaScript/TypeScript', category: 'Languages', level: 95, connections: ['react', 'node', 'next'] },
  { id: 'py', name: 'Python', category: 'Languages', level: 90, connections: ['fastapi', 'django'] },
  { id: 'java', name: 'Java', category: 'Languages', level: 85, connections: [] },
  { id: 'cpp', name: 'C++', category: 'Languages', level: 80, connections: [] },
  { id: 'sql', name: 'SQL', category: 'Languages', level: 85, connections: ['mysql', 'postgres'] },
  
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', level: 95, connections: ['js', 'next', 'mui'] },
  { id: 'next', name: 'Next.js', category: 'Frontend', level: 85, connections: ['react', 'js'] },
  { id: 'angular', name: 'Angular', category: 'Frontend', level: 70, connections: ['js'] },
  { id: 'mui', name: 'Material UI', category: 'Frontend', level: 80, connections: ['react'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', level: 90, connections: ['react', 'next'] },
  
  // Backend
  { id: 'node', name: 'Node.js', category: 'Backend', level: 90, connections: ['js', 'express'] },
  { id: 'express', name: 'Express', category: 'Backend', level: 90, connections: ['node', 'js'] },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', level: 85, connections: ['py'] },
  { id: 'django', name: 'Django', category: 'Backend', level: 75, connections: ['py'] },
  { id: 'rest', name: 'REST APIs', category: 'Backend', level: 95, connections: ['node', 'express', 'fastapi'] },
  
  // Databases
  { id: 'mongo', name: 'MongoDB', category: 'Databases', level: 85, connections: ['node', 'express'] },
  { id: 'mysql', name: 'MySQL', category: 'Databases', level: 90, connections: ['sql', 'node'] },
  { id: 'postgres', name: 'PostgreSQL', category: 'Databases', level: 85, connections: ['sql', 'node'] },
  { id: 'firebase', name: 'Firebase', category: 'Databases', level: 80, connections: ['react', 'js'] },
  
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', category: 'Cloud', level: 85, connections: ['k8s', 'docker', 'terraform'] },
  { id: 'azure', name: 'Azure', category: 'Cloud', level: 80, connections: ['k8s', 'docker'] },
  { id: 'gcp', name: 'GCP', category: 'Cloud', level: 75, connections: ['k8s', 'docker'] },
  { id: 'docker', name: 'Docker', category: 'DevOps', level: 90, connections: ['k8s', 'aws', 'azure'] },
  { id: 'k8s', name: 'Kubernetes', category: 'DevOps', level: 85, connections: ['docker', 'aws', 'terraform'] },
  { id: 'terraform', name: 'Terraform', category: 'DevOps', level: 80, connections: ['aws', 'k8s'] },
  
  // Tools
  { id: 'git', name: 'Git', category: 'Tools', level: 95, connections: ['cicd'] },
  { id: 'cicd', name: 'CI/CD', category: 'Tools', level: 90, connections: ['git', 'docker', 'aws'] },
  { id: 'agile', name: 'Agile/Scrum', category: 'Tools', level: 85, connections: ['jira'] },
  { id: 'jira', name: 'JIRA', category: 'Tools', level: 80, connections: ['agile'] },
];

// Map skill nodes with assigned colors
const skillNodes: SkillNode[] = skillNodesData.map((node, index) => ({
  ...node,
  color: getNodeColor(index, node.category)
}));

// Particle effect component
function ParticleEffect({ position, color, visible }: { position: [number, number, number]; color: string; visible: boolean }) {
  const particles = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particles.current && visible) {
      particles.current.rotation.x += 0.001;
      particles.current.rotation.y += 0.002;
    }
  });

  if (!visible) return null;

  const particleCount = 50;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = position[0] + radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = position[1] + radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = position[2] + radius * Math.cos(phi);
    }
    return positions;
  }, [position]);

  return (
    <points ref={particles} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.6} />
    </points>
  );
}

// Enhanced skill node component with glow effects
function SkillSphere({ 
  node, 
  position, 
  onClick, 
  isHovered, 
  isSelected,
  isHighlighted,
  showLabel
}: { 
  node: SkillNode; 
  position: [number, number, number];
  onClick: () => void;
  isHovered: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  showLabel: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
    
    // Pulse effect for selected/hovered nodes
    if (glowRef.current && (isSelected || hovered)) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const size = 0.3 + (node.level / 100) * 0.5;
  const isActive = hovered || isHovered || isSelected || isHighlighted;
  const color = isActive ? '#ffffff' : node.color;
  const glowIntensity = isSelected ? 1 : isActive ? 0.7 : 0.3;

  return (
    <group position={position}>
      {/* Glow effect */}
      {(isSelected || hovered) && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.3, 32, 32]} />
          <meshBasicMaterial 
            color={node.color} 
            transparent 
            opacity={0.2 * glowIntensity}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? size * 1.15 : size}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={node.color} 
          emissiveIntensity={glowIntensity}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Particle effect for selected nodes */}
      {isSelected && (
        <ParticleEffect position={position} color={node.color} visible={true} />
      )}
      
      {/* Label - Always show on hover */}
      {hovered && (
        <Suspense fallback={null}>
          <Text
            position={[0, -2.2, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {node.name}
          </Text>
        </Suspense>
      )}
      
      {/* Additional label for selected/highlighted nodes */}
      {(isSelected || isHighlighted) && !hovered && (
        <Suspense fallback={null}>
          <Text
            position={[0, -2, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {node.name}
            {'\n'}
            {node.level}%
          </Text>
        </Suspense>
      )}
    </group>
  );
}

// Animated connection line with flowing effect
function AnimatedConnection({ 
  start, 
  end, 
  color, 
  animated 
}: { 
  start: [number, number, number]; 
  end: [number, number, number];
  color?: string;
  animated?: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current && animated) {
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const points = useMemo(() => {
    return new Float32Array([
      start[0], start[1], start[2],
      end[0], end[1], end[2]
    ]);
  }, [start, end]);
  
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geom;
  }, [points]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial 
        ref={materialRef}
        color={color || "#ffffff"} 
        transparent 
        opacity={animated ? 0.5 : 0.2}
      />
    </line>
  );
}

// Camera controller for smooth animations
function CameraController({ target, enabled }: { target: [number, number, number] | null; enabled: boolean }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !target) return;
    
    const targetPos = new THREE.Vector3(...target);
    const cameraPos = new THREE.Vector3().copy(camera.position);
    const direction = new THREE.Vector3().subVectors(targetPos, cameraPos).normalize();
    const newCameraPos = new THREE.Vector3().copy(targetPos).add(direction.multiplyScalar(8));
    
    gsap.to(camera.position, {
      x: newCameraPos.x,
      y: newCameraPos.y,
      z: newCameraPos.z,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [target, enabled, camera]);

  return null;
}

// Symmetric spherical layout - nodes arranged uniformly on a sphere surface
function useForceDirectedLayout(nodes: SkillNode[]) {
  return useMemo(() => {
    const posMap = new Map<string, [number, number, number]>();
    const categories = ['Languages', 'Frontend', 'Backend', 'Databases', 'Cloud', 'DevOps', 'Tools'];
    
    // Group nodes by category
    const categoryGroups = new Map<string, SkillNode[]>();
    categories.forEach(cat => categoryGroups.set(cat, []));
    nodes.forEach(node => {
      const group = categoryGroups.get(node.category);
      if (group) group.push(node);
    });

    // Calculate total nodes for symmetric distribution
    const totalNodes = nodes.length;
    
    // Arrange nodes in a perfectly symmetric spherical pattern
    // Use Fibonacci sphere algorithm for even distribution on sphere surface
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians (~2.4 radians)
    const sphereRadius = 7; // Radius of the sphere
    
    let globalIndex = 0;
    
    // Create a flat array of all nodes for uniform distribution
    const allNodes: Array<{ node: SkillNode; category: string }> = [];
    categories.forEach(category => {
      const groupNodes = categoryGroups.get(category) || [];
      groupNodes.forEach(node => {
        allNodes.push({ node, category });
      });
    });
    
    // Distribute all nodes uniformly on sphere surface using Fibonacci sphere
    allNodes.forEach(({ node }, index) => {
      // Y coordinate: evenly distributed from -1 to 1
      const y = 1 - (index / (totalNodes - 1)) * 2; // Goes from 1 (top) to -1 (bottom)
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y)); // Radius at this height (0 at poles)
      
      // Angle: golden angle rotation for uniform spacing
      const theta = goldenAngle * index;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // Scale to sphere radius
      posMap.set(node.id, [x * sphereRadius, y * sphereRadius, z * sphereRadius]);
    });
    
    return posMap;
  }, [nodes]);
}

// Main 3D scene component
function SkillGraph({ 
  selectedNode, 
  setSelectedNode, 
  autoRotate,
  searchQuery,
  categoryFilter,
  levelRange,
  highlightPath
}: { 
  selectedNode: string | null;
  setSelectedNode: (id: string | null) => void;
  autoRotate: boolean;
  searchQuery: string;
  categoryFilter: string[];
  levelRange: [number, number];
  highlightPath: string | null;
}) {
  const positions = useForceDirectedLayout(skillNodes);
  
  // Filter nodes based on search and filters
  const filteredNodes = useMemo(() => {
    return skillNodes.filter(node => {
      const matchesSearch = !searchQuery || 
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(node.category);
      const matchesLevel = node.level >= levelRange[0] && node.level <= levelRange[1];
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, categoryFilter, levelRange]);

  // Find path between nodes
  const getPathBetweenNodes = useCallback((startId: string, endId: string): string[] => {
    const visited = new Set<string>();
    const queue: Array<{ id: string; path: string[] }> = [{ id: startId, path: [startId] }];
    
    while (queue.length > 0) {
      const { id, path } = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      
      if (id === endId) return path;
      
      const node = skillNodes.find(n => n.id === id);
      if (node) {
        node.connections.forEach(connId => {
          if (!visited.has(connId)) {
            queue.push({ id: connId, path: [...path, connId] });
          }
        });
      }
    }
    return [];
  }, []);

  const highlightedPath = useMemo(() => {
    if (!highlightPath || !selectedNode) return new Set<string>();
    const path = getPathBetweenNodes(selectedNode, highlightPath);
    return new Set(path);
  }, [highlightPath, selectedNode, getPathBetweenNodes]);

  // Get connected nodes for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const node = skillNodes.find(n => n.id === selectedNode);
    if (!node) return new Set<string>();
    const connected = new Set<string>([selectedNode]);
    node.connections.forEach(id => connected.add(id));
    return connected;
  }, [selectedNode]);

  // Generate connections
  const connections = useMemo(() => {
    const conns: Array<{ 
      start: [number, number, number]; 
      end: [number, number, number];
      startId: string;
      endId: string;
    }> = [];
    
    skillNodes.forEach(node => {
      node.connections.forEach(connId => {
        const startPos = positions.get(node.id);
        const endPos = positions.get(connId);
        if (startPos && endPos) {
          conns.push({ start: startPos, end: endPos, startId: node.id, endId: connId });
        }
      });
    });
    
    return conns;
  }, [positions]);

  // Get target position for camera
  const cameraTarget = useMemo(() => {
    if (!selectedNode) return null;
    return positions.get(selectedNode) || null;
  }, [selectedNode, positions]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#4A90E2" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      <CameraController target={cameraTarget} enabled={!!selectedNode} />
      
      {/* Render connections */}
      {connections.map((conn, index) => {
        const isHighlighted = highlightedPath.has(conn.startId) && highlightedPath.has(conn.endId);
        const isConnectedToSelected = connectedNodeIds.has(conn.startId) || connectedNodeIds.has(conn.endId);
        return (
          <AnimatedConnection 
            key={`${conn.startId}-${conn.endId}-${index}`}
            start={conn.start} 
            end={conn.end}
            animated={isHighlighted || (isConnectedToSelected && selectedNode)}
            color={isHighlighted ? "#FFD700" : isConnectedToSelected ? "#00FF00" : undefined}
          />
        );
      })}
      
      {/* Render skill nodes */}
      {skillNodes.map((node) => {
        const pos = positions.get(node.id);
        if (!pos) return null;
        
        const isVisible = filteredNodes.some(n => n.id === node.id);
        const isSelected = selectedNode === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isInPath = highlightedPath.has(node.id);
        
        if (!isVisible) return null;
        
        return (
          <SkillSphere
            key={node.id}
            node={node}
            position={pos}
            onClick={() => setSelectedNode(isSelected ? null : node.id)}
            isHovered={false}
            isSelected={isSelected}
            isHighlighted={isConnected || isInPath}
            showLabel={false}
          />
        );
      })}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        dampingFactor={0.05}
      />
    </>
  );
}

// Client-only Canvas wrapper
function CanvasWrapper({ 
  selectedNode, 
  setSelectedNode, 
  autoRotate,
  searchQuery,
  categoryFilter,
  levelRange,
  highlightPath
}: {
  selectedNode: string | null;
  setSelectedNode: (id: string | null) => void;
  autoRotate: boolean;
  searchQuery: string;
  categoryFilter: string[];
  levelRange: [number, number];
  highlightPath: string | null;
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
          <p className="text-white font-serif">Initializing 3D engine...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white font-serif">Loading 3D visualization...</p>
        </div>
      </div>
    }>
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 1, 2)] : 1}
        frameloop="always"
        onCreated={(state) => {
          if (state.gl && typeof window !== 'undefined') {
            state.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          }
        }}
      >
        <SkillGraph 
          selectedNode={selectedNode} 
          setSelectedNode={setSelectedNode} 
          autoRotate={autoRotate}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          levelRange={levelRange}
          highlightPath={highlightPath}
        />
      </Canvas>
    </Suspense>
  );
}

const ThreeDSkills: React.FC = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [levelRange, setLevelRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [highlightPath, setHighlightPath] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(false);

  const selectedSkill = skillNodes.find(n => n.id === selectedNode);
  const categories = ['Languages', 'Frontend', 'Backend', 'Databases', 'Cloud', 'DevOps', 'Tools'];

  // Animate modal when skill is selected
  useEffect(() => {
    if (selectedSkill && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [selectedSkill]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const filtered = skillNodes.filter(node => {
      const matchesSearch = !searchQuery || 
        node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(node.category);
      const matchesLevel = node.level >= levelRange[0] && node.level <= levelRange[1];
      return matchesSearch && matchesCategory && matchesLevel;
    });

    const avgLevel = filtered.reduce((sum, n) => sum + n.level, 0) / (filtered.length || 1);
    const maxLevel = Math.max(...filtered.map(n => n.level), 0);
    const categoryCounts = categories.map(cat => ({
      category: cat,
      count: filtered.filter(n => n.category === cat).length
    }));

    return {
      total: filtered.length,
      average: Math.round(avgLevel),
      max: maxLevel,
      categories: categoryCounts
    };
  }, [searchQuery, categoryFilter, levelRange]);


  const toggleCategory = (category: string) => {
    setCategoryFilter(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter([]);
    setLevelRange([0, 100]);
    setSelectedNode(null);
    setHighlightPath(null);
  };

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'skill-visualization.png';
      link.href = url;
      link.click();
    }
  };

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
                  <Layers className="text-black dark:text-foreground" />
                  3D Skill Visualization
                </h1>
                <p className="text-lg text-ink-gray dark:text-muted-foreground font-serif">
                  Advanced interactive 3D network graph with search, filters, and analytics
                </p>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                >
                  <BarChart3 size={18} />
                  <span>Stats</span>
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                >
                  <RotateCcw size={18} />
                  <span>{autoRotate ? 'Auto ON' : 'Auto OFF'}</span>
                </button>
                <button
                  onClick={handleScreenshot}
                  className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter Panel */}
          {showFilters && (
            <div className="paper-card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-semibold text-black dark:text-foreground flex items-center gap-2">
                  <Filter size={20} />
                  Filters & Search
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-serif font-medium text-black dark:text-foreground mb-2">
                  Search Skills
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-gray dark:text-muted-foreground" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or category..."
                    className="w-full pl-10 pr-4 py-2 border border-black/20 dark:border-border bg-transparent text-black dark:text-foreground font-serif rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-foreground"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-serif font-medium text-black dark:text-foreground mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1 text-xs border transition-all duration-200 font-serif rounded ${
                        categoryFilter.includes(cat)
                          ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background border-black dark:border-foreground'
                          : 'border-black/20 dark:border-border text-black dark:text-foreground hover:bg-black/10 dark:hover:bg-foreground/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Range */}
              <div className="mb-4">
                <label className="block text-sm font-serif font-medium text-black dark:text-foreground mb-2">
                  Proficiency Level: {levelRange[0]}% - {levelRange[1]}%
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={levelRange[0]}
                    onChange={(e) => setLevelRange([parseInt(e.target.value), levelRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={levelRange[1]}
                    onChange={(e) => setLevelRange([levelRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-sm text-black dark:text-foreground"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Statistics Panel */}
          {showStats && (
            <div className="paper-card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-semibold text-black dark:text-foreground flex items-center gap-2">
                  <BarChart3 size={20} />
                  Statistics
                </h2>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black dark:text-foreground font-serif">{stats.total}</div>
                  <div className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Total Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black dark:text-foreground font-serif">{stats.average}%</div>
                  <div className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Average Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black dark:text-foreground font-serif">{stats.max}%</div>
                  <div className="text-sm text-ink-gray dark:text-muted-foreground font-serif">Max Level</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-serif font-semibold text-black dark:text-foreground mb-2">By Category</h3>
                <div className="space-y-2">
                  {stats.categories.map(({ category, count }) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-ink-gray dark:text-muted-foreground font-serif">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-ink-light-gray/20 dark:bg-muted/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-black dark:bg-foreground transition-all duration-500 rounded-full"
                            style={{ width: `${(count / skillNodes.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-serif text-black dark:text-foreground w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3D Canvas */}
          <div className="paper-card p-0 overflow-hidden mb-8">
            <div className="h-[700px] w-full bg-gradient-to-b from-black via-gray-900 to-black dark:from-background dark:via-background/95 dark:to-background relative">
              {!isMounted ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
                    <p className="text-white font-serif">Initializing 3D engine...</p>
                  </div>
                </div>
              ) : (
                <CanvasWrapper 
                  selectedNode={selectedNode} 
                  setSelectedNode={setSelectedNode} 
                  autoRotate={autoRotate}
                  searchQuery={searchQuery}
                  categoryFilter={categoryFilter}
                  levelRange={levelRange}
                  highlightPath={highlightPath}
                />
              )}
            </div>
          </div>

          {/* Selected Skill Modal/Overlay */}
          {selectedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div 
                className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 opacity-100"
                onClick={() => setSelectedNode(null)}
              />
              <div 
                ref={modalRef}
                className="relative paper-card max-w-2xl w-full pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/20 dark:border-border">
                  <h2 className="text-3xl font-serif font-bold text-black dark:text-foreground">
                    Skill Details
                  </h2>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-2 hover:bg-black/10 dark:hover:bg-foreground/10 rounded-full transition-all duration-200 text-ink-gray dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Main Skill Info - Prominent Display */}
                <div className="space-y-6">
                  {/* Skill Name and Category */}
                  <div className="text-center py-4">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black dark:text-foreground mb-3">
                      {selectedSkill.name}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-black/20 dark:border-border shadow-lg"
                        style={{ backgroundColor: selectedSkill.color }}
                      />
                      <span className="text-lg text-ink-gray dark:text-muted-foreground font-serif">
                        {selectedSkill.category}
                      </span>
                    </div>
                  </div>

                  {/* Expertise Level - Prominent Display */}
                  <div className="py-6 px-6 bg-black/5 dark:bg-foreground/5 rounded-lg border border-black/10 dark:border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-base font-serif font-semibold text-black dark:text-foreground block mb-1">
                          Expertise Level
                        </span>
                        <span className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
                          Proficiency Rating
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-5xl font-serif font-bold text-black dark:text-foreground block leading-none">
                          {selectedSkill.level}
                        </span>
                        <span className="text-2xl font-serif text-ink-gray dark:text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-4 bg-ink-light-gray/20 dark:bg-muted/30 overflow-hidden rounded-full shadow-inner">
                      <div 
                        className="h-full transition-all duration-1000 ease-out rounded-full shadow-lg"
                        style={{ 
                          width: `${selectedSkill.level}%`,
                          backgroundColor: selectedSkill.color,
                          boxShadow: `0 0 20px ${selectedSkill.color}40`
                        }}
                      />
                    </div>

                    {/* Level Indicator */}
                    <div className="mt-4 flex items-center justify-between text-xs font-serif">
                      <span className="text-ink-gray dark:text-muted-foreground">Beginner</span>
                      <span className="text-ink-gray dark:text-muted-foreground">Intermediate</span>
                      <span className="text-ink-gray dark:text-muted-foreground">Advanced</span>
                      <span className="text-ink-gray dark:text-muted-foreground">Expert</span>
                    </div>
                  </div>

                  {/* Related Technologies */}
                  {selectedSkill.connections.length > 0 && (
                    <div className="pt-4 border-t border-black/20 dark:border-border">
                      <h4 className="text-lg font-serif font-semibold text-black dark:text-foreground mb-4">
                        Related Technologies ({selectedSkill.connections.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.connections.map(connId => {
                          const conn = skillNodes.find(n => n.id === connId);
                          return conn ? (
                            <button
                              key={connId}
                              onClick={() => {
                                setSelectedNode(connId);
                                setHighlightPath(connId);
                                setTimeout(() => setHighlightPath(null), 2000);
                              }}
                              className="px-4 py-2 text-sm border border-black/20 dark:border-border hover:bg-black dark:hover:bg-foreground hover:text-paper-cream dark:hover:text-background transition-all duration-200 font-serif text-black dark:text-foreground rounded-lg hover:scale-105 hover:shadow-lg"
                            >
                              {conn.name}
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Info Panels */}
          <div className="grid md:grid-cols-2 gap-6">
            {!selectedSkill && (
              <div className="paper-card">
                <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">
                  Interactive Features
                </h2>
                <ul className="space-y-3 text-body text-ink-gray dark:text-muted-foreground font-serif">
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Click and drag</strong> to rotate the 3D graph</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Scroll</strong> to zoom in/out</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Click on a node</strong> to view details and highlight connections</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Hover over nodes</strong> to see skill names and levels</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Use filters</strong> to search and filter skills</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black dark:text-foreground mt-1">•</span>
                    <span><strong>Click related skills</strong> to find connection paths</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Legend */}
            <div className="paper-card">
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">
                Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const categoryNodes = skillNodes.filter(n => n.category === category);
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`p-3 rounded border text-left transition-all duration-200 ${
                        categoryFilter.includes(category)
                          ? 'bg-black dark:bg-foreground text-paper-cream dark:text-background border-black dark:border-foreground'
                          : 'border-black/20 dark:border-border hover:bg-black/5 dark:hover:bg-foreground/5'
                      }`}
                    >
                      <div className="text-sm font-serif font-semibold text-black dark:text-foreground mb-1">
                        {category}
                      </div>
                      <div className="text-xs text-ink-gray dark:text-muted-foreground font-serif">
                        {categoryNodes.length} skills
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThreeDSkills;
