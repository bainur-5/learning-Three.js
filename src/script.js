import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './style.css';

const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const cursor = {
    x: 0,
    y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

// Объект
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.CircleGeometry(1, 20, 0, Math.PI)
// const geometry = new THREE.PlaneGeometry(1, 1, 20, 20)
// const geometry = new THREE.ConeGeometry(1, 2, 32, 1, false, 0, Math.PI )
// const geometry = new THREE.CylinderGeometry(0.5, 1, 2, 32, 1, true, 0)
// const geometry = new THREE.RingGeometry(0.5, 1, 32, 10, 0, Math.PI * 2 )
// const geometry = new THREE.TorusGeometry(1, 0.5, 16, 60)
// const geometry = new THREE.TorusKnotGeometry(1, .4, 100, 10, 3, 4)
// const geometry = new THREE.DodecahedronGeometry(1, 0)
// const geometry = new THREE.OctahedronGeometry(1, 0)
// const geometry = new THREE.TetrahedronGeometry(1, 0)
// const geometry = new THREE.IcosahedronGeometry(1, 0)
// const geometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
const material = new THREE.MeshBasicMaterial({
    color: 'yellow',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
    // Обновляем размеры
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Обновляем соотношение сторон камеры
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Обновляем renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});