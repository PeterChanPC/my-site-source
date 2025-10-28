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