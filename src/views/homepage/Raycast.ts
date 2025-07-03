import * as THREE from 'three';

export default class Raycast {
  raycaster: THREE.Raycaster;

  constructor() {
    this.raycaster = new THREE.Raycaster();
  }

  raycast(collidables: THREE.Object3D[], origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number): THREE.Intersection[] {
    this.raycaster.set(origin, direction);
    this.raycaster.far = maxDistance;
    return this.raycaster.intersectObjects(collidables);
  }

  screenPointToWorld(x: number, y: number, camera: THREE.Camera, collidables: THREE.Object3D) {
    let screenPosX = (x / window.innerWidth) * 2 - 1;
    let screenPosY = (y / window.innerHeight) * 2 - 1;
    let screenPos = new THREE.Vector2(screenPosX, screenPosY);
    this.raycaster.setFromCamera(screenPos, camera);
    let hit = this.raycaster.intersectObject(collidables)[0];
    return new THREE.Vector3(hit.point.x, hit.point.y, -hit.point.z);
  }
}