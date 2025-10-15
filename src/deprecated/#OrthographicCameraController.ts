import * as THREE from 'three';

export default class OrthograpgicCameraController {
  private aspect: number = 0;
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera();
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  };

  private updateAspect = (): void => {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  private updateCamera = (radius: number): void => {
    this.updateAspect();
    this.camera.top = radius / this.aspect;
    this.camera.right = radius;
    this.camera.bottom = - radius / this.aspect;
    this.camera.left = -radius;
    this.camera.near = -100;
    this.camera.far = 1000;
    this.camera.updateProjectionMatrix();
  };

  private boundUpdateCamera = (): void => this.updateCamera(this.radius);

  public addResizeListener = (): void => {
    window.addEventListener('resize', this.boundUpdateCamera);
  };

  public removeResizeListener = (): void => {
    window.removeEventListener('resize', this.boundUpdateCamera);
  };

  public setCamera = (x: number, y: number, z: number): void => {
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
    this.updateCamera(this.radius);
  };

  get getCamera(): THREE.OrthographicCamera {
    return this.camera;
  };
};