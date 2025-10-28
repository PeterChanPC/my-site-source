import { THREE } from '../three';
import { ICameraController, SupportedCameraType, SUPPORTED_CAMERA_TYPES, CameraType, CameraProperty, OrthographicCameraProperty, PerspectiveCameraProperty, OrthographicCameraController, PerspectiveCameraController } from './d';

export class CameraController implements ICameraController {
  private readonly controller: ICameraController;

  constructor(cameraType: SupportedCameraType, prop: CameraProperty) {
    if (cameraType === SUPPORTED_CAMERA_TYPES[CameraType.Orthographic]) {
      this.controller = new OrthographicCameraController(prop as OrthographicCameraProperty);
    } else if (cameraType === SUPPORTED_CAMERA_TYPES[CameraType.Perspective]) {
      this.controller = new PerspectiveCameraController(prop as PerspectiveCameraProperty);
    } else {
      throw new Error('Invalid camera type');
    };
  };

  public setCameraSize(size: number): void {
    if (this.controller.setCameraSize) {
      this.controller.setCameraSize(size);
    } else {
      throw new Error('setCameraSize is only available for orthographic camera, use setCameraFOV instead');
    };
  };

  public setCameraFOV(fov: number): void {
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