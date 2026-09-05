import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PaperBall3DProps {
  onClick: () => void;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  isUnfolding?: boolean;
}

export const PaperBall3D: React.FC<PaperBall3DProps> = ({
  onClick,
  isHovered,
  onHoverChange,
  isUnfolding = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  const isUnfoldingRef = useRef(isUnfolding);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isUnfoldingRef.current = isUnfolding;
  }, [isUnfolding]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Procedural Paper Texture Canvas
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 512;
    texCanvas.height = 512;
    const ctx = texCanvas.getContext('2d');
    if (ctx) {
      // Cream base
      ctx.fillStyle = '#f7f4ea';
      ctx.fillRect(0, 0, 512, 512);

      // Fiber speckles
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.2;
        const gray = 140 + Math.floor(Math.random() * 70);
        ctx.fillStyle = `rgba(${gray}, ${gray - 10}, ${gray - 25}, 0.12)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Faint grid / technical sketch line traces on paper
      ctx.strokeStyle = 'rgba(80, 70, 50, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Tiny handwritten style stamp note on ball
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(40, 60, 90, 0.45)';
      ctx.fillText('PORTFOLIO.RAW', 140, 200);
      ctx.fillText('[CLICK TO UNFOLD]', 130, 230);
    }

    const paperTexture = new THREE.CanvasTexture(texCanvas);
    paperTexture.wrapS = THREE.RepeatWrapping;
    paperTexture.wrapT = THREE.RepeatWrapping;

    // Normal / Bump generation canvas for micro-creases
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#808080';
      bCtx.fillRect(0, 0, 512, 512);
      // Sharp wrinkles
      bCtx.strokeStyle = '#000000';
      bCtx.lineWidth = 2;
      for (let i = 0; i < 60; i++) {
        bCtx.beginPath();
        let bx = Math.random() * 512;
        let by = Math.random() * 512;
        bCtx.moveTo(bx, by);
        for (let j = 0; j < 4; j++) {
          bx += (Math.random() - 0.5) * 80;
          by += (Math.random() - 0.5) * 80;
          bCtx.lineTo(bx, by);
        }
        bCtx.stroke();
      }
    }
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;

    // Build Deformed Crumpled Sphere Geometry
    const baseRadius = 1.35;
    const geometry = new THREE.IcosahedronGeometry(baseRadius, 6);
    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    // Pseudo-noise function for 3D paper crumpling
    const pseudoNoise3D = (x: number, y: number, z: number) => {
      const s1 = Math.sin(x * 3.5 + y * 4.2 + z * 3.1);
      const s2 = Math.cos(x * 7.1 - y * 6.3 + z * 5.4) * 0.5;
      const s3 = Math.sin(x * 13.7 + y * 11.2 - z * 12.5) * 0.25;
      // Ridge creases (absolute value creates sharp peak ridges like folded paper)
      const ridge = 1.0 - Math.abs(s1 + s2);
      return ridge * 0.45 + (s1 + s2 + s3) * 0.2;
    };

    const tempVec = new THREE.Vector3();
    for (let i = 0; i < vertexCount; i++) {
      tempVec.fromBufferAttribute(positionAttr, i);

      const norm = tempVec.clone().normalize();
      const noiseVal = pseudoNoise3D(norm.x, norm.y, norm.z);
      // Displace along normal
      const displacement = (noiseVal - 0.2) * 0.38;
      tempVec.addScaledVector(norm, displacement);

      positionAttr.setXYZ(i, tempVec.x, tempVec.y, tempVec.z);
    }

    geometry.computeVertexNormals();

    // Material with paper finish & bump
    const material = new THREE.MeshStandardMaterial({
      map: paperTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.08,
      roughness: 0.88,
      metalness: 0.02,
      color: new THREE.Color('#faf6eb'),
      flatShading: true,
    });

    const paperMesh = new THREE.Mesh(geometry, material);
    paperMesh.castShadow = true;
    paperMesh.receiveShadow = true;
    scene.add(paperMesh);

    // Drop shadow plane underneath paper ball
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -1.55;
    shadowMesh.rotation.x = -Math.PI / 2;
    scene.add(shadowMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.95);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    mainLight.position.set(4, 6, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x7ea0c7, 0.8);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe8cc, 0.9);
    rimLight.position.set(0, -4, 4);
    scene.add(rimLight);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const targetRotation = { x: 0.2, y: 0.4 };
    const currentRotation = { x: 0.2, y: 0.4 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.x = y * 0.6 + 0.2;
      targetRotation.y = x * 0.8 + 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle breathing and gentle floating motion
      const breathScale = 1 + Math.sin(elapsedTime * 1.6) * 0.035;
      const floatY = Math.sin(elapsedTime * 1.2) * 0.08;

      if (!isUnfoldingRef.current) {
        // Smooth lerp rotation toward mouse or slow spin
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

        paperMesh.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.5) * 0.1;
        paperMesh.rotation.y = currentRotation.y + elapsedTime * 0.15;
        paperMesh.rotation.z = Math.cos(elapsedTime * 0.4) * 0.05;

        // Hover scale boost
        const hoverScale = isHoveredRef.current ? 1.08 : 1.0;
        paperMesh.scale.set(
          breathScale * hoverScale,
          breathScale * hoverScale,
          breathScale * hoverScale
        );
        paperMesh.position.y = floatY;

        shadowMesh.scale.set(
          (hoverScale * (1 - floatY * 0.4)),
          (hoverScale * (1 - floatY * 0.4)),
          1
        );
        shadowMesh.material.opacity = 0.8 - floatY * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      paperTexture.dispose();
      bumpTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] cursor-pointer transition-transform duration-300 select-none ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      aria-label="Crumpled paper ball — Click or press Space to unfold portfolio"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
};
