import * as THREE from 'three';

export default class CameraController {
  private aspect: number;
  private camera: THREE.OrthographicCamera;

  constructor() {
    this.aspect = 0;
    this.updateAspect();
    this.camera = new THREE.OrthographicCamera(-5, 5, 5 / this.aspect, -5 / this.aspect, 0, 1000);
    this.setCamera();
  };

  private updateAspect() {
    this.aspect = window.innerWidth / window.innerHeight;
  };

  private setCamera(): void {
    this.camera.position.set(0, 10, 50);
    this.camera.lookAt(0, 0, 0);
  };

  public updateCamera(): void {
    this.updateAspect();
    this.camera.top = 5 / this.aspect;
    this.camera.bottom = - 5 / this.aspect;
    this.camera.updateProjectionMatrix();
  };

  get getCamera(): THREE.OrthographicCamera {
    return this.camera;
  };
};