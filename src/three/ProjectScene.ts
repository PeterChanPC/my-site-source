import * as THREE from 'three';
import { SupportedTheme } from "@/stores/d";

export default class SceneController {
  private scene: THREE.Scene;
  private theme: SupportedTheme;
  private clock: THREE.Clock;
  private vertices: number[];
  private circles: THREE.Mesh[];

  constructor(theme: SupportedTheme) {
    this.scene = new THREE.Scene();
    this.theme = theme || 'light';
    this.clock = new THREE.Clock();
    this.circles = []
    this.vertices = [];
  };

  // Geometry
  private createGeometry = (): THREE.BufferGeometry => new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
  private lineGeometry = this.createGeometry();

  // Materials
  private materialLight = new THREE.PointsMaterial({ color: 0x000000, size: 2 });
  private materialDark = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });

  // Objects
  private line = new THREE.Line(this.lineGeometry, this.materialLight);

  // Ambient Light
  private ambientLight = new THREE.AmbientLight(0xcccccc);
  private ambientDark = new THREE.AmbientLight(0x333333);

  // Setup
  private setup = (): void => {
    const depth = 2;
    this.line.position.set(0, 0, 0);

    for (let i = 0; i < depth; i++) {
      const circle = new THREE.Mesh(new THREE.RingGeometry(3, 3.1, 30, 1), this.materialLight);
      this.circles.push(circle);
    };
  };

  public createScene = (): void => {
    this.setup();
    this.scene.add(this.line, this.ambientLight);
    for (let i = 0; i < this.circles.length; i++) {
      this.scene.add(this.circles[i]);
    };
  };

  get getScene(): THREE.Scene {
    return this.scene;
  };

  public updateProps = (): void => {
    const t = this.clock.getElapsedTime();
    for (let i = 0; i < this.circles.length; i++) {
      const pos = this.circles[i].position;
      const x = pos.x + Math.sin(2 * Math.PI * t * i);
      const y = pos.y + Math.cos(2 * Math.PI * t * i);
      pos.set(x, y, 0);
    };
    this.line.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
  };

  public changeTheme = (theme: SupportedTheme): void => {
    if (this.theme !== theme) this.theme = theme;
    if (this.theme === 'light') {
      this.scene.remove(this.ambientDark);
      this.scene.add(this.ambientLight);
      this.line.material = this.materialLight;
      this.circles.forEach(circle => circle.material = this.materialLight);
    } else {
      this.scene.remove(this.ambientLight);
      this.scene.add(this.ambientDark);
      this.line.material = this.materialDark;
      this.circles.forEach(circle => circle.material = this.materialDark);
    };
  };
};