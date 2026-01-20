import { MonoBehavior, RendererController, physics, gameInput } from "@/three/d";
import { projectScene, projectCamera, Lights, Player, ChunkLoader } from "./d";

export class ProjectGame implements MonoBehavior {
  private lights: Lights = new Lights();
  private player: Player = new Player();
  private chunkLoader: ChunkLoader = new ChunkLoader(8, 3);
  private rendererController: RendererController;

  constructor(canvas: HTMLCanvasElement) {
    this.rendererController = new RendererController(canvas);
  };

  public start(): void {
    this.lights.start();
    this.player.start();
    this.chunkLoader.start();
    projectCamera.start();

    physics.setCollidables([this.player.obj]);
    gameInput.start();
    this.rendererController.start();
    this.rendererController.startAnimation(() => this.update(), projectScene, projectCamera.camera);
  };

  public update(): void {
    this.lights.update();
    this.player.update();
    this.chunkLoader.update();
    projectCamera.update();
  };

  public end(): void {
    gameInput.end();
    this.rendererController.end();
    this.lights.end();
    this.player.end();
    this.chunkLoader.end();
  };
};
