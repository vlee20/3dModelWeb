import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



function CameraRig() {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3(30, 30, 40); // Define your target position
  const [target, setTarget] = useState(true);

  // Create a renderer and controls
  const renderer = new THREE.WebGLRenderer();

  // document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera,renderer.domElement);  


  useFrame(() => {
    if (target) {
        camera.position.lerp(targetPosition, 0.015); // Adjust the interpolation factor for speed
        // camera.lookAt(0, 0, 0); // Optional: make the camera look at a specific point
        if (camera.position.distanceTo(targetPosition) < 5) {
            console.log(camera.position, targetPosition);
            setTarget(false); // Set target to false to stop the lerping after the first frame
        }
    }
  });

  controls.zoomToCursor = true;
    

  return null; // This component doesn't render anything visually
}


export default CameraRig;
