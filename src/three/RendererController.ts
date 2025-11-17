import { THREE } from "./three";

export class RendererController {
  private _renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    this._renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.setClearColor(0x000000, 0);
    this.resizeRenderer();
  };

  private resizeRenderer = (): void => {
    this._renderer.setPixelRatio(window.devicePixelRatio || 1);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private boundResizeRenderer = (): void => this.resizeRenderer();

  public addResizeListener = (): void => {
    window.addEventListener('resize', this.boundResizeRenderer);
  };

  public removeResizeListener = (): void => {
    window.removeEventListener('resize', this.boundResizeRenderer);
  };

  public setAnimation = (
    animate: Function,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): void => {
    const renderAnimation = () => {
      animate();
      this._renderer.render(scene, camera);
    };
    this._renderer.setAnimationLoop(renderAnimation);
  };

  public get renderer() {
    return this._renderer;
  };
};