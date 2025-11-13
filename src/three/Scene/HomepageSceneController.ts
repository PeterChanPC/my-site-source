import { THREE, ISceneController, RendererController, CameraController, Player, Physics, GameInput } from "../three";
import { Themes } from "@/stores/d";
import texture from '@/assets/img/texture.webp';

export class HomepageSceneController implements ISceneController {
  // Materials
  private wallMaterial_1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
  private wallMaterial_2 = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private floorMaterial = this.wallMaterial_1;
  // Geometry
  private playerGeometry = new THREE.SphereGeometry(1, 32, 32);
  private wallGeometry = new THREE.PlaneGeometry(20, 20);
  private floorGeometry = new THREE.PlaneGeometry(20, 100);
  // Objects
  private wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_1);
  private wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
  // Lightings
  private ambientLightIntensityLight = 1;
  private ambientLightIntensityDark = 0;
  private spotlightPrimaryPosLight = new THREE.Vector3(50, 50, 50);
  private spotlightPrimaryPosDark = new THREE.Vector3(-50, 50, 50);
  private spotlightPrimaryAngleLight = 0.1;
  private spotlightPrimaryAngleDark = 0.03;
  private spotlightSecondaryPowLight = 0;
  private spotlightSecondaryPowDark = 5000;
  private ambientLight = new THREE.AmbientLight(0xcccccc);
  private spotlightPrimary = new THREE.SpotLight(0xffffff);
  private spotlightSecondary = new THREE.SpotLight(0xdddddd);
  // General
  private theme: Themes = Themes.Light;
  private clock: THREE.Clock = new THREE.Clock();
  private rendererController: RendererController;
  private cameraController: CameraController = new CameraController({ type: 'orthographic', size: 5, near: -100, far: 1000 });
  private scene: THREE.Scene = new THREE.Scene();
  private gameInput: GameInput = new GameInput();
  private physics: Physics = new Physics(this.cameraController.camera);
  // Player (Sphere)
  private playerTexture = new THREE.TextureLoader().load(texture);
  private playerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: this.playerTexture });
  private playerMesh = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
  private playerObject = new THREE.Object3D().attach(this.playerMesh);
  private player: Player = new Player(this.playerObject, this.gameInput, this.physics);

  constructor(canvas: HTMLCanvasElement, theme?: Themes) {
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
    this.cameraController.setCameraPos(0, 10, 50);
    this.cameraController.setCameraLookAt(0, 0, 0);

    this.playerObject.position.set(3, 0, -2);

    this.wall_1.position.set(0, 0, -10);
    this.wall_2.position.set(-5, 0, 0);
    this.wall_3.position.set(5, 0, 0);
    this.wall_4.position.set(0, 0, 10);

    this.wall_2.rotation.set(0, Math.PI / 2, 0);
    this.wall_3.rotation.set(0, -Math.PI / 2, 0);
    this.wall_4.rotation.set(0, Math.PI, 0);

    this.floor.position.set(0, -1, 0);

    this.floor.rotation.set(-Math.PI / 2, 0, 0);


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
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.castShadow = true;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.castShadow = true;

    if (this.theme === 'light') {
      this.ambientLight.intensity = this.ambientLightIntensityLight;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleLight;
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else {
      this.ambientLight.intensity = this.ambientLightIntensityDark;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleDark;
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };
  };

  // Scene Setup
  private createScene = (): void => {
    this.setTextures();
    this.setPositions();
    this.setLightings();
    this.scene.add(
      this.playerObject,
      this.floor,
      this.wall_1,
      this.wall_2,
      this.wall_3,
      this.wall_4,
      this.ambientLight,
      this.spotlightPrimary,
      this.spotlightSecondary
    );
    const collidables = this.scene.children.filter(obj => obj !== this.playerObject);
    this.physics.setCollidables(collidables);
  };

  private updateTheme = (): void => {
    const alpha = 0.1;
    if (this.theme === 'light') {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, alpha);
      this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleLight, alpha);
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosLight, alpha);
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, alpha);
      this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleDark, alpha);
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosDark, alpha);
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };
  };

  private update = (): void => {
    this.updateTheme();
    const dt = Math.min(this.clock.getDelta(), 1 / 60);
    this.player.applyMovement(dt);
  };

  public startScene = (): void => {
    this.createScene();
    this.gameInput.addInputListener();
    this.rendererController.addResizeListener();
    this.cameraController.addResizeListener();
    this.rendererController.setAnimation(this.update, this.scene, this.cameraController.camera);
  };

  public endScene = (): void => {
    this.gameInput.removeInputListener();
    this.rendererController.removeResizeListener();
    this.cameraController.removeResizeListener();
  };

  public setTheme = (theme: Themes) => this.theme = theme;
};
