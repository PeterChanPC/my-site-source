import { THREE, MonoBehavior, Themes, useThemeStore, gameInput, physics } from "@/three/d";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { projectScene, projectCamera, Font } from "../d";

const SupportedWork = ['Todos', 'Calender', 'Cool Styles', 'three.js', 'Calculator'];

export class Text implements MonoBehavior {
  private object: THREE.Object3D = new THREE.Object3D();
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
    this.boundingGeometry = new THREE.BoxGeometry(1, 1);
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

  private hover() {
    const mousePos = gameInput.mousePos;
    const hits = physics.getRaycastHitFromScreen(projectCamera.camera, mousePos.x, mousePos.y, 1);
    hits?.forEach(hit => {
      hit.object.scale.setScalar(1.2)
      console.log(hit.object)
    });
  };

  public setPos(x: number, y: number, z: number): void {
    this.object.position.set(x, y, z);
  };

  public start(): void {
    this.updateTheme();
    this.object.layers.enable(1);

    projectScene.add(this.object);
  };

  public update(): void {
    this.updateTheme();
  };

  public end(): void {
    projectScene.remove(this.object);
    this.textGeometry.dispose();
    this.textMaterial.dispose();
  };
};