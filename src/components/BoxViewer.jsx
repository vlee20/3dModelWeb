import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

function BoxViewer() {
    const { scene } = useGLTF('../models/Untitled.glb');
    const { camera, gl } = useThree();
    const meshRef = useRef();
    const [hoveredMesh, setHoveredMesh] = useState(null);

    // Position of the model
    scene.position.set(10, 15, 5);

    // Attach the scene to the meshRef for rotation
    useEffect(() => {
        if (meshRef.current === null && scene) {
            meshRef.current = scene;
        }
    }, [scene]);

    // Automatic rotation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01; // Rotate around Y axis
            // You can also rotate X or Z: meshRef.current.rotation.x += 0.01;
        }
    });

    // Set initial camera position further out
    useEffect(() => {
        camera.position.set(40, 50, 60);
    }, [camera]);

    // add raycaster for model interaction
    const raycaster = useRef(new THREE.Raycaster());

    document.addEventListener('mousedown', onMouseDown);

    function onMouseDown(event) {
        console.log("Mouse down event detected");
        raycaster.current.setFromCamera({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        }, camera);

        const intersects = raycaster.current.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            const color = new THREE.Color(Math.random(), Math.random(), Math.random());
            console.log("Intersected object:", intersectedObject);
            if (intersectedObject.isMesh) {
                // Change color on click
                intersectedObject.material.color.set(color); // Highlight color
                // intersectedObject.scale.set(1.1, 1.1, 1.1); // Enlarge
            }
        }
    }

    return (
        <>
            <primitive object={scene} scale={1} ref={meshRef} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
        </>
    );
}

export default BoxViewer;



    // // Store original color and scale to restore on unhover
    // const originalColors = useRef(new Map());
    // const originalScales = useRef(new Map());

    // // Save original material colors and scales after model loads
    // useEffect(() => {
    //     if (scene) {
    //         scene.traverse((child) => {
    //             if (child.isMesh && child.material) {
    //                 originalColors.current.set(child.uuid, child.material.color.clone());
    //                 originalScales.current.set(child.uuid, child.scale.clone());
    //             }
    //         });
    //     }
    // }, [scene]);

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
    //                     child.material.color.set('#0065A2'); // Highlight color
    //                     child.scale.set(1.3, 1.3, 1.3); // Enlarge
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