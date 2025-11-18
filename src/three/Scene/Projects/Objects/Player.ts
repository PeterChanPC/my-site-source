import { THREE, MonoBehavior, gameInput, physics } from "@/three/d";
import { projectScene, projectCamera } from "../d";

export class Player implements MonoBehavior {
  private player: THREE.PointLight = new THREE.PointLight(0xffffff);
  private wallGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 100);
  private wallMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private wall: THREE.Mesh = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
  private mouseWorldPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  private updateMouseWorldPos() {
    const mousePos = gameInput.mousePos;
    const mouseWorldPos = physics.screenPointToWorld(projectCamera.camera, mousePos.x, mousePos.y);
    if (mouseWorldPos) this.mouseWorldPos = mouseWorldPos;
  };

  private applyMovement() {
    this.updateMouseWorldPos();
    this.player.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 10);
    this.wall.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 5);
  };

  public start(): void {
    this.player.intensity = 50;

    projectScene.add(this.player, this.wall);
  };

  public update(): void {
    this.applyMovement();
  };

  public end(): void {
    this.player.dispose();
    this.wallGeometry.dispose();
    this.wallMaterial.dispose();
  };

  public get obj(): THREE.Mesh {
    return this.wall;
  };
};
