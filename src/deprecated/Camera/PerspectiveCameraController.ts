import { THREE } from '@/three/d';
import { PerspectiveCameraProperty, BaseCameraController } from "./d";

export class PerspectiveCameraController extends BaseCameraController {
  protected readonly _camera: THREE.PerspectiveCamera;

  constructor(prop: PerspectiveCameraProperty) {
    super();
    this._camera = new THREE.PerspectiveCamera();
    this.setFOV(prop.fov ?? this._camera.fov);
    this.setRange(prop.near ?? this._camera.near, prop.far ?? this._camera.far);
    this.updateProjection();
  };

  public setFOV(fov: number): void {
    if (fov > 0 && fov < 180) {
      this._camera.fov = fov;
      this._camera.updateProjectionMatrix();
    } else {
      throw new Error('FOV cannot be less than or equal to 0 / larger than or equal to 180');
    };
  };

  protected updateProjection(): void {
    this._camera.aspect = this.aspect;
    this._camera.updateProjectionMatrix();
  };
};
