import { THREE, ISceneController, RendererController, CameraController, Physics } from "../three";
import { SupportedTheme } from "@/stores/d";

export class ProjectSceneController implements ISceneController {
  // Materials
  private material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  // Geometry
  private boxGeometry = new THREE.BoxGeometry(1, 1, 2);
  // Player
  private player = new THREE.Object3D()
  private playerLight = new THREE.PointLight(0xffffff);
  // Objects
  private maxCount = 10000;
  private speeds: number[] = [];
  private phases: number[] = [];
  private amplitudes: number[] = [];
  private dummy = new THREE.Object3D();
  private wall = new THREE.InstancedMesh(this.boxGeometry, this.material, this.maxCount);
  // Lightings
  private ambientLight = new THREE.AmbientLight(0xffffff);
  private pointLight = new THREE.PointLight(0xffffff);
  // General
  private scene: THREE.Scene = new THREE.Scene();
  private cameraController: CameraController = new CameraController('perspective', { fov: 60, near: 1, far: 1000 });
  private physics: Physics = new Physics();
  private theme: SupportedTheme = 'light';
  private clock: THREE.Clock = new THREE.Clock();
  private rendererController: RendererController;

  constructor(canvas: HTMLCanvasElement, theme?: SupportedTheme) {
    if (theme) this.theme = theme;
    this.rendererController = new RendererController(canvas);
  };

  // Positions Setup
  private setPositions = (): void => {
    for (let i = 0; i < this.maxCount; i++) {
      this.speeds[i] = Math.random() / 2;
      this.phases[i] = Math.random() * Math.PI * 2;
      this.amplitudes[i] = Math.random() / 2 + 1;
    };

    this.cameraController.setCameraPos(0, 0, -15);
    this.cameraController.setCameraLookAt(0, 0, 0);

    this.player.position.set(0, 0, -5);

    this.pointLight.position.set(0, 0, -5);
  };

  // Lighting Setup
  private setLightings = (): void => {
    this.pointLight.intensity = 20;

    if (this.theme === 'light') {
      this.ambientLight.intensity = 1;
    } else {
      this.ambientLight.intensity = 0;
    };
  };

  // Scene Setup
  private createScene = (): void => {
    this.setPositions();
    this.setLightings();
    this.player.attach(this.playerLight);
    this.scene.add(this.ambientLight, this.pointLight, this.wall, this.player);
    const collidables = this.scene.children.filter(obj => obj !== this.player);
    this.physics.setCollidables(collidables);
  };

  private updateTheme = (): void => {
    if (this.theme === 'light') {
      if (this.ambientLight.intensity < 1) this.ambientLight.intensity += 0.05;
    } else {
      if (this.ambientLight.intensity > 0) this.ambientLight.intensity -= 0.05;
    };
  };

  private updateWall = (time: number): void => {
    const widthCount = window.innerWidth / 20;
    const heightCount = window.innerHeight / 20;
    const halfWidth = widthCount / 2;
    const halfHeight = heightCount / 2;
    let count = 0;
    const gap = 0.02;
    this.wall.count = widthCount * heightCount;
    for (let i = -halfWidth; i < halfWidth; i++) {
      for (let j = -halfHeight; j < halfHeight; j++) {
        this.dummy.position.x = i * (1 + gap);
        this.dummy.position.y = j * (1 + gap);
        this.dummy.position.z = Math.sin(time * this.speeds[count] * this.phases[count] * this.amplitudes[count]) / 2;
        this.dummy.updateMatrix();
        this.wall.setMatrixAt(count, this.dummy.matrix);
        count++;
      };
    };
    this.wall.instanceMatrix.needsUpdate = true;
  };

  private update = (): void => {
    const time = this.clock.getElapsedTime();
    this.updateWall(time);
    this.updateTheme();
  };

  public startScene = (): void => {
    this.createScene();
    this.rendererController.addResizeListener();
    this.cameraController.addResizeListener();
    this.rendererController.setAnimation(this.update, this.scene, this.cameraController.camera);
  };

  public endScene = (): void => {
    this.rendererController.removeResizeListener();
    this.cameraController.removeResizeListener();
  };

  public setTheme = (theme: SupportedTheme) => this.theme = theme;
};
