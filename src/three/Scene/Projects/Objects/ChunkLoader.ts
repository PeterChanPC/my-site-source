import { THREE, MonoBehavior } from "@/three/d";
import { projectCamera, Grid, Text } from "../d";

export class ChunkLoader implements MonoBehavior {
  private size: number = 8;
  private renderDist: number = 3;
  private loadedChunks: Map<string, Grid> = new Map();
  private loadedTexts: Map<string, Text> = new Map();
  private center: THREE.Vector2 = new THREE.Vector2(0, 0);
  private geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 3);
  private material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.1,
  });

  private getCurrentGridFromWorld(): void {
    this.center.set(
      Math.floor(projectCamera.camera.position.x / this.size), // x
      Math.floor(projectCamera.camera.position.y / this.size) // y
    );
  };

  private updateChunks(): void {
    const neededChunks = new Set();

    for (let i = -this.renderDist; i <= this.renderDist; i++) {
      for (let j = -this.renderDist; j <= this.renderDist; j++) {
        const x = this.center.x + i;
        const y = this.center.y + j;
        const key = `${x},${y}`;
        neededChunks.add(key);

        if (!this.loadedChunks.has(key)) {
          const chunkX = x * this.size;
          const chunkY = y * this.size;
          const textX = chunkX + (Math.random() - Math.random()) * this.size;
          const textY = chunkY + (Math.random() - Math.random()) * this.size;

          const chunk = new Grid(this.geometry, this.material, this.size);
          chunk.setPos(chunkX, chunkY, 0);
          chunk.start();
          this.loadedChunks.set(key, chunk);

          const text = new Text();
          text.setPos(textX, textY, 7);
          text.start();
          this.loadedTexts.set(key, text);
        };
      };
    };

    for (const key of this.loadedChunks.keys()) {
      if (!neededChunks.has(key)) {
        const chunk = this.loadedChunks.get(key);
        const text = this.loadedTexts.get(key);
        if (chunk) {
          chunk.end();
        };
        if (text) {
          text.end();
        };
        this.loadedChunks.delete(key);
        this.loadedTexts.delete(key);
      };
    };
  };

  public start(): void {
    this.updateChunks();
  };

  public update(): void {
    this.getCurrentGridFromWorld();
    this.updateChunks();
    this.loadedChunks.forEach(chunk => chunk.update());
    this.loadedTexts.forEach(text => text.update());
  };

  public end(): void {
    this.loadedChunks.forEach(chunk => chunk.end());
    this.loadedTexts.forEach(text => text.end());
    this.geometry.dispose();
    this.material.dispose();
  };
};
