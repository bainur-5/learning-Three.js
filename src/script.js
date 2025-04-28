import * as THREE from 'three';

import './style.css';

// Сцена
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3);

scene.add(axesHelper);

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'purple',
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Камера
const sizes = {
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector('.canvas');


const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

let time = Date.now()
const clock = new THREE.Clock();

const tick = () =>{
    const newTime = clock.getElapsedTime()

    camera.position.x = Math.cos(newTime)
    camera.position.y = Math.sin(newTime)
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)    
    window.requestAnimationFrame(tick)
}
tick()