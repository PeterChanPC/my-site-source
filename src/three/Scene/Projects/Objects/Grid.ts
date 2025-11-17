import { GameInput, THREE } from "../../../d";

export class Grid {
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
  private readonly targetOverlays: string[];
  private readonly targetCounts: number[] = [];
  private _target: number = -1;
  // general
  private readonly _size: number;
  private readonly gap: number = 0.02;
  private readonly dummy: THREE.Object3D = new THREE.Object3D();
  private readonly _mesh: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, color: THREE.Color, targetOverlays: string[], size: number = 0) {
    this._size = size;
    const count = size ** 2;
    this._mesh = new THREE.InstancedMesh(geometry, material, count);

    this.targetOverlays = targetOverlays;
    for (let i = 0; i < this.targetOverlays.length; i++) {
      const randInt = Math.floor(Math.random() * count);
      this.targetCounts.push(randInt);
      this._mesh.setColorAt(randInt, color);
    };

    for (let i = 0; i < count; i++) {
      this.amplitudes[i] = Math.random() * this.ampCoe + this.minAmp; // range(0.3, 0.7)
      this.speeds[i] = Math.random() * this.speedCoe + this.minSpeed; // range(0.3, 1)
      this.phases[i] = this.phaseCoe * Math.random(); // range(0, 2 * Math.PI)
    };

    this.update(0, new THREE.Vector3(0, 0, 0)); // init
  };

  public setPos(x: number, y: number, z: number): void {
    this._mesh.position.set(x, y, z);
  };

  public update(time: number, mouseWorldPos: THREE.Vector3): void {
    let count = 0;
    let foundTarget = -1;
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        const x = i * (1 + this.gap);
        const y = j * (1 + this.gap);
        const z = this.amplitudes[count] * Math.sin(time * this.speeds[count] + this.phases[count]); // z = A * sin(wt + theta)
        const distance = (mouseWorldPos.x - x - this._mesh.position.x) ** 2 + (mouseWorldPos.y - y - this._mesh.position.y) ** 2; // distance between cube and mouse (squared)
        const mouseEffect = this.maxMouseEffect * Math.exp(-distance / this.mouseEffectSigma) // gaussian peak
        this.dummy.position.x = x;
        this.dummy.position.y = y;
        this.dummy.position.z = z - mouseEffect;
        if (this.targetCounts.includes(count) && Math.floor(distance) === 0) {
          foundTarget = this.targetCounts.indexOf(count);
        };
        this.dummy.updateMatrix();
        this._mesh.setMatrixAt(count, this.dummy.matrix);
        count++;
      };
    };
    this._mesh.instanceMatrix.needsUpdate = true;
    this._target = foundTarget;
  };

  public getTargetOverlay(): string | undefined {
    if (this._target === -1) return undefined;
    return this.targetOverlays[this._target];
  };

  public get mesh(): THREE.InstancedMesh {
    return this._mesh;
  };
};