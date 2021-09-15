import * as THREE from 'three';

/**
 * Initalizes the ground plane for the given scene
 * @param aScene The given THREE.Scene object
 */
export function addGround(aScene: THREE.Scene): void {
  const loader = new THREE.TextureLoader();
  const groundTexture = loader.load('./textures/grass.jpg');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(250, 250);
  groundTexture.anisotropy = 16;
  groundTexture.encoding = THREE.sRGBEncoding;

  const groundMaterial = new THREE.MeshLambertMaterial({map: groundTexture});

  let mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), groundMaterial);
  mesh.position.y = 0;
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  aScene.add(mesh);
}
