import { useThree } from '@react-three/fiber';
import { useEffect, useCallback } from 'react';

function OrthoCameraRig() {
    const { camera, gl, size } = useThree();

    // Only run for orthographic cameras
    useEffect(() => {
        if (!camera.isOrthographicCamera) return;
        camera.updateProjectionMatrix();
    }, [camera, size]);

    // Wheel zoom to cursor for orthographic camera
    const handleWheel = useCallback(
        (event) => {
            if (!camera.isOrthographicCamera) return;
            event.preventDefault();

            // Get mouse position in NDC
            const rect = gl.domElement.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Unproject mouse to world coordinates before zoom
            const mouse = { x, y };
            const vec = camera.position.clone();
            vec.x += (x * (camera.right - camera.left) / 2) / camera.zoom;
            vec.y += (y * (camera.top - camera.bottom) / 2) / camera.zoom;

            // Zoom factor
            const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
            const prevZoom = camera.zoom;
            camera.zoom *= zoomFactor;
            camera.updateProjectionMatrix();

            // After zoom, adjust camera position so the point under cursor stays under cursor
            camera.position.x += (vec.x - camera.position.x) * (1 - prevZoom / camera.zoom);
            camera.position.y += (vec.y - camera.position.y) * (1 - prevZoom / camera.zoom);
        },
        [camera, gl]
    );

    useEffect(() => {
        const dom = gl.domElement;
        dom.addEventListener('wheel', handleWheel, { passive: false });
        return () => dom.removeEventListener('wheel', handleWheel);
    }, [gl, handleWheel]);

    return null;
}

export default OrthoCameraRig;