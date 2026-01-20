import { THREE, MonoBehavior, Themes, useThemeStore } from "@/three/d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { projectScene, projectCamera, Font } from "../d";

export class Text implements MonoBehavior {
  private position: THREE.Vector3 = new THREE.Vector3();
  private material: THREE.MeshBasicMaterial;
  private geometry: TextGeometry;
  private _object: THREE.Mesh;

  constructor(text: string) {
    const loader = new FontLoader();
    const font = loader.parse(Font);

    this.geometry = new TextGeometry(text, {
      font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 8,
    });
    this.geometry.center();
    this.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    this._object = new THREE.Mesh(this.geometry, this.material);
  };

  private updateTheme(): void {
    const themeStore = useThemeStore();

    if (themeStore.theme === Themes.Light) {
      this.material.color.set(0x000000);
    } else if (themeStore.theme === Themes.Dark) {
      this.material.color.set(0xffffff);
    };
  };

  private updateLookAt(): void {
    this._object.lookAt(projectCamera.camera.position);
  };

  public setPos(x: number, y: number, z: number): void { // position of object can only be changed after start
    this._object.position.set(x, y, z);
  };

  public start(): void {
    this.updateTheme();

    projectScene.add(this._object);
  };

  public update(): void {
    this.updateTheme();
    this.updateLookAt();
  };

  public end(): void {
    projectScene.remove(this._object);
    this.geometry.dispose();
    this.material.dispose();
  };

  get object(): THREE.Mesh | null {
    return this._object;
  };
};