import { THREE, OrthographicCameraController, PerspectiveCameraController } from '../three';

export interface ICameraController {
  setCameraPos(x: number, y: number, z: number): void;
  addResizeListener(): void;
  removeResizeListener(): void;
  getCamera: THREE.Camera;
};

export class CameraController implements ICameraController {
  private controller: ICameraController;

  constructor(cameraType: 'orthographic' | 'perspective', radius: number = 1) {
    if (cameraType === 'orthographic') {
      this.controller = new OrthographicCameraController(radius);
    } else if (cameraType === 'perspective') {
      this.controller = new PerspectiveCameraController();
    } else {
      throw new Error('Invalid camera type');
    };
  };

  public setCameraPos = (x: number, y: number, z: number): void => this.controller.setCameraPos(x, y, z);

  public addResizeListener = (): void => this.controller.addResizeListener();

  public removeResizeListener = (): void => this.controller.removeResizeListener();

  get getCamera(): THREE.Camera {
    return this.controller.getCamera;
  };
};