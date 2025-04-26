import * as THREE from "three";

import "./style.css"
// Сцена
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3)

scene.add(axesHelper)
// Объект
const geometry = new THREE.BoxGeometry(1,1, 1,);
const material = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

const group = new THREE.Group();

group.rotation.x = Math.PI * 0.15
const cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = -1.5
const cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 0
const cube3 = new THREE.Mesh(geometry, material);
cube3.position.x = 1.5

group.add(cube1)
group.add(cube2)
group.add(cube3)

scene.add(group)

// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(1, 0, 1) 

// mesh.rotation.x = Math.PI * 0.15
// mesh.rotation.y = Math.PI * 0.25

// scene.add(mesh)


// Камера

const sizes = {
    width: 1000,
    height: 680
}

const camera = new THREE.PerspectiveCamera(105, sizes.width / sizes.height)

camera.position.z = 3
camera.position.y = 1

scene.add(camera)

camera.lookAt(new THREE.Vector3(0, -.5, 0))

// Ренденр

const canvas = document.querySelector(".canvas")

const render = new THREE.WebGLRenderer({canvas});

render.setSize(sizes.width, sizes.height)

render.render(scene, camera)

