import * as THREE from 'three';

import './style.css';

// Сцена
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');

// Камера
const sizes = {
    width: 600,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);


const group = new THREE.Group();
const meshes = [];

const colors = [0xb78d8, 0xe86344, 0xe8ab9c];
for (let x = -1.2; x <= 1.2; x = x + 1.2) {
    for (let y = -1.2; y <= 1.2; y = y + 1.2) {
        const material = new THREE.MeshBasicMaterial({
            color: colors[((Math.random() * 3) | 0)],
            wireframe: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.5, 0.5, 0.5)
        mesh.position.set(x, y, 0);
        meshes.push(mesh);
    }
}

group.add(...meshes);
scene.add(group);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const Max_Scale = 1;
const Min_Scale = .5;
let grow = false;

const clock = new THREE.Clock()
const animate = () =>{
    const delta = clock.getDelta();
    meshes.forEach((item, i) => {
        const mult = i % 2 === 0 ? 1 : -1;
        
        item.rotation.x += mult * delta
        item.rotation.y += mult * delta * .4
    })

    const elepsedTime = clock.getElapsedTime();
    camera.position.x = Math.sin(elepsedTime)
    camera.position.y = Math.cos(elepsedTime)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const mult = grow ? 1 : -1;
    group.scale.x += mult * delta * .5
    group.scale.y += mult * delta * .5
    group.scale.z += mult * delta * .5

    if (grow && group.scale.x >= Max_Scale) {
        grow = false
    }else if(group.scale.x <= Min_Scale){
        grow = true
    }

    renderer.render(scene, camera)
    // window.requestAnimationFrame(animate)
}
animate()