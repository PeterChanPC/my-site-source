import { THREE, MonoBehavior, Themes, useThemeStore } from "@/three/d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { projectScene, projectCamera } from "../d";

export class Text implements MonoBehavior {
  private material: THREE.MeshBasicMaterial | null = null;
  private geometry: TextGeometry | null = null;
  private _object: THREE.Mesh | null = null;
  private position: THREE.Vector3 = new THREE.Vector3();

  constructor(text: string) {
    this.createMesh(text);
  };

  private async createMesh(text: string): Promise<void> {
    const loader = new FontLoader();
    const url = 'src/assets/font/helvetiker_regular.typeface.json';
    const font = await loader.loadAsync(url);

    this.geometry = new TextGeometry(text, {
      font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 8,
    });
    this.geometry.center();
    this.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    this._object = new THREE.Mesh(this.geometry, this.material);

    this.start();
  };

  private updateTheme(): void {
    const themeStore = useThemeStore();

    if (themeStore.theme === Themes.Light) {
      this.material?.color.set(0x000000);
    } else if (themeStore.theme === Themes.Dark) {
      this.material?.color.set(0xffffff);
    };
  };

  private updateLookAt(): void {
    this._object?.lookAt(projectCamera.camera.position);
  };

  public setPos(x: number, y: number, z: number): void { // position of object can only be changed after start
    this.position.set(x, y, z);
  };

  public start(): void { // this is called within this module due to async nature, there is no need to call it in the parent
    if (!this._object) return;
    this.updateTheme();
    this._object.position.copy(this.position);

    projectScene.add(this._object);
  };

  public update(): void {
    this.updateTheme();
    this.updateLookAt();
  };

  public end(): void {
    if (this._object) projectScene.remove(this._object);
    this.geometry?.dispose();
    this.material?.dispose();
  };

  get object(): THREE.Mesh | null {
    return this._object;
  };
};