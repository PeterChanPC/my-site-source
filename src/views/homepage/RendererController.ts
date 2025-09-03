import * as THREE from 'three';

export default class RendererController {
  private renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });
    } else {
      this.renderer = new THREE.WebGLRenderer();
    };
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);
    this.resizeRenderer();
  };

  private resizeRenderer(): void {
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private boundResizeRenderer = (): void => this.resizeRenderer();

  public addResizeListener(): void {
    window.addEventListener('resize', this.boundResizeRenderer);
  };

  public removeResizeListener(): void {
    window.removeEventListener('resize', this.boundResizeRenderer);
  };

  public setAnimation(update: Function, scene: THREE.Scene, camera: THREE.Camera) {
    const boundUpdate = () => {
      update();
      this.renderer.render(scene, camera);
    };

    this.renderer.setAnimationLoop(boundUpdate);
  };
};