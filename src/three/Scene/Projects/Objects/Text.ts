import { THREE, MonoBehavior, Themes, useThemeStore } from "@/three/d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { projectScene, Font } from "../d";

const SupportedWork = ['Home', 'Works', 'Blogs', 'Test'];
const SupportedName = ['/', '/works', '/blogs', '/test'];

export class Text implements MonoBehavior {
  private originalScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private boundingMaterial: THREE.MeshBasicMaterial;
  private boundingGeometry: THREE.BoxGeometry;
  private boundingBox: THREE.Mesh;
  private textMaterial: THREE.MeshBasicMaterial;
  private textGeometry: TextGeometry;
  private text: THREE.Mesh;

  constructor() {
    const loader = new FontLoader();
    const font = loader.parse(Font);
    const randInt = Math.floor(Math.random() * SupportedWork.length);
    const text = SupportedWork[randInt];
    const name = SupportedName[randInt];

    this.textGeometry = new TextGeometry(text, {
      font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 8,
    });
    this.textGeometry.center();
    this.textMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    this.text = new THREE.Mesh(this.textGeometry, this.textMaterial);

    this.boundingMaterial = new THREE.MeshBasicMaterial({ visible: false });
    this.boundingGeometry = new THREE.BoxGeometry(3.5, 1);
    this.boundingBox = new THREE.Mesh(this.boundingGeometry, this.boundingMaterial);
    this.boundingBox.name = name;
    this.boundingBox.add(this.text);
  };

  private updateTheme(): void {
    const themeStore = useThemeStore();

    if (themeStore.theme === Themes.Light) {
      this.textMaterial.color.set(0x000000);
    } else if (themeStore.theme === Themes.Dark) {
      this.textMaterial.color.set(0xffffff);
    };
  };

  private updateScale(): void {
    const alpha = 0.1;
    this.text.scale.lerp(this.originalScale, alpha);
    this.boundingBox.scale.lerp(this.originalScale, alpha);
  };

  public setPos(x: number, y: number, z: number): void {
    this.boundingBox.position.set(x, y, z);
  };

  public start(): void {
    this.updateTheme();
    this.text.layers.enable(1);
    this.boundingBox.layers.enable(1);

    projectScene.add(this.boundingBox);
  };

  public update(): void {
    this.updateTheme();
    this.updateScale();
  };

  public end(): void {
    projectScene.remove(this.boundingBox);
    this.textGeometry.dispose();
    this.textMaterial.dispose();
    this.boundingGeometry.dispose();
    this.boundingMaterial.dispose();
  };
};