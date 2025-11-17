import { THREE, ISceneController, RendererController, CameraController, Physics, GameInput, ChunkLoader } from "../../d";
import { Themes } from "@/stores/d";

export class ProjectSceneController implements ISceneController {
  // Materials
  private material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  // Geometry
  private wallGeometry = new THREE.PlaneGeometry(40, 30);
  // Objects
  private mouseWorldPos: THREE.Vector3 = new THREE.Vector3(999, 999, 999);
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

  private chunkLoader = new ChunkLoader(8, 2);

  constructor(canvas: HTMLCanvasElement, theme?: Themes) {
    if (theme) this.theme = theme;
    this.rendererController = new RendererController(canvas);
  };

  // Positions Setup
  private setPositions = (): void => {
    this.cameraController.setCameraPos(0, 0, -15);
    this.cameraController.setCameraLookAt(0, 0, 0);

    this.pointLight.position.set(0, 0, -10);

    this.wall.position.set(0, 0, 0);
    this.wall.rotation.set(0, Math.PI, 0);

    this.mouseWorldPos.set(0, 0, 0);
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
    this.scene.add(this.ambientLight, this.wall, this.pointLight);
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
    this.chunkLoader.update(this.scene, this.cameraController.camera.position, this.mouseWorldPos, time);

    const mouseDir = this.gameInput.mouseDir;
    if (this.gameInput.isMouse && mouseDir.length() !== 0) {
      this.cameraController.moveCamera(mouseDir.x, mouseDir.y, 0, 2);
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
