import { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Dynamically import Three.js
    import('three').then((THREE) => {
      if (!containerRef.current) return;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create floating abstract shapes like spline.design
      const geometries = [
        new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
        new THREE.TorusGeometry(0.8, 0.25, 16, 100),
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.IcosahedronGeometry(0.8, 1),
        new THREE.OctahedronGeometry(0.9, 2),
        new THREE.DodecahedronGeometry(0.7, 0),
        new THREE.ConeGeometry(0.6, 1.5, 32),
      ];

      const shapes = [];
      const shapeCount = 12;

      for (let i = 0; i < shapeCount; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];

        // Pastel gradient materials - soft colors like spline.design
        const colors = [
          0xa78bfa, // soft purple
          0x60a5fa, // soft blue
          0x34d399, // soft green
          0xfbbf24, // soft yellow
          0xf472b6, // soft pink
          0x818cf8, // soft indigo
        ];

        const material = new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.3,
          roughness: 0.3,
          metalness: 0.1,
          flatShading: false,
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Spread out more
        mesh.position.x = (Math.random() - 0.5) * 80;
        mesh.position.y = (Math.random() - 0.5) * 60;
        mesh.position.z = (Math.random() - 0.5) * 50 - 10;

        // Varied scales
        const scale = Math.random() * 3 + 1.5;
        mesh.scale.set(scale, scale, scale);

        // Slow rotation speeds for smooth motion
        mesh.userData.rotationSpeed = {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        };

        mesh.userData.initialPosition = { ...mesh.position };

        scene.add(mesh);
        shapes.push(mesh);
      }

      // Soft lighting like spline.design
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight1.position.set(10, 10, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xa78bfa, 0.3);
      directionalLight2.position.set(-10, -5, -5);
      scene.add(directionalLight2);

      const pointLight = new THREE.PointLight(0x60a5fa, 0.5, 100);
      pointLight.position.set(0, 10, 10);
      scene.add(pointLight);

      // Smooth animation like spline.design
      let time = 0;
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate);
        time += 0.005;

        shapes.forEach((shape, index) => {
          // Slow, smooth rotation
          shape.rotation.x += shape.userData.rotationSpeed.x;
          shape.rotation.y += shape.userData.rotationSpeed.y;
          shape.rotation.z += shape.userData.rotationSpeed.z;

          // Gentle floating motion with different frequencies
          shape.position.x = shape.userData.initialPosition.x + Math.sin(time * 0.5 + index) * 3;
          shape.position.y = shape.userData.initialPosition.y + Math.cos(time * 0.3 + index * 0.7) * 3;
          shape.position.z = shape.userData.initialPosition.z + Math.sin(time * 0.4 + index * 0.5) * 2;
        });

        // Very gentle camera movement for parallax effect
        camera.position.x = Math.sin(time * 0.05) * 3;
        camera.position.y = Math.cos(time * 0.07) * 2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        shapes.forEach(shape => {
          shape.geometry.dispose();
          shape.material.dispose();
        });
        renderer.dispose();
      };
    }).catch(err => {
      console.error('Failed to load Three.js:', err);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeBackground;
