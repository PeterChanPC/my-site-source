import { MonoBehavior, RendererController, physics, gameInput } from "@/three/d";
import { projectScene, projectCamera, Lights, Player, ChunkLoader, Text } from "./d";

export class ProjectGame implements MonoBehavior {
  private lights: Lights = new Lights();
  private player: Player = new Player();
  private chunkLoader: ChunkLoader = new ChunkLoader();
  private rendererController: RendererController;

  private text: Text = new Text();

  constructor(canvas: HTMLCanvasElement) {
    this.rendererController = new RendererController(canvas);
  };

  public start(): void {
    this.lights.start();
    this.player.start();
    this.chunkLoader.start();
    this.text.start();
    this.text.setPos(0, 0, 6);
    projectCamera.start();


    physics.setCollidables(projectScene.children);
    gameInput.start();
    this.rendererController.start();
    this.rendererController.startAnimation(() => this.update(), projectScene, projectCamera.camera);
  };

  public update(): void {
    this.lights.update();
    this.player.update();
    this.chunkLoader.update();
    this.text.update();
    projectCamera.update();
  };

  public end(): void {
    gameInput.end();
    this.rendererController.end();
    this.lights.end();
    this.player.end();
    this.chunkLoader.end();
    this.text.end();
  };
};
