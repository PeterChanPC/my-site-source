import { THREE, MonoBehavior, gameInput, physics, clock } from "@/three/d";
import { projectScene, projectCamera } from "../d";

export class Grid implements MonoBehavior {
  // animation variables
  private readonly maxAmp: number = 0.7;
  private readonly minAmp: number = 0.3;
  private readonly ampCoe: number = this.maxAmp - this.minAmp;
  private readonly maxSpeed: number = 1;
  private readonly minSpeed: number = 0.3;
  private readonly speedCoe: number = this.maxSpeed - this.minSpeed;
  private readonly phaseCoe: number = 2 * Math.PI;
  private readonly amplitudes: number[] = [];
  private readonly speeds: number[] = [];
  private readonly phases: number[] = [];
  // interactive variables 
  private readonly maxMouseEffect: number = 3.5;
  private readonly mouseEffectSigma: number = 8;
  private readonly tailEffect: number[] = [];
  // general
  private readonly size: number;
  private readonly gap: number = 0.02;
  private readonly dummy: THREE.Object3D = new THREE.Object3D();
  private readonly mesh: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, size: number = 0) {
    this.size = size;
    const count = size ** 2;
    this.mesh = new THREE.InstancedMesh(geometry, material, count);

    for (let i = 0; i < count; i++) {
      this.amplitudes[i] = Math.random() * this.ampCoe + this.minAmp; // range(0.3, 0.7)
      this.speeds[i] = Math.random() * this.speedCoe + this.minSpeed; // range(0.3, 1)
      this.phases[i] = this.phaseCoe * Math.random(); // range(0, 2 * Math.PI)
      this.tailEffect.push(0);
    };
  };

  public setPos(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  };

  public start(): void {
    this.update();
    projectScene.add(this.mesh);
  };

  public update(): void {
    let count = 0;
    const mouseWorldPos = physics.screenPointToWorld(projectCamera.camera, gameInput.mousePos.x, gameInput.mousePos.y);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const x = i * (1 + this.gap);
        const y = j * (1 + this.gap);
        const z = this.amplitudes[count] * Math.sin(clock.getElapsedTime() * this.speeds[count] + this.phases[count]); // z = A * sin(wt + theta)

        let distance = 999;
        if (mouseWorldPos) distance = (mouseWorldPos.x - x - this.mesh.position.x) ** 2 + (mouseWorldPos.y - y - this.mesh.position.y) ** 2; // distance between cube and mouse (squared)
        const mouseEffect = this.maxMouseEffect * Math.exp(-distance / this.mouseEffectSigma) // gaussian peak
        let t = 0.5;
        if (mouseEffect < this.tailEffect[count]) t = 0.2;
        this.tailEffect[count] = THREE.MathUtils.lerp(this.tailEffect[count], mouseEffect, t);

        this.dummy.position.x = x;
        this.dummy.position.y = y;
        this.dummy.position.z = z + this.tailEffect[count];
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(count, this.dummy.matrix);
        count++;
      };
    };
    this.mesh.instanceMatrix.needsUpdate = true;
  };

  public end(): void {
    projectScene.remove(this.mesh);
    this.mesh.dispose();
  };
};
