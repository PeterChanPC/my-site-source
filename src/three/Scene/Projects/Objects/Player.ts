import { THREE, MonoBehavior, gameInput, physics } from "@/three/d";
import { projectScene, projectCamera } from "../d";

export class Player implements MonoBehavior {
  // player
  private player: THREE.PointLight = new THREE.PointLight(0xffffff);
  private geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 100);
  private material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private intersectPlane: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private mouseWorldPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  // navigation
  private target: string | undefined = undefined;
  private scale: THREE.Vector3 = new THREE.Vector3(1.2, 1.2, 1);
  private isListenerAdded: boolean = false;

  private updateMouseWorldPos(): void {
    const mousePos = gameInput.mousePos;
    const mouseWorldPos = physics.screenPointToWorld(projectCamera.camera, mousePos.x, mousePos.y);
    if (mouseWorldPos) this.mouseWorldPos = mouseWorldPos;
  };

  private applyMovement(): void {
    this.updateMouseWorldPos();
    this.player.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 10);
    this.intersectPlane.position.set(this.mouseWorldPos.x, this.mouseWorldPos.y, 5);
  };

  private hover(): void {
    document.body.style.cursor = 'auto';
    const mousePos = gameInput.mousePos;
    const targetLayer = 1;
    const alpha = 0.1;
    const hits = physics.getRaycastHitFromScreen(projectCamera.camera, mousePos.x, mousePos.y, projectScene.children, targetLayer);
    this.target = undefined;

    if (!hits || !hits[0]) return;
    document.body.style.cursor = 'pointer';
    hits[0]?.object.children.forEach(child => child.scale.lerp(this.scale, alpha));
    this.target = hits?.at(0)?.object.name;
  };

  private click = (): void => {
    if (!this.target) return;
    window.open(`/my-site${this.target}`, '_blank');
  };

  public start(): void {
    this.player.intensity = 50;
    this.player.castShadow = true;
    this.player.shadow.intensity = 0.5;
    this.player.shadow.normalBias = 0.3;
    this.player.shadow.radius = 2;

    projectScene.add(this.player, this.intersectPlane);

    if (this.isListenerAdded) return;
    window.addEventListener('click', this.click);
    window.addEventListener('touchend', this.click);
    this.isListenerAdded = true;
  };

  public update(): void {
    this.applyMovement();
    this.hover();
  };

  public end(): void {
    projectScene.remove(this.player, this.intersectPlane);
    this.player.dispose();
    this.geometry.dispose();
    this.material.dispose();

    window.addEventListener('click', this.click);
    window.removeEventListener('touchend', this.click);
    this.isListenerAdded = false;
  };
};
