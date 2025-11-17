import { THREE, MonoBehavior } from "@/three/d";

export class Walls implements MonoBehavior {
  private wallMaterial_1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
  private wallMaterial_2 = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
  private floorMaterial = this.wallMaterial_1;
  private wallGeometry = new THREE.PlaneGeometry(20, 20);
  private floorGeometry = new THREE.PlaneGeometry(20, 100);

  private wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_1);
  private wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);

  public start(scene: THREE.Scene): void {
    this.wall_1.position.set(0, 0, -10);
    this.wall_2.position.set(-5, 0, 0);
    this.wall_2.rotation.set(0, Math.PI / 2, 0);
    this.wall_3.position.set(5, 0, 0);
    this.wall_3.rotation.set(0, -Math.PI / 2, 0);
    this.wall_4.position.set(0, 0, 10);
    this.wall_4.rotation.set(0, Math.PI, 0);
    this.floor.position.set(0, -1, 0);
    this.floor.rotation.set(-Math.PI / 2, 0, 0);

    this.wall_1.receiveShadow = true;
    this.floor.receiveShadow = true;

    scene.add(this.wall_1, this.wall_2, this.wall_3, this.wall_4, this.floor);
  };

  public update(): void {

  };

  public end(): void {
    this.wallMaterial_1.dispose();
    this.wallMaterial_2.dispose();
    this.floorMaterial.dispose();
    this.wallGeometry.dispose();
    this.floorGeometry.dispose();
  };
};