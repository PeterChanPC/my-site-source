import { THREE, MonoBehavior, gameInput, physics, clock } from "@/three/d";
import { projectScene, projectCamera } from "../d";

export class Grid implements MonoBehavior {
  // animation variables
  private maxAmp: number = 0.7;
  private minAmp: number = 0.3;
  private ampCoe: number = this.maxAmp - this.minAmp;
  private maxSpeed: number = 1;
  private minSpeed: number = 0.3;
  private speedCoe: number = this.maxSpeed - this.minSpeed;
  private phaseCoe: number = 2 * Math.PI;
  private amplitudes: number[] = [];
  private speeds: number[] = [];
  private phases: number[] = [];
  // interactive variables 
  private maxEffect: number = 3.5;
  private effectSigma: number = 8;
  private tailEffect: number[] = [];
  // general
  private size: number;
  private dummy: THREE.Object3D = new THREE.Object3D();
  private mesh: THREE.InstancedMesh;

  // text  

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, size: number = 0) {
    this.size = size;
    const count = size ** 2;
    this.generateGridConstant(count);
    this.mesh = new THREE.InstancedMesh(geometry, material, count);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  };

  private generateGridConstant(count: number): void {
    for (let i = 0; i < count; i++) {
      this.amplitudes[i] = Math.random() * this.ampCoe + this.minAmp; // range(0.3, 0.7)
      this.speeds[i] = Math.random() * this.speedCoe + this.minSpeed; // range(0.3, 1)
      this.phases[i] = this.phaseCoe * Math.random(); // range(0, 2 * Math.PI)
      this.tailEffect.push(0);
    };
  };

  private updateGrid(): void {
    let count = 0;
    const mouseWorldPos = physics.screenPointToWorld(projectCamera.camera, gameInput.mousePos.x, gameInput.mousePos.y);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const x = i;
        const y = j;
        const z = this.amplitudes[count] * Math.sin(clock.getElapsedTime() * this.speeds[count] + this.phases[count]); // z = A * sin(wt + theta)

        // distance between cube and mouse (squared)
        let mouseDist = 999;
        if (mouseWorldPos) mouseDist = (mouseWorldPos.x - x - this.mesh.position.x) ** 2 + (mouseWorldPos.y - y - this.mesh.position.y) ** 2;
        const mouseEffect = this.maxEffect * Math.exp(-mouseDist / this.effectSigma); // gaussian peak

        // distance between cube and text object(squared)
        // let textDist = 999;
        // if (this.text.object) textDist = (this.text.object.position.x - x - this.mesh.position.x) ** 2 + (this.text.object.position.y - y - this.mesh.position.y) ** 2;
        // const textEffect = this.maxEffect * Math.exp(-textDist / this.effectSigma);

        // overall effect
        let t = 0.5;
        if (mouseEffect < this.tailEffect[count]) t = 0.2;
        const combinedEffect = Math.max(mouseEffect, 0);
        this.tailEffect[count] = THREE.MathUtils.lerp(this.tailEffect[count], combinedEffect, t);

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

  public setPos(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  };

  public start(): void {
    this.updateGrid();

    projectScene.add(this.mesh);
  };

  public update(): void {
    this.updateGrid();
  };

  public end(): void {
    projectScene.remove(this.mesh);
    this.mesh.dispose();
  };
};
