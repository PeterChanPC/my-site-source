import { THREE, MonoBehavior, gameInput, physics } from "@/three/d";
import { projectScene, projectCamera } from "../d";

export class Player implements MonoBehavior {
  private player: THREE.PointLight = new THREE.PointLight(0xffffff);
  private geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 100);
  private material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private intersectPlane: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private mouseWorldPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  private updateMouseWorldPos() {
    const mousePos = gameInput.mousePos;
    const mouseWorldPos = physics.screenPointToWorld(projectCamera.camera, mousePos.x, mousePos.y);
    if (mouseWorldPos) this.mouseWorldPos = mouseWorldPos;
  };

  private applyMovement() {
    this.updateMouseWorldPos();
    this.player.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 10);
    this.intersectPlane.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 5);
  };

  public start(): void {
    this.player.intensity = 50;
    this.player.castShadow = true;
    this.player.shadow.camera.far = 10;
    this.player.shadow.intensity = 0.5;
    this.player.shadow.normalBias = 0.3;
    this.player.shadow.radius = 2;

    projectScene.add(this.player, this.intersectPlane);
  };

  public update(): void {
    this.applyMovement();
  };

  public end(): void {
    this.player.dispose();
    this.geometry.dispose();
    this.material.dispose();
  };

  public get obj(): THREE.Mesh {
    return this.intersectPlane;
  };
};
