import * as THREE from 'three';

export default class Physics {
  private raycaster: THREE.Raycaster;
  private cameraRaycaster: THREE.Raycaster;
  private collidables: THREE.Object3D[];
  private camera?: THREE.Camera;
  private screenPos: THREE.Vector2;
  private worldPoint: THREE.Vector3;

  private axis: THREE.Vector3;
  private angle: number;
  private p1: THREE.Vector3;
  private p2: THREE.Vector3;
  private dir: THREE.Vector3;

  constructor(collidables: THREE.Object3D[], camera: THREE.Camera) {
    this.raycaster = new THREE.Raycaster();
    this.cameraRaycaster = new THREE.Raycaster();
    this.collidables = collidables;
    this.camera = camera;
    this.screenPos = new THREE.Vector2(0, 0);
    this.worldPoint = new THREE.Vector3(0, 0, 0);
    this.axis = new THREE.Vector3(0, 1, 0);
    this.angle = Math.PI / 2;
    this.p1 = new THREE.Vector3(0, 0, 0);
    this.p2 = new THREE.Vector3(0, 0, 0);
    this.dir = new THREE.Vector3(0, 0, 0);
  };

  // casting a ray from a Origin with Direction and Max Distance
  public raycast = (origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number): THREE.Intersection[] => {
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
  public lineCast = (origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number = 1, leftWidth: number = 1, rightWidth: number = 1): THREE.Intersection[] => {
    let collisions: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    collisions = this.raycast(origin, direction, maxDistance);

    this.p1.copy(origin).add(this.dir.copy(direction).applyAxisAngle(this.axis, this.angle).normalize().multiplyScalar(leftWidth));
    this.p2.copy(origin).add(this.dir.copy(direction).applyAxisAngle(this.axis, -this.angle).normalize().multiplyScalar(rightWidth));

    this.raycast(this.p1, direction, maxDistance).forEach(obj => {
      collisions.indexOf(obj) === -1 ? collisions.push(obj) : {};
    });
    this.raycast(this.p2, direction, maxDistance).forEach(obj => {
      collisions.indexOf(obj) === -1 ? collisions.push(obj) : {};
    });

    return collisions;
  };

  // project mouse position to world position
  public screenPointToWorld = (x: number, y: number): THREE.Vector3 | undefined => {
    if (!this.camera) return;

    let screenPosX = (x / window.innerWidth) * 2 - 1;
    let screenPosY = (y / window.innerHeight) * 2 - 1;
    this.screenPos.set(screenPosX, screenPosY);

    this.cameraRaycaster.setFromCamera(this.screenPos, this.camera);
    this.cameraRaycaster.far = 100;
    const hit = this.cameraRaycaster.intersectObjects(this.collidables)[0];

    if (!hit) return;
    this.worldPoint.set(hit.point.x, hit.point.y, -hit.point.z);

    return this.worldPoint;
  };
};