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
  private maxCount = 10000;
  private widthCount = window.innerWidth / 20;
  private heightCount = window.innerHeight / 20;
  private wall = new THREE.InstancedMesh(this.boxGeometry, this.material, this.maxCount);
  private dummy = new THREE.Object3D();

  // Light
  private ambientLight = new THREE.AmbientLight(0xffffff);
  private pointLight = new THREE.PointLight(0xffffff);

  // Player
  private player = new THREE.PointLight(0xffffff);

  // Setup
  private speeds: number[] = [];
  private phases: number[] = [];
  private amplitudes: number[] = [];

  private setup = (): void => {
    for (let i = 0; i < this.maxCount; i++) {
      this.speeds[i] = Math.random() / 2;
      this.phases[i] = Math.random() * Math.PI * 2;
      this.amplitudes[i] = Math.random() / 2 + 1;
    };

    this.pointLight.position.set(0, 0, -5);
    this.pointLight.intensity = 20;

    if (this.theme === 'light') {
      this.ambientLight.intensity = 1;
    } else {
      this.ambientLight.intensity = 0;
    };
  };

  // Create Scene
  public createScene = (): void => {
    this.setup();
    this.scene.add(this.ambientLight, this.pointLight, this.wall, this.player);
  };

  get getScene(): THREE.Scene {
    return this.scene;
  };

  public animate = (): void => {
    this.widthCount = window.innerWidth / 20;
    this.heightCount = window.innerHeight / 20;
    this.wall.count = this.widthCount * this.heightCount;
    const halfWidth = this.widthCount / 2;
    const halfHeight = this.heightCount / 2;
    let count = 0;
    const gap = 0.02;
    const time = this.clock.getElapsedTime();
    for (let i = -halfWidth; i < halfWidth; i++) {
      for (let j = -halfHeight; j < halfHeight; j++) {
        this.dummy.position.x = i * (1 + gap);
        this.dummy.position.y = j * (1 + gap);
        this.dummy.position.z = Math.sin(time * this.speeds[count] * this.phases[count] * this.amplitudes[count]) / 2;
        this.dummy.updateMatrix();
        this.wall.setMatrixAt(count, this.dummy.matrix);
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

  get getPlayerObject() {
    return this.player;
  };
};