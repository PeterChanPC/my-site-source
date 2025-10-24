import { THREE, ICameraController } from "../three";

export class PerspectiveCameraController implements ICameraController {
  private aspect: number = 0;
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();;

  private updateAspect = (): void => {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  private updateCamera = (): void => {
    this.updateAspect();
    this.camera.fov = 60;
    this.camera.aspect = this.aspect;
    this.camera.near = 1;
    this.camera.far = 1000;
    this.camera.updateProjectionMatrix();
  };

  private boundUpdateCamera = (): void => this.updateCamera();

  public addResizeListener = (): void => {
    window.addEventListener('resize', this.boundUpdateCamera);
  };

  public removeResizeListener = (): void => {
    window.removeEventListener('resize', this.boundUpdateCamera);
  };

  public setCameraPos = (x: number, y: number, z: number): void => {
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
    this.updateCamera();
  };

  get getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  };
};
