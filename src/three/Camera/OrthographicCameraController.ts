import { THREE, ICameraController } from '../three';

export class OrthographicCameraController implements ICameraController {
  private aspect: number = 0;
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera();
  private radius: number;

  constructor(radius: number = 1) {
    this.radius = radius;
  };

  private updateAspect = (): void => {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  private updateCamera = (): void => {
    this.updateAspect();
    this.camera.top = this.radius / this.aspect;
    this.camera.right = this.radius;
    this.camera.bottom = -this.radius / this.aspect;
    this.camera.left = -this.radius;
    this.camera.near = -100;
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

  get getCamera(): THREE.OrthographicCamera {
    return this.camera;
  };
};
