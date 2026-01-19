import { MonoBehavior, RendererController, physics, gameInput } from "@/three/d";
import { homepageScene, homepageCamera, Lights, Player, Walls } from "./d";

export class HomepageGame implements MonoBehavior {
  private walls: Walls = new Walls();
  private player: Player = new Player();
  private lights: Lights = new Lights();
  private rendererController: RendererController;

  constructor(canvas: HTMLCanvasElement) {
    this.rendererController = new RendererController(canvas);
  };

  public enableGameInput(): void {
    gameInput.start();
  };

  public start(): void {
    this.player.start();
    this.walls.start();
    this.lights.start();
    homepageCamera.start();

    const collidables = homepageScene.children.filter(obj => obj !== this.player.obj);
    physics.setCollidables(collidables);
    this.rendererController.start();
    this.rendererController.startAnimation(() => this.update(), homepageScene, homepageCamera.camera);
  };

  public update(): void {
    this.player.update();
    this.walls.update();
    this.lights.update();
  };

  public end(): void {
    homepageCamera.end();
    gameInput.end();
    this.rendererController.end();
    this.player.end();
    this.walls.end();
    this.lights.end();
  };
};
