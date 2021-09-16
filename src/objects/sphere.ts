import * as THREE from 'three';

/**
 * Creates a sphere based on the given parameters and adds it to the scene.
 * @param aScene The current scene
 * @param aSize The size of the sphere {radius, wSegments, hSegments}
 * @param aPosition The position of the sphere
 * @param aColor The sphere color
 */
export function createSphere(aScene: THREE.Scene, aSize: THREE.Vector3, aPosition: THREE.Vector3, aColor: number): void {
  const geometry = new THREE.SphereGeometry(aSize.x, aSize.y, aSize.z);
  const material = new THREE.MeshPhongMaterial({color: aColor});

  // setup sphere mesh
  const sphere = new THREE.Mesh(geometry, material);

  // configurate position & rotation
  sphere.position.set(aPosition.x, aPosition.y, aPosition.z);

  // configurate shadows
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  // add sphereto scene
  aScene.add(sphere);
}
