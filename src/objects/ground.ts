import * as THREE from 'three';

/**
 * Initalizes the ground plane for the given scene
 * @param aScene The given THREE.Scene object
 */
export function addGround(aScene: THREE.Scene): void {
  const loader = new THREE.TextureLoader();
  const groundTexture = loader.load('./textures/grass.jpg');

  // horizontal wrapping
  groundTexture.wrapS = THREE.RepeatWrapping;

  // vertical wrapping
  groundTexture.wrapT = THREE.RepeatWrapping;

  // set format/encoding
  groundTexture.repeat.set(50, 50);
  groundTexture.anisotropy = 16;
  groundTexture.encoding = THREE.sRGBEncoding;

  const groundMaterial = new THREE.MeshLambertMaterial({map: groundTexture});

  // let mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), groundMaterial);
  let mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), groundMaterial);
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;

  aScene.add(mesh);
}
