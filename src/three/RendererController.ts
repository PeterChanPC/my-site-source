import { MonoBehavior, THREE } from "./d";

export class RendererController implements MonoBehavior {
  private _renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    this._renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
  };

  private handleResize = (): void => {
    this._renderer.setPixelRatio(window.devicePixelRatio || 1);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public startAnimation(animate: Function, scene: THREE.Scene, camera: THREE.Camera): void {
    const renderAnimation = () => {
      animate();
      this._renderer.render(scene, camera);
    };
    this._renderer.setAnimationLoop(renderAnimation);
  };

  public start(): void {
    window.addEventListener('resize', this.handleResize);

    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.setClearColor(0x000000, 0);
    this.handleResize();
  };

  public update(): void {

  };

  public end(): void {
    window.removeEventListener('resize', this.handleResize);
    this._renderer.dispose();
  };
};