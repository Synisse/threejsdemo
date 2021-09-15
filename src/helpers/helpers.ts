import * as THREE from 'three';

export function createPlane (width: number, length: number, colorInput: number): THREE.Mesh{
    let geometry = new THREE.PlaneGeometry( width, length);
    let material = new THREE.MeshBasicMaterial({color: colorInput, side: THREE.DoubleSide})
    const plane = new THREE.Mesh(geometry, material);

    return plane;
  }