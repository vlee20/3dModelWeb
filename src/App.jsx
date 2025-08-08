import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelViewer from './components/ModelViewer';
import BoxViewer from './components/BoxViewer';
import CameraRig from './components/CameraRig';
import Mouse3DEffect from './components/Mouse3DEffect';


function App() {
    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <header style={{
                padding: '2rem 0',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                letterSpacing: '2px',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                Chuwy's Creatives
            </header>
            <div style={{
                margin: '2rem auto',
                width: '80vw',
                maxWidth: '900px',
                height: '500px',
                background: '#eaeaea',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
            }}>
                <Canvas>
                    <ModelViewer />
                    <BoxViewer />
                    <CameraRig />
                    {/* <Mouse3DEffect /> */}
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
}

export default App;
