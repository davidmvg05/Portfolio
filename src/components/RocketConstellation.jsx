import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function RocketConstellation() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Particle System variables ---
    let points;
    let geometry;
    let rocketVertices = [];
    let currentPositions;
    let targetPositions;
    let originalPositions; // Saved rocket coordinates
    let scatteredPositions = [];
    let colors = [];
    let particleCount = 6000;

    // --- Load GLB Model ---
    const loader = new GLTFLoader();
    loader.load(
      import.meta.env.BASE_URL + 'rocket.glb',
      (gltf) => {
        const tempVertices = [];
        
        // Traverse and extract vertices
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            const positionAttribute = child.geometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
              const x = positionAttribute.getX(i);
              const y = positionAttribute.getY(i);
              const z = positionAttribute.getZ(i);
              tempVertices.push(new THREE.Vector3(x, y, z));
            }
          }
        });

        // Center and scale vertices to fit camera view nicely
        if (tempVertices.length > 0) {
          const box = new THREE.Box3().setFromPoints(tempVertices);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3.5 / maxDim; // target scale size of around 3.5 units

          tempVertices.forEach((v) => {
            v.sub(center).multiplyScalar(scale);
            // Rotate slightly so it stands upright
            v.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
          });
        }

        // Sample/Populate to target particleCount
        for (let i = 0; i < particleCount; i++) {
          let v;
          if (tempVertices.length > 0) {
            // Draw random vertex from model
            v = tempVertices[Math.floor(Math.random() * tempVertices.length)].clone();
            // Add a tiny bit of noise to smooth out surface overlapping
            v.x += (Math.random() - 0.5) * 0.05;
            v.y += (Math.random() - 0.5) * 0.05;
            v.z += (Math.random() - 0.5) * 0.05;
          } else {
            v = new THREE.Vector3(0, 0, 0);
          }
          rocketVertices.push(v);

          // Generate scattered space positions (where they go on scroll)
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          const distance = 8 + Math.random() * 15; // move far away
          scatteredPositions.push(
            new THREE.Vector3(
              distance * Math.sin(phi) * Math.cos(theta),
              distance * Math.sin(phi) * Math.sin(theta),
              distance * Math.cos(phi)
            )
          );

          // Colors based on Y-position to replicate the screenshot gradient:
          // Top: Orange/Peach, Middle: White/Blue, Bottom: Glowing Blue/Purple
          const normY = (v.y + 1.75) / 3.5; // normalized between 0 and 1
          const color = new THREE.Color();
          if (normY > 0.7) {
            // Orange/Peach (top)
            color.setHSL(0.06 + Math.random() * 0.04, 0.9, 0.6);
          } else if (normY > 0.3) {
            // Faint Orange / Warm White (middle)
            if (Math.random() > 0.4) {
              color.setRGB(0.9, 0.9, 0.95);
            } else {
              color.setHSL(0.08, 0.8, 0.65);
            }
          } else {
            // Blue/Purple (bottom)
            if (Math.random() > 0.5) {
              color.setHSL(0.60 + Math.random() * 0.05, 0.9, 0.55); // Neon Blue
            } else {
              color.setHSL(0.75 + Math.random() * 0.05, 0.8, 0.5); // Purple
            }
          }
          colors.push(color.r, color.g, color.b);
        }

        // Set up attributes
        geometry = new THREE.BufferGeometry();
        currentPositions = new Float32Array(particleCount * 3);
        targetPositions = new Float32Array(particleCount * 3);
        originalPositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
          originalPositions[i * 3] = rocketVertices[i].x;
          originalPositions[i * 3 + 1] = rocketVertices[i].y;
          originalPositions[i * 3 + 2] = rocketVertices[i].z;

          currentPositions[i * 3] = rocketVertices[i].x;
          currentPositions[i * 3 + 1] = rocketVertices[i].y;
          currentPositions[i * 3 + 2] = rocketVertices[i].z;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

        // Create Particle Texture (Soft circle glowing point)
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = 16;
        canvasTexture.height = 16;
        const ctxTexture = canvasTexture.getContext('2d');
        const grad = ctxTexture.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctxTexture.fillStyle = grad;
        ctxTexture.fillRect(0, 0, 16, 16);
        const texture = new THREE.CanvasTexture(canvasTexture);

        // Material
        const material = new THREE.PointsMaterial({
          size: 0.045,
          map: texture,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading rocket model:', error);
      }
    );

    // --- Interaction & Scroll Logic ---
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = window.innerHeight; // Interpolates completely over 1 viewport height
      scrollProgress = Math.min(window.scrollY / maxScroll, 1);
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse movement influence
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (points && geometry) {
        const positions = geometry.attributes.position.array;
        
        // Target rotation based on mouse hover and slow spin
        points.rotation.y = elapsedTime * 0.15 + mouse.x * 0.3;
        points.rotation.x = mouse.y * 0.15;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          
          // Rocket shape coordinate
          const rx = originalPositions[idx];
          const ry = originalPositions[idx + 1];
          const rz = originalPositions[idx + 2];

          // Scattered coordinate
          const sx = scatteredPositions[i].x;
          const sy = scatteredPositions[i].y;
          const sz = scatteredPositions[i].z;

          // Wave/noise simulation depending on scroll state
          const waveX = Math.sin(elapsedTime * 2 + ry * 5) * 0.02 * (1 - scrollProgress);
          const waveZ = Math.cos(elapsedTime * 2 + rx * 5) * 0.02 * (1 - scrollProgress);

          // Interpolated values
          const targetX = THREE.MathUtils.lerp(rx + waveX, sx, scrollProgress);
          const targetY = THREE.MathUtils.lerp(ry, sy, scrollProgress);
          const targetZ = THREE.MathUtils.lerp(rz + waveZ, sz, scrollProgress);

          // Ease towards targets
          positions[idx] += (targetX - positions[idx]) * 0.1;
          positions[idx + 1] += (targetY - positions[idx + 1]) * 0.1;
          positions[idx + 2] += (targetZ - positions[idx + 2]) * 0.1;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="rocket-canvas-container">
      {loading && (
        <div className="rocket-loader">
          <div className="loader-orbit">
            <div className="loader-planet"></div>
          </div>
          <span>Aligning Constellation...</span>
        </div>
      )}
    </div>
  );
}

export default RocketConstellation;
