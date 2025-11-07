import { THREE } from "../three";
import { Cubes } from "./Cubes";

export class CubeGenerator {
  private readonly _width: number;
  private readonly _height: number;
  private readonly cubes: Cubes[] = [];

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material, width: number = 0, height: number = 0) {
    this._width = width;
    this._height = height;
    for (let i = 0; i < 9; i++) {
      this.cubes.push(new Cubes(geometry, material, width, height));
    };
  };
};