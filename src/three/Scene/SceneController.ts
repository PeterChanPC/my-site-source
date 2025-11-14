import { Themes } from "@/stores/d";
import { HomepageSceneController, ProjectSceneController } from "../three";

export interface ISceneController {
  startScene(): void;
  endScene(): void;
  setTheme(theme: Themes): void;
};

export class SceneController implements ISceneController {
  private controller: ISceneController;

  constructor(canvas: HTMLCanvasElement, scene: 'homepage' | 'project', theme: Themes = Themes.Light) {
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

  public setTheme = (theme: Themes) => this.controller.setTheme(theme);
};