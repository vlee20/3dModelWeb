// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const ThreeDViewer = () => {
//     const mountRef = useRef(null);
//     const cameraRef = useRef(null);
//     const sceneRef = useRef(null);
//     const rendererRef = useRef(null);

//     useEffect(() => {
//         const scene = new THREE.Scene();
//         sceneRef.current = scene;

//         // Add ambient light
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//         scene.add(ambientLight);

//         // Add directional light for depth
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//         directionalLight.position.set(5, 10, 7.5);
//         scene.add(directionalLight);

//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.z = 5;
//         cameraRef.current = camera;

//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         mountRef.current.appendChild(renderer.domElement);
//         rendererRef.current = renderer;

//         const loader = new GLTFLoader();
//         loader.load('/models/Untitled.glb', (gltf) => {
//             gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
//             scene.add(gltf.scene);
//         });

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };
//         animate();

//         const handleScroll = (event) => {
//             camera.position.z += event.deltaY * 0.01;
//         };

//         window.addEventListener('wheel', handleScroll);

//         return () => {
//             window.removeEventListener('wheel', handleScroll);
//             mountRef.current.removeChild(renderer.domElement);
//             renderer.dispose();
//         };
//     }, []);

//     return <div ref={mountRef} />;
// };

// export default ThreeDViewer;


import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = () => {
  const gltf = useLoader(GLTFLoader, "../models/Untitled.glb");
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};
export default Model;