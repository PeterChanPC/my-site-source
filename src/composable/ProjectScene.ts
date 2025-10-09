import * as THREE from 'three';
import { SupportedTheme } from "@/stores/d";

export default class SceneController {
  private scene: THREE.Scene;
  private theme: SupportedTheme;

  constructor(theme: SupportedTheme) {
    this.scene = new THREE.Scene();
    this.theme = theme || 'light';
  };

  private createGeometry = (): THREE.BufferGeometry => {
    const vertices = [];

    for (let i = 0; i < 200; i++) {
      const x = THREE.MathUtils.randFloatSpread(20);
      const y = THREE.MathUtils.randFloatSpread(20);
      const z = THREE.MathUtils.randFloatSpread(20);

      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  };

  // Materials
  private pointMaterialLight = new THREE.PointsMaterial({ color: 0x000000, size: 2 });
  private pointMaterialDark = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });

  // Geometry
  private pointGeometry = this.createGeometry();

  // ball
  private points = new THREE.Points(this.pointGeometry, this.pointMaterialLight);

  // Ambient Light
  private ambientLight = new THREE.AmbientLight(0xcccccc);
  private ambientDark = new THREE.AmbientLight(0x333333);

  // Positions Setup
  private setPositions = (): void => {
    this.points.position.set(0, 0, 0);
  };

  // Scene Setup
  public createScene = (): void => {
    this.setPositions();
    this.scene.add(this.points, this.ambientLight);
  };

  get getScene(): THREE.Scene {
    return this.scene;
  };

  public changeTheme = (theme: SupportedTheme): void => {
    if (this.theme !== theme) this.theme = theme;
    if (this.theme === 'light') {
      this.scene.remove(this.ambientDark);
      this.points.material = this.pointMaterialLight;
      this.scene.add(this.ambientLight);
    } else {
      this.scene.remove(this.ambientLight);
      this.points.material = this.pointMaterialDark;
      this.scene.add(this.ambientDark);
    };
  };
};