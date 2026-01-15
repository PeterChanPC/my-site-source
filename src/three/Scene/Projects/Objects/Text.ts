import { THREE, MonoBehavior, gameInput, physics, clock, Themes } from "@/three/d";
import { projectScene, projectCamera } from "../d";
import { Font, FontLoader } from "three/examples/jsm/Addons.js";
import { useThemeStore } from "@/stores/theme.store";

export class Text implements MonoBehavior {
  private text: string;
  private theme: Themes = Themes.Light;
  private loader: FontLoader = new FontLoader();
  private url: string = 'src/assets/font/helvetiker_regular.typeface.json';
  private material: THREE.LineBasicMaterial = new THREE.LineBasicMaterial();
  private _object: THREE.Mesh = new THREE.Mesh();

  constructor(text: string) {
    this.text = text;
    this.loader.load(this.url, (font) => this.onLoad(font));
  };

  private updateColor(): void {
    const themeStore = useThemeStore();
    if (this.theme === themeStore.theme) return;
    this.theme = themeStore.theme;
    if (themeStore.theme === Themes.Light) {
      this.material.color.set(0x000000);
    } else if (themeStore.theme === Themes.Dark) {
      this.material.color.set(0xffffff);
    };
  };

  private updateDirection(): void {
    this._object.lookAt(projectCamera.camera.position);
  };

  private onLoad(font: Font) {
    const shapes = font.generateShapes(this.text, 1);
    const geometry = new THREE.ShapeGeometry(shapes);
    const object = new THREE.Mesh(geometry, this.material);
    this.updateColor();
    this._object = object;
    console.log(this._object)
  };

  public start(): void {
    if (!this._object) return;
    this._object.position.z = 8;

    projectScene.add(this._object);
  };

  public update(): void {
    this.updateColor();
    this.updateDirection();
    // console.log(this._object.position.z)
  };

  public end(): void {

  };
};