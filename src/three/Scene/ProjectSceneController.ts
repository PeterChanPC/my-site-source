import { THREE, ISceneController, RendererController, CameraController, Physics, GameInput } from "../three";
import { Themes } from "@/stores/d";
import { Cubes } from "../Objects/Cubes";

export class ProjectSceneController implements ISceneController {
  // Materials
  private material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  // Geometry
  private wallGeometry = new THREE.PlaneGeometry(80, 46);
  private boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 3);
  // Objects
  private mouseWorldPos: THREE.Vector3 = new THREE.Vector3(999, 999, 999);
  private cubes = new Cubes(this.boxGeometry, this.material);
  private wall = new THREE.Mesh(this.wallGeometry, this.material);
  // Lightings
  private ambientLightIntensityLight = 0.5;
  private ambientLightIntensityDark = 0;
  private ambientLight = new THREE.AmbientLight(0xffffff);
  private pointLight = new THREE.PointLight(0xffffff);
  // General
  private theme: Themes = Themes.Light;
  private clock: THREE.Clock = new THREE.Clock();
  private rendererController: RendererController;
  private cameraController: CameraController = new CameraController({ type: 'perspective', fov: 60, near: 1, far: 1000 });
  private scene: THREE.Scene = new THREE.Scene();
  private physics: Physics = new Physics(this.cameraController.camera);
  private gameInput = new GameInput();

  constructor(canvas: HTMLCanvasElement, theme?: Themes) {
    if (theme) this.theme = theme;
    this.rendererController = new RendererController(canvas);
  };

  // Positions Setup
  private setPositions = (): void => {
    const centerX = -this.cubes.width / 2;
    const centerY = -this.cubes.height / 2;
    this.cameraController.setCameraPos(centerX, centerY, -15);
    this.cameraController.setCameraLookAt(centerX, centerY, 0);

    this.pointLight.position.set(centerX, centerY, -10);

    this.wall.position.set(centerX, centerY, 0);
    this.wall.rotation.set(0, Math.PI, 0);

    this.mouseWorldPos.set(centerX, centerY, 0);
  };

  // Lighting Setup
  private setLightings = (): void => {
    this.pointLight.intensity = 50;

    if (this.theme === 'light') {
      this.ambientLight.intensity = this.ambientLightIntensityLight;
    } else {
      this.ambientLight.intensity = this.ambientLightIntensityDark;
    };
  };

  // Scene Setup
  private createScene = (): void => {
    this.setPositions();
    this.setLightings();
    this.updateMouse();
    this.scene.add(this.ambientLight, this.cubes.mesh, this.wall, this.pointLight);
    this.physics.setCollidables(this.scene.children);
  };

  private updateTheme = (): void => {
    const alpha = 0.1;
    if (this.theme === 'light') {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, alpha);
    } else {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, alpha);
    };
  };

  private updateMouse = (): void => {
    const mousePos = this.gameInput.mousePos;
    const worldPoint = this.physics.screenPointToWorld(mousePos.x, mousePos.y);
    if (worldPoint) this.mouseWorldPos.copy(worldPoint);
  };

  private update = (): void => {
    this.updateTheme();
    this.updateMouse();
    const time = this.clock.getElapsedTime();
    this.pointLight.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, -10);
    this.cubes.update(time, this.mouseWorldPos);
    if (this.gameInput.isMouse && this.gameInput.mouseDir.length() !== 0) {
      this.cameraController.camera.position.x += this.gameInput.mouseDir.x / 30;
      this.cameraController.camera.position.y += this.gameInput.mouseDir.y / 30;
    };
  };

  public startScene = (): void => {
    this.createScene();
    this.rendererController.addResizeListener();
    this.cameraController.addResizeListener();
    this.gameInput.addInputListener();
    this.rendererController.setAnimation(this.update, this.scene, this.cameraController.camera);
  };

  public endScene = (): void => {
    this.rendererController.removeResizeListener();
    this.cameraController.removeResizeListener();
    this.gameInput.removeInputListener();
  };

  public setTheme = (theme: Themes) => this.theme = theme;
};
