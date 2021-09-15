import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js';

// global variables
const raycaster = new THREE.Raycaster();
let selectedObjects: any[] = [];
let outlinePass: OutlinePass;

/**
 * Setups the postprocessing including an fxaa shader aswell as object highlighting with the help of an outline shader.
 *
 * @param aRenderer The WebGLRenderer
 * @param aWidth The canvas width.
 * @param aHeight The canvas height.
 * @param aComposer The effect composer.
 * @param aScene The current scene
 * @param aCamera The perspective camera
 */
export function setupPostProcessing(
  aRenderer: THREE.WebGLRenderer,
  aWidth: number,
  aHeight: number,
  aComposer: EffectComposer,
  aScene: THREE.Scene,
  aCamera: THREE.PerspectiveCamera
) {
  /**
   * Setup post processing.
   */
  function setupPostProcessing(): void {
    // create a renderPass on the composer
    const renderPass = new RenderPass(aScene, aCamera);
    aComposer.addPass(renderPass);

    // add outlinePass shader to the composer
    outlinePass = new OutlinePass(new THREE.Vector2(aWidth, aHeight), aScene, aCamera);
    aComposer.addPass(outlinePass);

    // add fxaa shader to the composer to improve antialiasing
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / aWidth, 1 / aHeight);
    aComposer.addPass(effectFXAA);
  }

  // add an event listener for mouse movement on the canvas element
  aRenderer.domElement.style.touchAction = 'none';
  aRenderer.domElement.addEventListener('mousemove', onMouseMove);

  /**
   * Checks the raycasting on an mouse move event.
   * @param event The mouse move event
   */
  function onMouseMove(event: MouseEvent) {
    const canvasBounds = document.getElementById('three-canvas')!.getBoundingClientRect();
    const mousePosition = new THREE.Vector2();
    // calculate the actual mouse position relative to the canvas element
    mousePosition.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
    mousePosition.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;

    // check for intersections on the current mouse location
    checkIntersection(mousePosition);
  }

  // initialize post processing shaders etc.
  setupPostProcessing();

  /**
   * Check if the raycaster did collide with an object.
   */
  function checkIntersection(aMousePosition: THREE.Vector2): void {
    // adjust the raycaster to the current camera position.
    raycaster.setFromCamera(aMousePosition, aCamera);

    // store the intersects
    const intersects = raycaster.intersectObjects(aScene.children);

    // if an intersection exists
    if (intersects.length > 0) {
      // reset previous highlighted objects
      selectedObjects = [];

      // select the first collided object and add it to objects that should be highlighted
      selectedObjects.push(intersects[0].object);

      // apply objects to shader
      outlinePass.selectedObjects = selectedObjects;
    } else {
      // reset objects on shader if we got no intersections
      outlinePass.selectedObjects = [];
    }
  }
}
