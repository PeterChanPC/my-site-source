import { THREE } from "../three";

export class Cubes {
  private readonly _width: number = 80;
  private readonly _height: number = 46;
  private readonly maxCount: number = this._width * this._height;
  private readonly gap: number = 0.02;
  private readonly maxAmp: number = 0.7;
  private readonly minAmp: number = 0.3;
  private readonly ampCoe: number = this.maxAmp - this.minAmp;
  private readonly maxSpeed: number = 1;
  private readonly minSpeed: number = 0.3;
  private readonly speedCoe: number = this.maxSpeed - this.minSpeed;
  private readonly phaseCoe: number = 2 * Math.PI;
  private readonly maxMouseEffect: number = 3.5;
  private readonly mouseEffectCoe: number = 5;
  private readonly color: THREE.Color = new THREE.Color(0xff0000);
  private amplitudes: number[] = [];
  private speeds: number[] = [];
  private phases: number[] = [];
  private dummy: THREE.Object3D = new THREE.Object3D();
  private cubes: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    this.cubes = new THREE.InstancedMesh(geometry, material, this.maxCount);
    for (let i = 0; i < this.maxCount; i++) {
      this.amplitudes[i] = Math.random() * this.ampCoe + this.minAmp; // range(0.5, 1)
      this.speeds[i] = Math.random() * this.speedCoe + this.minSpeed; // range(0.5, 1)
      this.phases[i] = this.phaseCoe * Math.random(); // range(0, 2 * Math.PI)
    };
    this.update(0, new THREE.Vector3(999, 999, 999)); // init
  };

  public update(time: number, mouseWorldPos: THREE.Vector3): void {
    let count = 0;
    for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        const x = -i * (1 + this.gap);
        const y = -j * (1 + this.gap);
        const z = this.amplitudes[count] * Math.sin(time * this.speeds[count] + this.phases[count]); // z = A * sin(wt + theta)
        const distance = Math.sqrt((mouseWorldPos.x - x) ** 2 + (mouseWorldPos.y - y) ** 2); // distance between cube and mouse
        const mouseEffect = Math.min(this.mouseEffectCoe / distance, this.maxMouseEffect); // scale with 1 / distance
        this.dummy.position.x = x;
        this.dummy.position.y = y;
        this.dummy.position.z = z - mouseEffect;
        this.dummy.updateMatrix();
        this.cubes.setMatrixAt(count, this.dummy.matrix);
        count++;
      };
    };
    this.cubes.instanceMatrix.needsUpdate = true;
  };

  public get height(): number {
    return this._height;
  };

  public get width(): number {
    return this._width;
  };

  public get mesh(): THREE.InstancedMesh {
    return this.cubes;
  };
};