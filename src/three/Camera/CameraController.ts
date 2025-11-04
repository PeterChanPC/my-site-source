import { THREE } from '../three';
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

  public setCameraSize?(size: number): void {
    if (this.controller.setCameraSize) {
      this.controller.setCameraSize(size);
    } else {
      throw new Error('setCameraSize is only available for orthographic camera, use setCameraFOV instead');
    };
  };

  public setCameraFOV?(fov: number): void {
    if (this.controller.setCameraFOV) {
      this.controller.setCameraFOV(fov);
    } else {
      throw new Error('setCameraFOV is only available for perspective camera, use setCameraSize instead');
    };
  };

  public setCameraNear(near: number): void {
    this.controller.setCameraNear(near);
  };

  public setCameraFar(far: number): void {
    this.controller.setCameraFar(far);
  };

  public setCameraRange(near: number, far: number): void {
    this.controller.setCameraRange(near, far);
  };

  public moveCamera(x: number, y: number, z: number, speed?: number): void {
    this.controller.moveCamera(x, y, z, speed);
  };

  public setCameraPos(x: number, y: number, z: number): void {
    this.controller.setCameraPos(x, y, z);
  };

  public setCameraLookAt(x: number, y: number, z: number): void {
    this.controller.setCameraLookAt(x, y, z);
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