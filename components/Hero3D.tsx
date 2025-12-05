import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DProps {
  onComplete: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;
    let audioContext: AudioContext | null = null;
    let frameId: number;
    let started = false;

    // --- Scene Setup ---
    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020617); // Dark Slate
      scene.fog = new THREE.FogExp2(0x020617, 0.05);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 12; // Start far for fly-in

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mountRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.error("Three.js init failed", e);
      onComplete();
      return;
    }

    // --- Objects ---

    // 1. Central Glass Object (Procedural Logo)
    const logoGroup = new THREE.Group();
    
    // Core Crystal
    geometry = new THREE.IcosahedronGeometry(1.2, 0); 
    material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9, // Glass effect
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });
    const logoMesh = new THREE.Mesh(geometry, material);
    logoGroup.add(logoMesh);

    // Wireframe Cage (Holographic effect)
    const wireGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.1 });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    logoGroup.add(wireMesh);

    scene.add(logoGroup);

    // 2. Assemblage Particles (Light fragments that form the logo)
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    const startPosArray = new Float32Array(particlesCount * 3);
    const targetPosArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Target: Random point on a sphere surface slightly larger than logo
      const r = 1.5 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const tx = r * Math.sin(phi) * Math.cos(theta);
      const ty = r * Math.sin(phi) * Math.sin(theta);
      const tz = r * Math.cos(phi);
      
      targetPosArray[i*3] = tx;
      targetPosArray[i*3+1] = ty;
      targetPosArray[i*3+2] = tz;

      // Start: Scattered far away
      startPosArray[i*3] = tx * (5 + Math.random() * 10);
      startPosArray[i*3+1] = ty * (5 + Math.random() * 10);
      startPosArray[i*3+2] = tz * (5 + Math.random() * 10) + 10; // Bias towards camera z
      
      // Initial position
      posArray[i*3] = startPosArray[i*3];
      posArray[i*3+1] = startPosArray[i*3+1];
      posArray[i*3+2] = startPosArray[i*3+2];
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xbc13fe,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 3. Tunnel of Light Trails (Enhanced)
    const tunnelCount = 1500;
    const tunnelPos = new Float32Array(tunnelCount * 3);
    const tunnelColors = new Float32Array(tunnelCount * 3);
    const tunnelSpeeds = new Float32Array(tunnelCount);

    const color1 = new THREE.Color(0x00f3ff); // Neon Blue
    const color2 = new THREE.Color(0xbc13fe); // Neon Purple

    for(let i=0; i<tunnelCount; i++) {
        // Random spread in XY
        const angle = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 25;
        tunnelPos[i*3] = Math.cos(angle) * radius;
        tunnelPos[i*3+1] = Math.sin(angle) * radius;
        // Z Spread
        tunnelPos[i*3+2] = (Math.random() - 0.5) * 150;
        
        // Speed variation (High speed for streak effect)
        tunnelSpeeds[i] = 0.5 + Math.random() * 1.5;

        // Color variation
        const mixedColor = color1.clone().lerp(color2, Math.random());
        tunnelColors[i*3] = mixedColor.r;
        tunnelColors[i*3+1] = mixedColor.g;
        tunnelColors[i*3+2] = mixedColor.b;
    }

    const tunnelGeo = new THREE.BufferGeometry();
    tunnelGeo.setAttribute('position', new THREE.BufferAttribute(tunnelPos, 3));
    tunnelGeo.setAttribute('color', new THREE.BufferAttribute(tunnelColors, 3));

    const tunnelMat = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.12,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const tunnelSystem = new THREE.Points(tunnelGeo, tunnelMat);
    scene.add(tunnelSystem);

    // 4. Volumetric Glow Particles (Simulates fog/bloom layer)
    const glowCount = 200;
    const glowPos = new Float32Array(glowCount * 3);
    const glowSpeeds = new Float32Array(glowCount);
    
    for(let i=0; i<glowCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 15;
        glowPos[i*3] = Math.cos(angle) * r;
        glowPos[i*3+1] = Math.sin(angle) * r;
        glowPos[i*3+2] = (Math.random() - 0.5) * 100;
        glowSpeeds[i] = 0.2 + Math.random() * 0.3; // Slower than streaks
    }

    const glowGeo = new THREE.BufferGeometry();
    glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));
    const glowMat = new THREE.PointsMaterial({
        color: 0x5040ff,
        size: 1.5, // Large particles
        transparent: true,
        opacity: 0.05, // Very faint
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const glowSystem = new THREE.Points(glowGeo, glowMat);
    scene.add(glowSystem);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f3ff, 15, 30);
    pointLight1.position.set(5, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xbc13fe, 15, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- Audio System ---
    const playSound = () => {
       if (muted) return;
       try {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.type = 'sine';
          // Frequency sweep for a sci-fi power-up sound
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 3);
          
          // Soft envelope
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 1); // Very quiet
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 4);

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 4.5);
       } catch (e) {
          // Autoplay policy might block this without interaction
          console.log("Audio autoplay prevented");
       }
    };


    // --- Animation State ---
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    
    // Tilt State
    let currentTiltX = 0;
    let currentTiltY = 0;

    // --- Events ---
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Main Loop ---
    const animate = () => {
      const time = clock.getElapsedTime();
      
      // 0. Initial Audio Trigger
      if (!started && time > 0.1) {
          started = true;
          playSound();
      }

      // 1. Cinematic Camera Fly-in
      // Smooth easing from z=12 to z=4.5
      const targetZ = 4.5;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.025);

      // 2. Parallax Effect (Mouse)
      const parallaxX = mouseX * 0.5;
      const parallaxY = mouseY * 0.5;
      camera.position.x += (parallaxX - camera.position.x) * 0.05;
      camera.position.y += (parallaxY - camera.position.y) * 0.05;

      // 3. Camera Rotation (LookAt + Tilt)
      camera.lookAt(0, 0, 0);

      // Z-Banking (Roll)
      const targetRotZ = mouseX * -0.15;
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotZ, 0.05);

      // X/Y Tilt (Pitch/Yaw offsets)
      // We smooth these independently so they don't jitter with raw mouse input
      const targetTiltX = mouseY * 0.05; 
      const targetTiltY = mouseX * -0.05;
      
      currentTiltX = THREE.MathUtils.lerp(currentTiltX, targetTiltX, 0.05);
      currentTiltY = THREE.MathUtils.lerp(currentTiltY, targetTiltY, 0.05);

      // Apply tilt offsets to the base rotation set by lookAt
      camera.rotation.x += currentTiltX;
      camera.rotation.y += currentTiltY;

      // 4. Logo Rotation & Breathing
      logoGroup.rotation.x = time * 0.15;
      logoGroup.rotation.y = time * 0.25;
      const scalePulse = 1 + Math.sin(time * 2) * 0.02;
      logoGroup.scale.set(scalePulse, scalePulse, scalePulse);

      // 5. Particle Assembly (Fragments -> Logo)
      const positions = particlesGeo.attributes.position.array as Float32Array;
      const assemblyProgress = Math.min(Math.max((time - 0.5) / 2.5, 0), 1);
      const ease = 1 - Math.pow(1 - assemblyProgress, 3);

      for(let i=0; i<particlesCount; i++) {
        const idx = i*3;
        const cx = startPosArray[idx] + (targetPosArray[idx] - startPosArray[idx]) * ease;
        const cy = startPosArray[idx+1] + (targetPosArray[idx+1] - startPosArray[idx+1]) * ease;
        const cz = startPosArray[idx+2] + (targetPosArray[idx+2] - startPosArray[idx+2]) * ease;

        const floatFactor = ease; 
        positions[idx] = cx + Math.sin(time + i) * 0.05 * floatFactor;
        positions[idx+1] = cy + Math.cos(time + i * 0.5) * 0.05 * floatFactor;
        positions[idx+2] = cz;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      // 6. Tunnel Animation (High Speed)
      const tPos = tunnelGeo.attributes.position.array as Float32Array;
      for(let i=0; i<tunnelCount; i++) {
          tPos[i*3+2] += tunnelSpeeds[i];
          if(tPos[i*3+2] > 20) tPos[i*3+2] = -100; // Reset far ahead
      }
      tunnelGeo.attributes.position.needsUpdate = true;

      // 7. Volumetric Glow Animation (Low Speed)
      const gPos = glowGeo.attributes.position.array as Float32Array;
      for(let i=0; i<glowCount; i++) {
          gPos[i*3+2] += glowSpeeds[i];
          if(gPos[i*3+2] > 20) gPos[i*3+2] = -100;
      }
      glowGeo.attributes.position.needsUpdate = true;

      // 8. UI Sequencing
      if (time > 2.0 && !textVisible) setTextVisible(true);
      if (time > 3.5 && !buttonVisible) setButtonVisible(true);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Auto-complete timer (6 seconds)
    const autoTimer = setTimeout(() => {
       handleEnter();
    }, 6000);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(autoTimer);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
      if(audioContext) audioContext.close();
    };
  }, [muted]); 

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-slate-900 transition-opacity duration-1000 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Sound Toggle */}
      <button 
        onClick={() => setMuted(!muted)}
        className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Main Text - Top Position (Above Particles) */}
        <div className={`absolute top-[8%] left-0 right-0 flex flex-col items-center justify-center transition-all duration-1000 transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tighter text-white glitch-text" data-text="Build. Convert. Create.">
            Build. Convert. Create.
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto mt-2 rounded-full blur-[1px]"></div>
        </div>

        {/* Call to Action - Bottom Position (Below Particles) */}
        <div className={`absolute bottom-[8%] left-0 right-0 flex justify-center pointer-events-auto transition-all duration-1000 delay-200 ${buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button 
            onClick={handleEnter}
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105"
          >
            {/* Button Glow Effects */}
            <div className="absolute inset-0 border border-white/30 rounded-full group-hover:border-neonBlue/80 transition-colors duration-300"></div>
            <div className="absolute inset-0 bg-white/5 blur-md group-hover:bg-neonBlue/20 transition-colors duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-neonBlue to-neonPurple opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
            
            <span className="relative font-bold text-sm tracking-widest text-white group-hover:text-neonBlue transition-colors uppercase flex items-center gap-2">
              Enter Site
              <span className="animate-micro-jitter inline-block">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};