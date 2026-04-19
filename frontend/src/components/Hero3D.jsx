import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnimatedSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.5}>
      <MeshDistortMaterial 
        color="#ffffff" 
        attach="material" 
        distort={0.6} 
        speed={1.5} 
        roughness={0}
        metalness={1}
        wireframe={true}
      />
    </Sphere>
  );
};

export default function Hero3D() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[120vh] w-full flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* 3D Canvas Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 h-[800px] w-[800px] opacity-60 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <AnimatedSphere />
        </Canvas>
      </div>
      
      {/* Brutalist Foreground Typography */}
      <div className="relative z-10 w-full px-8 flex flex-col items-center text-center mix-blend-difference mt-20">
        <motion.h1 
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text text-white leading-none m-0"
        >
          EASY
        </motion.h1>
        <motion.h1 
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text text-white leading-none m-0 -mt-8"
        >
          M<span className="italic font-light">L</span>.
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="mt-24 max-w-lg mx-auto"
        >
          <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
            The abstract layer for neural complexity. Code-free intelligence architecture.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex gap-6"
        >
          <button onClick={() => navigate('/data')} className="glass-button text-lg uppercase tracking-widest border border-white/20">
            Commence Upload
          </button>
        </motion.div>
      </div>
    </div>
  );
}
