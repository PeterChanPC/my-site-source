import { THREE } from '@/three/d';
import { ICameraController, CameraType, CameraProperty, OrthographicCameraProperty, PerspectiveCameraProperty, OrthographicCameraController, PerspectiveCameraController } from './d';

function isOrthographic(prop: CameraProperty): prop is OrthographicCameraProperty {
  return prop.type === CameraType.Orthographic;
};

function isPerspective(prop: CameraProperty): prop is PerspectiveCameraProperty {
  return prop.type === CameraType.Perspective;
};

export class CameraController implements ICameraController {
  private readonly controller: ICameraController;

  constructor(prop: CameraProperty) {
    if (isOrthographic(prop)) {
      this.controller = new OrthographicCameraController(prop);
    } else if (isPerspective(prop)) {
      this.controller = new PerspectiveCameraController(prop);
    } else {
      throw new Error('Invalid camera type or property');
    };
  };

  public setSize?(size: number): void {
    if (this.controller.setSize) {
      this.controller.setSize(size);
    } else {
      throw new Error('setCameraSize is only available for orthographic camera, use setCameraFOV instead');
    };
  };

  public setFOV?(fov: number): void {
    if (this.controller.setFOV) {
      this.controller.setFOV(fov);
    } else {
      throw new Error('setCameraFOV is only available for perspective camera, use setCameraSize instead');
    };
  };

  public setNear(near: number): void {
    this.controller.setNear(near);
  };

  public setFar(far: number): void {
    this.controller.setFar(far);
  };

  public setRange(near: number, far: number): void {
    this.controller.setRange(near, far);
  };

  public move(x: number, y: number, z: number, speed?: number): void {
    this.controller.move(x, y, z, speed);
  };

  public setPos(x: number, y: number, z: number): void {
    this.controller.setPos(x, y, z);
  };

  public setLookAt(x: number, y: number, z: number): void {
    this.controller.setLookAt(x, y, z);
  };

  public addResizeListener(): void {
    this.controller.addResizeListener();
  };

  public removeResizeListener(): void {
    this.controller.removeResizeListener();
  };

  public get camera(): THREE.Camera {
    return this.controller.camera;
  };
};