import { THREE, ICameraController, PerspectiveCameraProperty } from "../three";

export class PerspectiveCameraController implements ICameraController {
  private _camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();;
  private aspect: number = 0;

  constructor(prop: PerspectiveCameraProperty) {
    this.updateAspect();
    if (prop.fov) this.setCameraFOV(prop.fov);
    if (prop.near && !prop.far) this.setCameraNear(prop.near);
    if (prop.far && !prop.near) this.setCameraFar(prop.far);
    if (prop.near && prop.far) this.setCameraRange(prop.near, prop.far);
    // fall back to default three.js values
    this.updateCameraSize();
  };


  private updateAspect(): void {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  public setCameraFOV(fov: number): void {
    if (fov >= 0) {
      this._camera.fov = fov;
    } else {
      throw new Error('FOV cannot be less than 0')
    };
  };

  public setCameraNear(near: number): void {
    if (near < this._camera.far) {
      this._camera.near = near;
    } else {
      throw new Error('Value of near must be smaller than far');
    };
  };

  public setCameraFar(far: number): void {
    if (far > this._camera.near) {
      this._camera.far = far;
    } else {
      throw new Error('Value of far must be greater than near');
    };
  };

  public setCameraRange(near: number, far: number): void {
    if (near > far) throw new Error('Value of far must be greater than near');
    this._camera.near = near;
    this._camera.far = far;
  };

  public setCameraPos(x: number, y: number, z: number): void {
    this._camera.position.set(x, y, z);
  };

  public setCameraLookAt(x: number, y: number, z: number): void {
    this._camera.lookAt(x, y, z);
  };

  private updateCameraSize = (): void => {
    this.updateAspect();
    this._camera.aspect = this.aspect;
    this._camera.updateProjectionMatrix();
  };

  public addResizeListener = (): void => window.addEventListener('resize', this.updateCameraSize);

  public removeResizeListener = (): void => window.removeEventListener('resize', this.updateCameraSize);

  get camera(): THREE.PerspectiveCamera {
    return this._camera;
  };
};
