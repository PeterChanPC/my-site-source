import { THREE, MonoBehavior } from "@/three/d";
import { projectCamera, Grid, Text } from "../d";

export class ChunkLoader implements MonoBehavior {
  private readonly _size: number;
  private readonly _renderDist: number;
  private loadedChunks: Map<string, Grid> = new Map();
  private center: THREE.Vector2 = new THREE.Vector2(0, 0);
  private geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 3);
  private material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.1,
  });
  private text = new Text('my work 1');

  constructor(size: number, _renderDist: number) {
    this._size = size;
    this._renderDist = _renderDist;
  };

  private getCurrentGridFromWorld(): void {
    this.center.set(
      Math.floor(projectCamera.camera.position.x / this._size), // x
      Math.floor(projectCamera.camera.position.y / this._size) // y
    );
  };

  private updateChunks(): void {
    const neededChunks = new Set();

    for (let i = -this._renderDist; i <= this._renderDist; i++) {
      for (let j = -this._renderDist; j <= this._renderDist; j++) {
        const x = this.center.x + i;
        const y = this.center.y + j;
        const key = `${x},${y}`;
        neededChunks.add(key);
        if (!this.loadedChunks.has(key)) {
          const chunk = new Grid(this.geometry, this.material, this._size);
          const chunkX = x * this._size;
          const chunkY = y * this._size;
          chunk.setPos(chunkX, chunkY, 0);
          chunk.start();
          this.loadedChunks.set(key, chunk);
        };
      };
    };

    for (const key of this.loadedChunks.keys()) {
      if (!neededChunks.has(key)) {
        const chunk = this.loadedChunks.get(key);
        if (chunk) {
          chunk.end();
        };
        this.loadedChunks.delete(key);
      };
    };
  };

  public start(): void {
    this.text.start();
  };

  public update(): void {
    this.text.update();
    this.getCurrentGridFromWorld();
    this.updateChunks();
    this.loadedChunks.forEach(chunk => chunk.update());
  };

  public end(): void {
    this.text.end();
    this.loadedChunks.forEach(chunk => chunk.end());
    this.geometry.dispose();
    this.material.dispose();
  };
};
