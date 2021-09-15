import './style.css';
import * as THREE from 'three';
import {addGround} from './objects/ground';
import {addLighting} from './objects/lighting';
import {createCube} from './objects/cube';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// setup WebGLRenderer and append to dom
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// create scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcce0ff, 300, 1500);
scene.background = new THREE.Color(0xcce0ff);

// create camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);

// X, Y, Z - default coordinate system is X, Y, -Z
camera.position.set(100, 50, 150);

// create ground
addGround(scene);

// add lighting
addLighting(scene);

// add cube
createCube(scene);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 100;
controls.maxDistance = 2000;

// animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
