import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const AnimatedSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial 
        color="#3b82f6" 
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
};

export default function Hero3D() {
  const navigate = useNavigate();

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto glass-panel mt-16 text-white text-opacity-90">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          NoCodeAI Platform
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Apply powerful Machine Learning algorithms and leverage advanced LLMs without writing a single line of code. Built for students, designed for the future.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/data')} className="glass-button text-lg px-8 py-4">
            Upload Dataset
          </button>
          <button onClick={() => navigate('/llm')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm">
            Try LLMs
          </button>
        </div>
      </div>
    </div>
  );
}
