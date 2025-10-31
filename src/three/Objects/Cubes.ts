import { THREE } from "../three";

export class Cubes {
  private readonly color: THREE.Color = new THREE.Color(0xff0000);
  private readonly _width: number = 80;
  private readonly _height: number = 46;
  private readonly maxCount: number = this._width * this._height;
  private readonly gap: number = 0.02;
  private readonly EFFECT_THRESHOLD = 3.5;
  private readonly EFFECT_COE = 5;
  private speeds: number[] = [];
  private phases: number[] = [];
  private amplitudes: number[] = [];
  private dummy: THREE.Object3D = new THREE.Object3D();
  private cubes: THREE.InstancedMesh;

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    geometry.computeBoundingBox();
    this.cubes = new THREE.InstancedMesh(geometry, material, this.maxCount);

    for (let i = 0; i < this.maxCount; i++) {
      this.speeds[i] = Math.random() / 2;
      this.phases[i] = Math.random() * Math.PI * 2;
      this.amplitudes[i] = Math.random() / 2 + 1;
    };
    this.update(0, new THREE.Vector3(0, 0, 0)); // initialize
  };

  public update(time: number, mouseWorldPos: THREE.Vector3): void {
    let count = 0;
    for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        const x = -i * (1 + this.gap);
        const y = -j * (1 + this.gap);
        this.dummy.position.x = x;
        this.dummy.position.y = y;
        const z = Math.sin(time * this.speeds[count] * this.phases[count] * this.amplitudes[count]) / 2;
        const effectZ = Math.min(this.EFFECT_COE / Math.sqrt((mouseWorldPos.x - x) ** 2 + (mouseWorldPos.y - y) ** 2), this.EFFECT_THRESHOLD);
        // if (count === 800) console.log(mouseWorldPos)
        this.dummy.position.z = z - effectZ;
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