import { THREE } from '../three';
import { ICameraController } from './d';

export abstract class BaseCameraController implements ICameraController {
  protected readonly _camera!: THREE.OrthographicCamera | THREE.PerspectiveCamera;
  protected aspect: number = 1;
  private isResizeListenerAdded = false;

  constructor() {
    this.updateAspect();
  };

  public setCameraNear(near: number): void {
    if (near < this._camera.far) {
      this._camera.near = near;
      this._camera.updateProjectionMatrix();
    } else {
      throw new Error('Value of near must be smaller than far');
    };
  };

  public setCameraFar(far: number): void {
    if (far > this._camera.near) {
      this._camera.far = far;
      this._camera.updateProjectionMatrix();
    } else {
      throw new Error('Value of far must be greater than near');
    };
  };

  public setCameraRange(near: number, far: number): void {
    if (near > far) throw new Error('Value of far must be greater than near');
    this._camera.near = near;
    this._camera.far = far;
    this._camera.updateProjectionMatrix();
  };

  public moveCamera(x: number, y: number, z: number, speed: number = 1): void {
    this._camera.position.x += x * speed;
    this._camera.position.y += y * speed;
    this._camera.position.z += z * speed;
  };

  public setCameraPos(x: number, y: number, z: number): void {
    this._camera.position.set(x, y, z);
  };

  public setCameraLookAt(x: number, y: number, z: number): void {
    this._camera.lookAt(x, y, z);
  };

  protected updateAspect(): void {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  private handleResize = (): void => {
    this.updateAspect();
    this.updateProjection();
  };

  public addResizeListener(): void {
    if (!this.isResizeListenerAdded) {
      window.addEventListener('resize', this.handleResize);
      this.isResizeListenerAdded = true;
    };
  };

  public removeResizeListener(): void {
    window.removeEventListener('resize', this.handleResize);
    this.isResizeListenerAdded = false;
  };

  public get camera(): THREE.OrthographicCamera | THREE.PerspectiveCamera {
    return this._camera;
  };

  protected abstract updateProjection(): void;
};
