import * as THREE from 'three';

interface ICameraController {
  setCamera(x: number, y: number, z: number): void;
  getCamera: THREE.Camera;
  addResizeListener(): void;
  removeResizeListener(): void;
};

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

  public setCamera = (x: number, y: number, z: number): void => {
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
    this.updateCamera();
  };

  get getCamera(): THREE.OrthographicCamera {
    return this.camera;
  };
};

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

  public setCamera = (x: number, y: number, z: number): void => {
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);
    this.updateCamera();
  };

  get getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  };
};

export class CameraController {
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

  public setCamera = (x: number, y: number, z: number): void => {
    this.controller.setCamera(x, y, z);
  };

  get getCamera(): THREE.Camera {
    return this.controller.getCamera;
  };

  public addResizeListener = (): void => {
    this.controller.addResizeListener();
  };

  public removeResizeListener = (): void => {
    this.controller.removeResizeListener();
  };
};