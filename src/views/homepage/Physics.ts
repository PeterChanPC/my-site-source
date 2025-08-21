import * as THREE from 'three';

export default class Raycast {
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private collidables: THREE.Object3D[];

  constructor(collidables: THREE.Object3D[]) {
    this.collidables = collidables;
  }

  // casting a ray from a Origin with Direction and Max Distance
  public raycast(origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number): THREE.Intersection[] {
    let collisions: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    this.raycaster.ray.origin = origin;
    this.raycaster.ray.direction = direction;
    this.raycaster.far = maxDistance;
    collisions = this.raycaster.intersectObjects(this.collidables);
    return collisions;
  };

  // casting a ray from origin
  // then cast 2 more rays parallel to the 1st ray
  // with left/right Width away and Max Distance
  public lineCast(origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number = 1, leftWidth: number = 1, rightWidth: number = 1): THREE.Intersection[] {
    let collisions: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    collisions = this.raycast(origin, direction, maxDistance);

    const axis = new THREE.Vector3(0, 1, 0);
    const angle = Math.PI / 2;
    const p1 = origin.clone().add(direction.clone().applyAxisAngle(axis, angle).normalize().multiplyScalar(leftWidth));
    const p2 = origin.clone().add(direction.clone().applyAxisAngle(axis, -angle).normalize().multiplyScalar(rightWidth));

    this.raycast(p1, direction, maxDistance).forEach(obj => {
      collisions.indexOf(obj) === -1 ? collisions.push(obj) : {};
    });
    this.raycast(p2, direction, maxDistance).forEach(obj => {
      collisions.indexOf(obj) === -1 ? collisions.push(obj) : {};
    });

    return collisions;
  }

  // project mouse position to world position
  public screenPointToWorld(x: number, y: number, camera: THREE.Camera, collidables: THREE.Object3D) {
    let screenPosX = (x / window.innerWidth) * 2 - 1;
    let screenPosY = (y / window.innerHeight) * 2 - 1;
    let screenPos = new THREE.Vector2(screenPosX, screenPosY);
    this.raycaster.setFromCamera(screenPos, camera);
    let hit = this.raycaster.intersectObject(collidables)[0];
    return new THREE.Vector3(hit.point.x, hit.point.y, -hit.point.z);
  }
}