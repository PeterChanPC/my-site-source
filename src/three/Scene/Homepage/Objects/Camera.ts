import { THREE, MonoBehavior, CameraController } from "@/three/d";

export class Camera implements MonoBehavior {
  private cameraController: CameraController = new CameraController({ type: 'orthographic', size: 5, near: -100, far: 1000 });

  public start(): void {
    this.cameraController.addResizeListener();
    this.cameraController.setPos(0, 10, 50);
    this.cameraController.setLookAt(0, 0, 0);
  };

  public update(): void {

  };

  public end(): void {
    this.cameraController.removeResizeListener();
  };

  public get camera(): THREE.Camera {
    return this.cameraController.camera;
  };
};
