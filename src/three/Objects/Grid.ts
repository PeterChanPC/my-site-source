import { GameInput, THREE } from "../three";

export class Grid {
  private readonly _size: number;
  private readonly gap: number = 0.02;
  private readonly maxAmp: number = 0.7;
  private readonly minAmp: number = 0.3;
  private readonly ampCoe: number = this.maxAmp - this.minAmp;
  private readonly maxSpeed: number = 1;
  private readonly minSpeed: number = 0.3;
  private readonly speedCoe: number = this.maxSpeed - this.minSpeed;
  private readonly phaseCoe: number = 2 * Math.PI;
  private readonly maxMouseEffect: number = 3.5;
  private readonly mouseEffectSigma: number = 8;
  private readonly color: THREE.Color = new THREE.Color(0xff0000);
  private amplitudes: number[] = [];
  private speeds: number[] = [];
  private phases: number[] = [];
  private dummy: THREE.Object3D = new THREE.Object3D();
  private _mesh: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, size: number = 0) {
    this._size = size;
    const count = size ** 2;
    this._mesh = new THREE.InstancedMesh(geometry, material, count);
    this._mesh.setColorAt(Math.floor(Math.random() * count), this.color);

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
        this.dummy.updateMatrix();
        this._mesh.setMatrixAt(count, this.dummy.matrix);
        count++;
      };
    };
    this._mesh.instanceMatrix.needsUpdate = true;
  };

  public get mesh(): THREE.InstancedMesh {
    return this._mesh;
  };
};