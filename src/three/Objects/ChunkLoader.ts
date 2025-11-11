import { THREE, Grid } from "../three";

export class ChunkLoader {
  private readonly _size: number;
  private readonly renderDist: number = 1;
  private loadedChunks: Map<string, Grid> = new Map();
  private center: THREE.Vector2 = new THREE.Vector2(0, 0);

  constructor(size: number) {
    this._size = size;
  };

  private getCurrentGridFromWorld(playerWorldPos: THREE.Vector3): void {
    this.center.set(
      Math.floor(playerWorldPos.x / this._size), // x
      Math.floor(playerWorldPos.y / this._size) // y
    );
  };

  private updateChunks(scene: THREE.Scene): void {
    const neededChunks = new Set();

    for (let i = -this.renderDist; i <= this.renderDist; i++) {
      for (let j = -this.renderDist; j <= this.renderDist; j++) {
        const x = this.center.x + i;
        const y = this.center.y + j;
        const key = `${x}, ${y}`;
        neededChunks.add(key);
        if (!this.loadedChunks.has(key)) {
          const chunk = new Grid(this._size);
          const chunkX = x * this._size * (1 + 0.02) / 2;
          const chunkY = y * this._size * (1 + 0.02) / 2;
          chunk.setPos(chunkX, chunkY, 0);
          scene.add(chunk.mesh);
          this.loadedChunks.set(key, chunk);
        };
      };
    };

    for (const key of this.loadedChunks.keys()) {
      if (!neededChunks.has(key)) {
        const chunk = this.loadedChunks.get(key);
        if (chunk) {
          scene.remove(chunk.mesh);
          chunk.dispose();
        };
        this.loadedChunks.delete(key);
      };
    };
  };

  public update(scene: THREE.Scene, playerWorldPos: THREE.Vector3, mouseWorldPos: THREE.Vector3, elapsedTime: number): void {
    this.getCurrentGridFromWorld(playerWorldPos);
    this.updateChunks(scene);
    this.loadedChunks.forEach(chunk => {
      chunk.update(elapsedTime, mouseWorldPos);
    });
  };
};