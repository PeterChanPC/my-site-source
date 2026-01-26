import { THREE, MonoBehavior, Themes, useThemeStore } from "@/three/d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { projectScene, Font } from "../d";

const SupportedWork = ['Todos', 'Calender', 'Cool Styles', 'three.js', 'Calculator'];

export class Text implements MonoBehavior {
  private object: THREE.Object3D = new THREE.Object3D();
  private originalScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private boundingMaterial: THREE.MeshBasicMaterial;
  private boundingGeometry: THREE.BoxGeometry;
  private textMaterial: THREE.MeshBasicMaterial;
  private textGeometry: TextGeometry;
  private text: THREE.Mesh;
  private boundingBox: THREE.Mesh;

  constructor() {
    const loader = new FontLoader();
    const font = loader.parse(Font);
    const text = SupportedWork[Math.floor(Math.random() * SupportedWork.length)];

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

    this.object.add(this.text, this.boundingBox);
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
    this.object.children.forEach(child => {
      child.scale.lerp(this.originalScale, 0.1);
    });
  };

  public setPos(x: number, y: number, z: number): void {
    this.object.position.set(x, y, z);
  };

  public start(): void {
    this.updateTheme();
    this.object.layers.enable(1);
    this.text.layers.enable(1);
    this.boundingBox.layers.enable(1);

    projectScene.add(this.object);
  };

  public update(): void {
    this.updateTheme();
    this.updateScale();
  };

  public end(): void {
    projectScene.remove(this.object);
    this.textGeometry.dispose();
    this.textMaterial.dispose();
    this.boundingGeometry.dispose();
    this.boundingMaterial.dispose();
  };
};