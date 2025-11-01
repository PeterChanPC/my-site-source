import { THREE } from "../three";

export class Cubes {
  private readonly color: THREE.Color = new THREE.Color(0xff0000);
  private readonly _width: number = 80;
  private readonly _height: number = 46;
  private readonly maxCount: number = this._width * this._height;
  private readonly gap: number = 0.02;
  private readonly MIN_AMPLITUDE = 0.5;
  private readonly AMPLITUDE_COE = 0.5;
  private readonly MIN_SPEED = 0.5;
  private readonly SPEED_COE = 0.5;
  private readonly PHASE_COE = 2 * Math.PI;
  private readonly MAX_EFFECT = 3.5;
  private readonly EFFECT_COE = 5;
  private amplitudes: number[] = [];
  private speeds: number[] = [];
  private phases: number[] = [];
  private dummy: THREE.Object3D = new THREE.Object3D();
  private cubes: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    this.cubes = new THREE.InstancedMesh(geometry, material, this.maxCount);
    for (let i = 0; i < this.maxCount; i++) {
      this.amplitudes[i] = Math.random() * this.AMPLITUDE_COE + this.MIN_AMPLITUDE; // range(0.5, 1)
      this.speeds[i] = Math.random() * this.SPEED_COE + this.MIN_SPEED; // range(0.5, 1)
      this.phases[i] = this.PHASE_COE * Math.random(); // range(0, 2 * Math.PI)
    };
    this.update(0, new THREE.Vector3(999, 999, 999)); // initialize
  };

  public update(time: number, mouseWorldPos: THREE.Vector3): void {
    let count = 0;
    for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        const x = -i * (1 + this.gap);
        const y = -j * (1 + this.gap);
        const z = this.amplitudes[count] * Math.sin(time * this.speeds[count] + this.phases[count]); // z = A * sin(wt + theta)
        const distance = Math.sqrt((mouseWorldPos.x - x) ** 2 + (mouseWorldPos.y - y) ** 2); // distance between cube and mouse
        const mouseFollowEffect = Math.min(this.EFFECT_COE / distance, this.MAX_EFFECT); // scale with 1 / distance
        this.dummy.position.x = x;
        this.dummy.position.y = y;
        this.dummy.position.z = z - mouseFollowEffect;
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