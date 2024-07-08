import './style.css';
import * as THREE from 'three';
import {addGround} from './objects/ground';
import {addLighting} from './objects/lighting';
import {createCube} from './objects/cube';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {setupPostProcessing} from './postprocessing/postprocessing';
import {createSphere} from './objects/sphere';
import {Vector3} from 'three';
import {createHeightMap} from './aoc/day9.ts';

const RENDERER_WIDTH = window.innerWidth;
const RENDERER_HEIGHT = window.innerHeight;

// setup WebGLRenderer and append to dom
const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setSize(RENDERER_WIDTH, RENDERER_HEIGHT);

// setup shadow handling
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// document.body.appendChild(renderer.domElement);
document.getElementById('three-canvas')!.appendChild(renderer.domElement);

// create scene
const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xcce0ff, 300, 1500);
// scene.background = new THREE.Color(0xcce0ff);
scene.background = new THREE.Color(0x000000);

// create camera
const camera = new THREE.PerspectiveCamera(45, RENDERER_WIDTH / RENDERER_HEIGHT, 1, 5000);

// X, Y, Z - default coordinate system is X, Y, -Z
camera.position.set(-280, 400, -150);
// camera.rotation.y = Math.PI / 4;
// camera.rotation.z = Math.PI / 3;
// camera.rotation.x = - Math.PI / 10;
// camera.rotation.y = Math.PI / 4;
camera.lookAt(new THREE.Vector3(100, 160, 120));

// create ground
addGround(scene);

// add lighting
addLighting(scene);

// add cube
// createCube(scene);

// add spheres
// createSphere(scene, new Vector3(10, 20, 20), new Vector3(35, 35, -67), 0xff0000);
// createSphere(scene, new Vector3(3, 20, 20), new Vector3(25, 30, -57), 0xff0000);
// createSphere(scene, new Vector3(3, 20, 20), new Vector3(45, 45, -77), 0xff0000);

createHeightMap(scene);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 100;
controls.maxDistance = 2000;
controls.target = new THREE.Vector3(100, 160, 120);
controls.update();

const composer = new EffectComposer(renderer);

setupPostProcessing(renderer, RENDERER_WIDTH, RENDERER_HEIGHT, composer, scene, camera);

function render(): void {
  composer.render();
  // camera.updateMatrixWorld();
}

// animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  render();
}

animate();
