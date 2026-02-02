import { THREE, MonoBehavior, gameInput } from "@/three/d";

export class Camera implements MonoBehavior {
  private _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  private isListenerAdded = false;

  private move(dx: number, dy: number, speedX: number, speedY: number): void {
    this._camera.position.x += dx * speedX;
    this._camera.position.y += dy * speedY;
  };

  private updateProjection = (): void => {
    const aspect = window.innerWidth / window.innerHeight;
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
  };

  public start(): void {
    this.updateProjection();
    this._camera.fov = 60;
    this._camera.near = 1;
    this._camera.far = 1000;
    this._camera.position.set(0, 0, 15);
    this._camera.lookAt(0, 0, 0);

    if (this.isListenerAdded) return;
    window.addEventListener('resize', this.updateProjection);
    this.isListenerAdded = true;
  };

  public update(): void {
    const mouseDir = gameInput.mouseDir;
    const speedX = Math.abs(500 * mouseDir.x / window.innerWidth / window.innerHeight);
    const speedY = Math.abs(250 * mouseDir.y / window.innerWidth / window.innerHeight);
    if (gameInput.isMouse && mouseDir.length() !== 0) {
      this.move(-mouseDir.x, mouseDir.y, speedX, speedY);
    };
  };

  public end(): void {
    window.removeEventListener('resize', this.updateProjection);
    this.isListenerAdded = false;
  };

  public get camera(): THREE.Camera {
    return this._camera;
  };
};
