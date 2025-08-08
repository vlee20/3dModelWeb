import { useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Mouse3DEffect() {
    const { camera, gl } = useThree();
    const meshRef = useRef();

    useEffect(() => {
        // Set cursor to default arrow when over the canvas
        const dom = gl.domElement;
        dom.style.cursor = 'arrow';
        const handleMouseMove = (event) => {
            const rect = dom.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            const vector = new THREE.Vector3(x, y, 0.5);
            vector.unproject(camera);
            if (meshRef.current) {
                meshRef.current.position.copy(vector);
            }
        };
        dom.addEventListener('mousemove', handleMouseMove);
        return () => {
            dom.removeEventListener('mousemove', handleMouseMove);
            dom.style.cursor = '';
        };
    }, [camera, gl]);

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.01, 16, 16]} />
            <meshStandardMaterial color="#ff55fc" emissive="#ff55fc" emissiveIntensity={0.5} />
        </mesh>
    );
}