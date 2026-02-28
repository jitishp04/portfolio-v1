"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';
import gsap from 'gsap';
import { useTheme } from '@/components/ui/ThemeProvider';

// Error boundary to catch WebGL crashes gracefully
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

const LiquidBackground = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIsDark: { value: isDark ? 1.0 : 0.0 },
  }), []);

  useEffect(() => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
    }
  }, [isDark]);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; uniform float uIsDark; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float pattern = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            vec3 darkA = vec3(0.005); vec3 darkB = vec3(0.05);
            vec3 lightA = vec3(0.94); vec3 lightB = vec3(0.88);
            vec3 colA = mix(lightA, darkA, uIsDark);
            vec3 colB = mix(lightB, darkB, uIsDark);
            gl_FragColor = vec4(mix(colA, colB, pattern), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial color={isDark ? "#0a0a0a" : "#d8d8d8"} speed={4} distort={0.4} roughness={0.05} metalness={1.0} transparent opacity={0.35} />
      </mesh>
    </Float>
  );
};

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLAnchorElement>(null);
  const skillsRef = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );

      gsap.from(".command-cell", {
        x: 60, opacity: 0, stagger: 0.1, duration: 1.5, ease: "power4.out", delay: 1, clearProps: "all"
      });

      const applyMagnetic = (e: MouseEvent, target: HTMLElement | null) => {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 150) {
          gsap.to(target, {
            x: (e.clientX - centerX) * 0.4,
            y: (e.clientY - centerY) * 0.4,
            duration: 0.6
          });
        } else {
          gsap.to(target, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        applyMagnetic(e, projectsRef.current);
        applyMagnetic(e, skillsRef.current);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const webglSupported = useWebGLSupport();

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--portfolio-surface)', color: 'var(--portfolio-text)' }}>
      {webglSupported ? (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CanvasErrorBoundary>
            <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
              <ambientLight intensity={isDark ? 0.4 : 0.8} />
              <spotLight position={[50, 50, 50]} intensity={isDark ? 3 : 5} />
              <LiquidBackground isDark={isDark} />
              <Monolith isDark={isDark} />
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      ) : (
        /* CSS fallback: rotating hexagonal shape when WebGL is unavailable */
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="monolith-fallback" />
        </div>
      )}

      <div ref={revealRef} className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-10">
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
          <div className="invisible h-10" />

          <div className="max-w-4xl lg:-translate-y-8 pr-12">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] font-black leading-[0.87] tracking-tighter uppercase italic-none" style={{ color: 'var(--portfolio-text)' }}>
              HI! I AM <br /> <span className="text-outline">JITISH</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.35em] max-w-sm leading-relaxed" style={{ color: 'var(--portfolio-text-muted)' }}>
              Engineering intelligent systems and immersive digital experiences through robust software engineering principles and machine learning.
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-8 md:gap-12">
            <Link ref={projectsRef} href="/projects" className="w-fit flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden" style={{ border: '1px solid var(--portfolio-border)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-500" style={{ stroke: 'var(--portfolio-text)' }}>
                  <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--portfolio-text)' }}>Projects</span>
            </Link>

            <Link ref={skillsRef} href="/skills" className="w-fit flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden" style={{ border: '1px solid var(--portfolio-border)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-500" style={{ stroke: 'var(--portfolio-text)' }}>
                  <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--portfolio-text)' }}>Skills</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-106 lg:w-[500px] flex-shrink-0 flex flex-col justify-center z-20">
          <div className="command-cell glass-panel p-8 sm:p-10 block">
            {/* Header */}
            <span className="font-mono text-[9px] uppercase tracking-widest block mb-6" style={{ color: 'var(--portfolio-text-faint)' }}>001 // ABOUT ME</span>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden" style={{ border: '1px solid var(--portfolio-border)' }}>
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--portfolio-text)' }}>JITISH RAJANKUMAR PADHYA</h3>
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--portfolio-text-muted)' }}> Core field: Data Science &amp; Software engineering</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-6">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: 'var(--portfolio-text-faint)' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" strokeWidth="1.5" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--portfolio-text-faint)' }}>Stockholm &amp; Gothenburg, Sweden</span>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full mb-6" style={{ backgroundColor: 'var(--portfolio-divider)' }} />

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--portfolio-text-secondary)' }}>
              Data Science student and Software Engineering graduate combining strong mathematical foundations with practical experience in generative and agentic AI and ML pipelines.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--portfolio-text-secondary)' }}>
              Passionate about <span className="italic" style={{ color: 'var(--portfolio-text)', opacity: 0.7 }}>financial markets</span> and applying engineering solutions to complex data problems. Proven track record of driving innovation in agile environments, including developing proprietary LLM tools at Ericsson.
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mb-8">
              <div>
                <span className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--portfolio-text)' }}>MSc</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: 'var(--portfolio-text-faint)' }}>Data Science, Statistics, Decision Analysis</span>
              </div>
              <div className="w-[1px]" style={{ backgroundColor: 'var(--portfolio-divider)' }} />
              <div>
                <span className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--portfolio-text)' }}>BSc</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: 'var(--portfolio-text-faint)' }}>Software Engineering and Management</span>
              </div>
              <div className="w-[1px]" style={{ backgroundColor: 'var(--portfolio-divider)' }} />
              <div>
                <span className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--portfolio-text)' }}>&sim; 1 </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: 'var(--portfolio-text-faint)' }}>Year of experience</span>
              </div>
              <div className="w-[1px]" style={{ backgroundColor: 'var(--portfolio-divider)' }} />
              <div>
                <span className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--portfolio-text)' }}>15+</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: 'var(--portfolio-text-faint)' }}>Projects</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full mb-6" style={{ backgroundColor: 'var(--portfolio-divider)' }} />

            {/* CV Button */}
            <a
              href="https://github.com/jitishp04/CV/blob/main/CV%20-%20Google%20Docs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-4 group py-4 rounded-xl transition-all duration-500"
              style={{ border: '1px solid var(--portfolio-border)', backgroundColor: 'var(--portfolio-tag-bg)' }}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--portfolio-text)' }}>View Full CV</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-500" style={{ stroke: 'var(--portfolio-text)' }}>
                <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
