import * as THREE from 'three';
import texture from '@/assets/img/texture.webp';
import { SupportedTheme } from "@/stores/d";
import { ICameraController, CameraController } from './CameraController';
import GameInput from './GameInput';
import PlayerController from './PlayerController';
import RendererController from './RendererController';
import Physics from './Physics';

interface ISceneController {
  startScene(): void;
  endScene(): void;
  setTheme(theme: SupportedTheme): void;
};

export class HomepageScene implements ISceneController {
  // Texture
  private playerTexture = new THREE.TextureLoader().load(texture);
  // Materials
  private playerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: this.playerTexture });
  private wallMaterial_1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
  private wallMaterial_2 = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private floorMaterial = this.wallMaterial_1;
  // Geometry
  private playerGeometry = new THREE.SphereGeometry(1, 32, 32);
  private wallGeometry = new THREE.PlaneGeometry(20, 20);
  private floorGeometry = new THREE.PlaneGeometry(20, 100);
  // Player (Sphere)
  private playerMesh = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
  private player = new THREE.Object3D().attach(this.playerMesh);
  // Objects
  private wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_1);
  private wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
  // Lightings
  private spotlightPrimaryPosLight = new THREE.Vector3(50, 50, 50);
  private spotlightPrimaryPosDark = new THREE.Vector3(-50, 50, 50);
  private ambientLight = new THREE.AmbientLight(0xcccccc);
  private spotlightPrimary = new THREE.SpotLight(0xffffff);
  private spotlightSecondary = new THREE.SpotLight(0xdddddd);
  // General
  private scene: THREE.Scene = new THREE.Scene();
  private gameInput: GameInput = new GameInput();
  private cameraController: CameraController = new CameraController('orthographic', 5);
  private physics: Physics = new Physics(this.cameraController.getCamera);
  private playerController: PlayerController = new PlayerController(this.player, this.gameInput, this.physics);
  private theme: SupportedTheme = 'light';
  private clock: THREE.Clock = new THREE.Clock();
  private rendererController: RendererController;

  constructor(canvas: HTMLCanvasElement, theme?: SupportedTheme) {
    if (theme) this.theme = theme;
    this.rendererController = new RendererController(canvas);
  };

  // Textures Setup
  private setTextures = (): void => {
    this.playerTexture.wrapS = THREE.RepeatWrapping;
    this.playerTexture.wrapT = THREE.RepeatWrapping;
    this.playerTexture.repeat.set(3, 3);
  };

  // Positions Setup
  private setPositions = (): void => {
    this.player.position.set(3, 0, -2);

    this.wall_1.position.set(0, 0, -10);
    this.wall_2.position.set(-5, 0, 0);
    this.wall_3.position.set(5, 0, 0);
    this.wall_4.position.set(0, 0, 10);

    this.wall_2.rotation.set(0, Math.PI / 2, 0);
    this.wall_3.rotation.set(0, -Math.PI / 2, 0);
    this.wall_4.rotation.set(0, Math.PI, 0);

    this.floor.position.set(0, -1, 0);
    this.floor.rotation.set(-Math.PI / 2, 0, 0);

    this.cameraController.setCamera(0, 10, 50);

    this.theme === 'light' ?
      this.spotlightPrimary.position.set(50, 50, 50) :
      this.spotlightPrimary.position.set(-50, 50, 50);
    this.spotlightSecondary.position.set(-50, 50, 50);
  };

  // Lighting Setup
  private setLightings = (): void => {
    this.playerMesh.castShadow = true;
    this.wall_1.receiveShadow = true;
    this.floor.receiveShadow = true;

    this.spotlightPrimary.power = 50000;
    this.spotlightPrimary.penumbra = 0.8;
    this.spotlightPrimary.castShadow = true;
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.shadow.mapSize.width = 512;
    this.spotlightPrimary.shadow.mapSize.height = 512;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.castShadow = true;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.shadow.mapSize.width = 512;
    this.spotlightSecondary.shadow.mapSize.height = 512;

    if (this.theme === 'light') {
      this.ambientLight.intensity = 1;
      this.spotlightPrimary.angle = 0.1;
      this.spotlightSecondary.power = 0;
    } else {
      this.ambientLight.intensity = 0;
      this.spotlightPrimary.angle = 0.03;
      this.spotlightSecondary.power = 5000;
    };
  };

  // Scene Setup
  private createScene = (): void => {
    this.setTextures();
    this.setPositions();
    this.setLightings();
    this.scene.add(this.player, this.floor, this.wall_1, this.wall_2, this.wall_3, this.wall_4, this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
    const collidables = this.scene.children.filter(obj => obj !== this.player);
    this.physics.setCollidables(collidables);
  };

  private updateTheme = (): void => {
    if (this.theme === 'light') {
      if (this.ambientLight.intensity < 1) this.ambientLight.intensity += 0.05;
      if (this.spotlightPrimary.angle < 0.1) this.spotlightPrimary.angle += 0.005;
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosLight, 0.1);
      this.spotlightSecondary.power = 0;
    } else {
      if (this.ambientLight.intensity > 0) this.ambientLight.intensity -= 0.05;
      if (this.spotlightPrimary.angle > 0.03) this.spotlightPrimary.angle -= 0.005;
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosDark, 0.1);
      this.spotlightSecondary.power = 5000;
    };
  };

  private update = (): void => {
    const dt = this.clock.getDelta();
    this.updateTheme();
    this.playerController.applyMovement(dt);
  };

  public startScene = (): void => {
    this.createScene();
    this.gameInput.addInputListener();
    this.rendererController.addResizeListener();
    this.cameraController.addResizeListener();
    this.rendererController.setAnimation(this.update, this.scene, this.cameraController.getCamera);
  };

  public endScene = (): void => {
    this.gameInput.removeInputListener();
    this.rendererController.removeResizeListener();
    this.cameraController.removeResizeListener();
  };

  public setTheme = (theme: SupportedTheme) => this.theme = theme;
};

export class ProjectScene implements ISceneController {
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
  private gameInput: GameInput = new GameInput();
  private cameraController: CameraController = new CameraController('orthographic', 5);
  private physics: Physics = new Physics(this.cameraController.getCamera);
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
    this.wall.count = widthCount * heightCount;
    const halfWidth = widthCount / 2;
    const halfHeight = heightCount / 2;
    let count = 0;
    const gap = 0.02;
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
    this.updateTheme();
    const time = this.clock.getElapsedTime();
    this.updateWall(time);
  };

  public startScene = (): void => {
    this.createScene();
    this.gameInput.addInputListener();
    this.rendererController.addResizeListener();
    this.cameraController.addResizeListener();
    this.rendererController.setAnimation(this.update, this.scene, this.cameraController.getCamera);
  };

  public endScene = (): void => {
    this.gameInput.removeInputListener();
    this.rendererController.removeResizeListener();
    this.cameraController.removeResizeListener();
  };

  public setTheme = (theme: SupportedTheme) => this.theme = theme;
};

export class SceneController implements ISceneController {
  private controller: ISceneController;

  constructor(canvas: HTMLCanvasElement, scene: 'homepage' | 'project', theme: SupportedTheme = 'light') {
    if (scene === 'homepage') {
      this.controller = new HomepageScene(canvas, theme);
    } else if (scene === 'project') {
      this.controller = new ProjectScene(canvas, theme);
    } else {
      throw new Error('Invalid Scene');
    };
  };

  public startScene = (): void => this.controller.startScene();

  public endScene = (): void => this.controller.endScene();

  public setTheme = (theme: SupportedTheme) => this.controller.setTheme(theme);
};