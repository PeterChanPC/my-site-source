import * as THREE from 'three';

export default class Raycast {
  raycaster: THREE.Raycaster = new THREE.Raycaster();

  raycast(collidables: THREE.Object3D[], origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number): THREE.Intersection[] {
    let collisions: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    this.raycaster.set(origin, direction);
    this.raycaster.far = maxDistance;
    collisions = this.raycaster.intersectObjects(collidables);

    const axis = new THREE.Vector3(0, 1, 0);
    const angle = Math.PI / 2;
    
    const p1 = origin.clone().add(direction.clone().applyAxisAngle(axis, angle).normalize());
    this.raycaster.set(p1, direction);
    this.raycaster.intersectObjects(collidables).forEach(objR => {
      collisions.filter(objC => {
        objC.object !== objR.object
      }).push(objR);
    });

    const p2 = origin.clone().add(direction.clone().applyAxisAngle(axis, -angle).normalize());
    this.raycaster.set(p2, direction);
    this.raycaster.intersectObjects(collidables).forEach(objR => {
      collisions.filter(objC => {
        objC.object !== objR.object
      }).push(objR);
    });
    return collisions;
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