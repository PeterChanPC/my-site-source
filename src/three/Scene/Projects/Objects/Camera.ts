import { THREE, MonoBehavior, CameraController, gameInput } from "@/three/d";

export class Camera implements MonoBehavior {
  private cameraController: CameraController = new CameraController({ type: 'perspective', fov: 60, near: 1, far: 1000 });

  public start(): void {
    this.cameraController.addResizeListener();
    this.cameraController.setPos(0, 0, 15);
    this.cameraController.setLookAt(0, 0, 0);
  };

  public update(): void {
    const mouseDir = gameInput.mouseDir;
    if (gameInput.isMouse && mouseDir.length() !== 0) {
      this.cameraController.move(-mouseDir.x, mouseDir.y, 0, 2);
    };
  };

  public end(): void {
    this.cameraController.removeResizeListener();
  };

  public get camera(): THREE.Camera {
    return this.cameraController.camera;
  };
};
