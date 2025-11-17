import { THREE, RendererController, Physics, GameInput, MonoBehavior } from "@/three/d";
import { Camera, Lights, Player, Walls } from "./Objects/d";
import { Themes } from "@/stores/d";

export class HomepageGame implements MonoBehavior {
  // objects
  private walls: Walls = new Walls();
  private lights: Lights;
  // general
  private clock: THREE.Clock = new THREE.Clock();
  private scene: THREE.Scene = new THREE.Scene();
  private camera: Camera = new Camera();
  private gameInput: GameInput = new GameInput();
  private physics: Physics = new Physics(this.camera.obj);
  private player: Player = new Player(this.gameInput, this.physics);
  private rendererController: RendererController;

  constructor(canvas: HTMLCanvasElement, theme: Themes) {
    this.rendererController = new RendererController(canvas);
    this.lights = new Lights(theme);
  };

  public setTheme(theme: Themes) {
    this.lights.setTheme(theme);
  };

  public start(): void {
    this.camera.start();
    this.player.start(this.scene);
    this.walls.start(this.scene);
    this.lights.start(this.scene);

    const collidables = this.scene.children.filter(obj => obj !== this.player.obj);
    this.physics.setCollidables(collidables);
    this.gameInput.start();
    this.rendererController.start();
    this.rendererController.startAnimation(() => {
      this.camera.update();
      this.player.update(this.clock);
      this.walls.update();
      this.lights.update();
      this.gameInput.update();
      this.rendererController.update();
    }, this.scene, this.camera.obj);
  };

  public update(): void {

  };

  public end(): void {
    this.camera.end();
    this.player.end();
    this.walls.end();
    this.lights.end();
    this.gameInput.end();
    this.rendererController.end();
  };
};
