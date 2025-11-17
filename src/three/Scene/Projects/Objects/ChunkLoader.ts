import { THREE, Grid } from "../../../d";

export class ChunkLoader {
  private readonly _size: number;
  private readonly _renderDist: number;
  private loadedChunks: Map<string, Grid> = new Map();
  private center: THREE.Vector2 = new THREE.Vector2(0, 0);
  private geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 3);
  private material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  private color: THREE.Color = new THREE.Color(0x777777);
  private overlays: string[] = ['home', 'work', 'test'];
  public targetOverlay?: string;

  constructor(size: number, _renderDist: number) {
    this._size = size;
    this._renderDist = _renderDist;
  };

  private generateRandomTargetOverlay(length: number = 1) {
    const targetOverlays = [];
    for (let i = 0; i < length; i++) {
      const randInt = Math.floor(Math.random() * this.overlays.length);
      targetOverlays.push(this.overlays[randInt]);
    };
    return targetOverlays;
  };

  private getCurrentGridFromWorld(playerWorldPos: THREE.Vector3): void {
    this.center.set(
      Math.floor(playerWorldPos.x / this._size), // x
      Math.floor(playerWorldPos.y / this._size) // y
    );
  };

  private updateChunks(scene: THREE.Scene): void {
    const neededChunks = new Set();

    for (let i = -this._renderDist; i <= this._renderDist; i++) {
      for (let j = -this._renderDist; j <= this._renderDist; j++) {
        const x = this.center.x + i;
        const y = this.center.y + j;
        const key = `${x},${y}`;
        neededChunks.add(key);
        if (!this.loadedChunks.has(key)) {
          const chunk = new Grid(this.geometry, this.material, this.color, this.generateRandomTargetOverlay(5), this._size);
          const chunkX = x * this._size * 1.02;
          const chunkY = y * this._size * 1.02;
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
        };
        this.loadedChunks.delete(key);
      };
    };
  };

  public update(scene: THREE.Scene, playerWorldPos: THREE.Vector3, mouseWorldPos: THREE.Vector3, elapsedTime: number): void {
    this.getCurrentGridFromWorld(playerWorldPos);
    this.updateChunks(scene);
    let foundOverlay = undefined;
    this.loadedChunks.forEach(chunk => {
      chunk.update(elapsedTime, mouseWorldPos);
      const temp = chunk.getTargetOverlay();
      if (temp) foundOverlay = temp;
    });
    this.targetOverlay = foundOverlay;
  };
};