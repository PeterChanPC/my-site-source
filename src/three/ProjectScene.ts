import * as THREE from 'three';
import { SupportedTheme } from "@/stores/d";

export default class SceneController {
  private scene: THREE.Scene;
  private clock: THREE.Clock;
  private theme?: SupportedTheme;

  constructor(theme?: SupportedTheme) {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.theme = theme || 'light';
  };

  // Materials
  private material = new THREE.MeshLambertMaterial({ color: 0xffffff });

  // Geometry
  private boxGeometry = new THREE.BoxGeometry(1, 1, 2);

  // Objects
  private widthCount = 100;
  private heightCount = 100;
  private wall = new THREE.InstancedMesh(this.boxGeometry, this.material, this.widthCount * this.heightCount);
  private dummy = new THREE.Object3D();

  // Light
  private ambientLight = new THREE.AmbientLight(0xffffff);
  private directionalLight1 = new THREE.DirectionalLight(0xffffff);
  private directionalLight2 = new THREE.DirectionalLight(0xffffff);

  // Color
  private wallColor1 = new THREE.Color(0xffffff);
  private wallColor2 = new THREE.Color(0xf0f0f0);
  private wallColor3 = new THREE.Color(0xeeeeee);

  // Setup
  private speeds: number[] = [];
  private phases: number[] = [];
  private amplitudes: number[] = [];

  private setup = (): void => {
    for (let i = 0; i < this.widthCount * this.heightCount; i++) {
      this.speeds[i] = Math.random() / 2;
      this.phases[i] = Math.random() * Math.PI * 2;
      this.amplitudes[i] = Math.random() / 2 + 1;
    };

    this.scene.fog = new THREE.Fog(0xffffff, -10, 50);

    this.directionalLight1.position.set(10, 5, 10);
    this.directionalLight2.position.set(-10, 5, 10);
    this.directionalLight1.intensity = 2;

    if (this.theme === 'light') {
      this.ambientLight.intensity = 1;
    } else {
      this.ambientLight.intensity = 0;
    };
  };

  // Create Scene
  public createScene = (): void => {
    this.setup();
    this.scene.add(this.ambientLight, this.directionalLight1, this.directionalLight2, this.wall);
  };

  get getScene(): THREE.Scene {
    return this.scene;
  };

  public animate = (): void => {
    const time = this.clock.getElapsedTime();
    let count = 0;
    const halfWidth = this.widthCount / 2;
    const halfHeight = this.heightCount / 2;
    for (let i = -halfWidth; i < halfWidth; i++) {
      for (let j = -halfHeight; j < halfHeight; j++) {
        this.dummy.position.x = i;
        this.dummy.position.y = j;
        this.dummy.position.z = Math.sin(time * this.speeds[count] * this.phases[count] * this.amplitudes[count]) / 2;
        this.dummy.updateMatrix();
        this.wall.setMatrixAt(count, this.dummy.matrix);

        if (count % 3 === 0) {
          this.wall.setColorAt(count, this.wallColor1)
        } else if (count % 3 === 1) {
          this.wall.setColorAt(count, this.wallColor2);
        } else {
          this.wall.setColorAt(count, this.wallColor3);
        };
        count++;
      };
    };
    this.wall.instanceMatrix.needsUpdate = true;
  };

  public changeTheme = (theme: SupportedTheme): void => {
    if (this.theme !== theme) this.theme = theme;
    if (this.theme === 'light') {
      if (this.ambientLight.intensity < 1) this.ambientLight.intensity += 0.05;
    } else {
      if (this.ambientLight.intensity > 0) this.ambientLight.intensity -= 0.05;
    };
  };
};