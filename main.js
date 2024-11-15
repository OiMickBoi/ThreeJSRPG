import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import GUI from 'lil-gui';
import { Terrain } from './src/Terrain'; 

const gui = new GUI();

const stats = new Stats();
document.body.appendChild(stats.dom)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop(animate);
document.body.appendChild( renderer.domElement );

// Scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

// Terrain
const terrain = new Terrain(10, 10);
scene.add(terrain);

// lighting
const sun = new THREE.DirectionalLight();
sun.position.setLength(1,2,3);
scene.add(sun);

const ambient = new THREE.AmbientLight(); 
ambient.intensity = 0.5;
scene.add(ambient);

/*
we need three things to make a shape render. we need the geometry and the material nad the mesh
we use the geomentry and the material to create the mesh
*/
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// anmiation function
function animate() {
  controls.update();
	renderer.render( scene, camera );
  stats.update();
}
renderer.setAnimationLoop( animate );

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  camera.setSize(window.innerWidth, window.innerHeight);
});

const folder = gui.addFolder('Cube');
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
folder.addColor(cube.material, 'color');
