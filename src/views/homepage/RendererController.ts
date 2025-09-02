import * as THREE from 'three';

export default class RendererController {
  private renderer: THREE.WebGLRenderer;

  constructor(canvas?: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);
  };

  get getRenderer() {
    return this.renderer;
  };
};