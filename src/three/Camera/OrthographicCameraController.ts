import { THREE } from '@/three/d';
import { OrthographicCameraProperty, BaseCameraController } from './d';

export class OrthographicCameraController extends BaseCameraController {
  protected readonly _camera: THREE.OrthographicCamera;
  private size: number = 10;

  constructor(prop: OrthographicCameraProperty) {
    super();
    this._camera = new THREE.OrthographicCamera();
    this.setSize(prop.size ?? this.size);
    this.setRange(prop.near ?? this._camera.near, prop.far ?? this._camera.far);
    this.updateProjection();
  };

  public setSize(size: number): void {
    if (size > 0) {
      this.size = size;
      this.updateProjection();
    } else {
      throw new Error('Size cannot be less than or equal to 0')
    };
  };

  protected updateProjection(): void {
    this._camera.top = this.size / this.aspect;
    this._camera.bottom = -this.size / this.aspect;
    this._camera.right = this.size;
    this._camera.left = -this.size;
    this._camera.updateProjectionMatrix();
  };
};
