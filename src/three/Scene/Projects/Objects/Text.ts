import { THREE, MonoBehavior, Themes } from "@/three/d";
import { projectScene, projectCamera } from "../d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { useThemeStore } from "@/stores/theme.store";

export class Text implements MonoBehavior {
  private theme: Themes = Themes.Light;
  private _object: THREE.Mesh | null = null;

  constructor(text: string) {
    this.createMesh(text);
  };

  private async createMesh(text: string): Promise<void> {
    const loader = new FontLoader();
    const url = 'src/assets/font/helvetiker_regular.typeface.json';
    const font = await loader.loadAsync(url);

    const geometry = new TextGeometry(text, {
      font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 8,
    });
    geometry.center();

    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });

    this._object = new THREE.Mesh(geometry, material);
    this.updateColor();
    this.start();
  };

  private updateColor(): void {
    const themeStore = useThemeStore();
    if (this.theme === themeStore.theme || !this._object) return;
    this.theme = themeStore.theme;
    if (themeStore.theme === Themes.Light) {
      this._object.material.color.set(0x000000);
    } else if (themeStore.theme === Themes.Dark) {
      this._object.material.color.set(0xffffff);
    };
  };

  private updateDirection(): void {
    this._object?.lookAt(projectCamera.camera.position);
  };


  public start(): void {
    if (!this._object) return;
    this._object.position.z = 8;

    projectScene.add(this._object);
  };

  public update(): void {
    this.updateColor();
    this.updateDirection();
  };

  public end(): void {
    if (!this._object) return;
    projectScene.remove(this._object);
  };
};