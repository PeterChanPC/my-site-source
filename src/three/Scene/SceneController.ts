import { SupportedTheme } from "@/stores/d";
import { HomepageSceneController, ProjectSceneController } from "../three";

export interface ISceneController {
  startScene(): void;
  endScene(): void;
  setTheme(theme: SupportedTheme): void;
};

export class SceneController implements ISceneController {
  private controller: ISceneController;

  constructor(canvas: HTMLCanvasElement, scene: 'homepage' | 'project', theme: SupportedTheme = 'light') {
    if (scene === 'homepage') {
      this.controller = new HomepageSceneController(canvas, theme);
    } else if (scene === 'project') {
      this.controller = new ProjectSceneController(canvas, theme);
    } else {
      throw new Error('Invalid Scene');
    };
  };

  public startScene = (): void => this.controller.startScene();

  public endScene = (): void => this.controller.endScene();

  public setTheme = (theme: SupportedTheme) => this.controller.setTheme(theme);
};