import * as THREE from 'three';

/**
 * Initalizes the lighting for the given scene
 * @param aScene The given THREE.Scene object
 */
export function addLighting(aScene: THREE.Scene): void {
  aScene.add(new THREE.AmbientLight(0x666666, 4));

  const light = new THREE.DirectionalLight(0xdfebff, 2);
  light.position.set(250, 250, -250);

  // setup shadow props
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  // setup shadow camera
  const frustrum = 150;
  light.shadow.camera.left = -frustrum;
  light.shadow.camera.right = frustrum;
  light.shadow.camera.top = frustrum;
  light.shadow.camera.bottom = -frustrum;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;

  // setup directional light helper
  const helper = new THREE.DirectionalLightHelper(light, 250);
  // setup shadow helper
  const shadowHelper = new THREE.CameraHelper(light.shadow.camera);

  const pointLight = new THREE.PointLight(0xdfebff, 3, 150, 0);
  pointLight.position.set(0, 50, 0);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 20, 'red');

  aScene.add(light);
  aScene.add(pointLight);
  aScene.add(helper);
  aScene.add(shadowHelper);
  aScene.add(pointLightHelper);
}
