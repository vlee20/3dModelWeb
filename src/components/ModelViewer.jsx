import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

function ModelViewer() {
    const { scene } = useGLTF('../models/BuildingMoc01.glb');
    const { camera, gl } = useThree();
    const meshRef = useRef();
    const [hoveredMesh, setHoveredMesh] = useState(null);

    // Store original color and scale to restore on unhover
    const originalColors = useRef(new Map());
    const originalScales = useRef(new Map());

    // Save original material colors and scales after model loads
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    originalColors.current.set(child.uuid, child.material.color.clone());
                    originalScales.current.set(child.uuid, child.scale.clone());
                }
            });
        }
    }, [scene]);

    // Set initial camera position further out
    useEffect(() => {
        camera.position.set(0, 0, 10);
    }, [camera]);

    return (
        <>
            <primitive object={scene} scale={1} ref={meshRef} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
        </>
    );
}

export default ModelViewer;




    // // Mouse move handler for hover detection
    // const handlePointerMove = useCallback((event) => {
    //     const rect = gl.domElement.getBoundingClientRect();
    //     const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    //     const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    //     const raycaster = new THREE.Raycaster();
    //     raycaster.setFromCamera({ x, y }, camera);
    //     const intersects = raycaster.intersectObject(scene, true);

    //     if (intersects.length > 0) {
    //         setHoveredMesh(intersects[0].object);
    //     } else {
    //         setHoveredMesh(null);
    //     }
    // }, [camera, gl, scene]);

    // // Attach mousemove event
    // useEffect(() => {
    //     const dom = gl.domElement;
    //     dom.addEventListener('mousemove', handlePointerMove);
    //     return () => dom.removeEventListener('mousemove', handlePointerMove);
    // }, [gl, handlePointerMove]);

    // // Change color and scale on hover
    // useEffect(() => {
    //     if (scene) {
    //         scene.traverse((child) => {
    //             if (child.isMesh && child.material) {
    //                 if (hoveredMesh && child === hoveredMesh) {
    //                     child.material.color.set('#ffec59'); // Highlight color
    //                     child.scale.set(1.1, 1.1, 1.1); // Enlarge
    //                 } else {
    //                     const origColor = originalColors.current.get(child.uuid);
    //                     const origScale = originalScales.current.get(child.uuid);
    //                     if (origColor) child.material.color.copy(origColor);
    //                     if (origScale) child.scale.copy(origScale);
    //                 }
    //             }
    //         });
    //     }
    // }, [hoveredMesh, scene]);