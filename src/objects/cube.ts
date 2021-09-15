import * as THREE from 'three';

/**
 * Initalizes the cube mesh for the given scene
 * @param aScene The given THREE.Scene object
 */
export function createCube(aScene: THREE.Scene): void {
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  const material = new THREE.MeshPhongMaterial({color: 0x00ff00});

  // setup cube mesh
  const cube = new THREE.Mesh(geometry, material);

  // configurate position & rotation
  cube.position.set(20, 10, -50);
  cube.rotation.y = Math.PI / 3;

  // configurate shadows
  cube.castShadow = true;
  cube.receiveShadow = true;

  // add cube to scene
  aScene.add(cube);
}
