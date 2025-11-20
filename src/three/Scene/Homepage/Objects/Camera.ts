import { THREE, MonoBehavior } from "@/three/d";

export class Camera implements MonoBehavior {
  private _camera: THREE.OrthographicCamera = new THREE.OrthographicCamera();
  private size: number = 5;
  private isListenerAdded = false;

  private updateProjection = (): void => {
    const aspect = window.innerWidth / window.innerHeight;
    this._camera.top = this.size / aspect;
    this._camera.bottom = -this.size / aspect;
    this._camera.right = this.size;
    this._camera.left = -this.size;
    this._camera.updateProjectionMatrix();
  };

  public start(): void {
    this.updateProjection();
    this._camera.position.set(0, 10, 50);
    this._camera.lookAt(0, 0, 0);

    if (this.isListenerAdded) return;
    window.addEventListener('resize', this.updateProjection);
    this.isListenerAdded = true;
  };

  public update(): void {

  };

  public end(): void {
    window.removeEventListener('resize', this.updateProjection);
    this.isListenerAdded = false;
  };

  public get camera(): THREE.OrthographicCamera {
    return this._camera;
  };
};
