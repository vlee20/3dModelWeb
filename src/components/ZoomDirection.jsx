zoomDirection  = new THREE.Vector3();
function mousewheel(event) {
            event.preventDefault();
            var amount = event.deltaY / 100;
            var zoom = camera.zoom - amount;
            var factor = 1;
            var offset = el.offset()
            ;
            var mX = amount > 0 ? 0 : ((event.clientX - offset.left) / renderer.domElement.clientWidth) * 2 - 1;
            var mY = amount > 0 ? 0 : -((event.clientY - offset.top) / renderer.domElement.clientHeight) * 2 + 1;

           zoomDirection.set(mX, mY, 0.5)
                .unproject(camera)
                .sub(camera.position)
                .multiplyScalar(amount / zoom)
            ;

            camera.position.subVectors(camera.position,zoomDirection);

            orthographictrackBallControls.target.subVectors(orthographictrackBallControls.target,zoomDirection);
           camera.zoom = zoom;
           camera.updateProjectionMatrix();
        }