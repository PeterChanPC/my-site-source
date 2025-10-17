import * as THREE from 'three';

export default class Physics {
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private collidables: THREE.Object3D[] = [];

  private camera?: THREE.Camera;
  private cameraRaycaster?: THREE.Raycaster;
  private screenPos?: THREE.Vector2;
  private worldPoint?: THREE.Vector3;

  private angle: number = Math.PI / 2;
  private axis: THREE.Vector3 = new THREE.Vector3(0, 1, 0);
  private temp: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private dir: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  constructor(camera?: THREE.Camera) {
    if (camera) {
      this.camera = camera;
      this.cameraRaycaster = new THREE.Raycaster();
      this.screenPos = new THREE.Vector2(0, 0);
      this.worldPoint = new THREE.Vector3(0, 0, 0);
    };
  };

  public setCollidables(collidables: THREE.Object3D[]) {
    this.collidables = collidables;
  };

  // casting a ray from a Origin with Direction and Max Distance
  public getRaycastHit = (
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    maxDistance: number
  ): THREE.Intersection[] => {
    this.raycaster.ray.origin = origin;
    this.raycaster.ray.direction = direction;
    this.raycaster.far = maxDistance;
    const hit = this.raycaster.intersectObjects(this.collidables);
    return hit;
  };

  // casting a ray from origin
  // then cast 2 more rays parallel to the 1st ray
  // with left/right Width away and Max Distance
  public getLinecastHit = (
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    maxDistance: number = 1,
    leftWidth: number = 0,
    rightWidth: number = 0
  ): THREE.Intersection[] => {
    const hit = this.getRaycastHit(origin, direction, maxDistance);

    this.temp.copy(origin).add(this.dir.copy(direction).applyAxisAngle(this.axis, this.angle).normalize().multiplyScalar(leftWidth));
    this.getRaycastHit(this.temp, direction, maxDistance).forEach(obj => {
      hit.indexOf(obj) === -1 ? hit.push(obj) : {};
    });
    this.temp.copy(origin).add(this.dir.copy(direction).applyAxisAngle(this.axis, -this.angle).normalize().multiplyScalar(rightWidth));
    this.getRaycastHit(this.temp, direction, maxDistance).forEach(obj => {
      hit.indexOf(obj) === -1 ? hit.push(obj) : {};
    });

    return hit;
  };

  public raycast = (
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    maxDistance: number
  ): boolean => {
    const hit = this.getRaycastHit(origin, direction, maxDistance);
    return hit.length === 0;
  };

  public Linecast = (
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    maxDistance: number,
    leftWidth: number,
    rightWidth: number
  ): boolean => {
    const hit = this.getLinecastHit(origin, direction, maxDistance, leftWidth, rightWidth);
    return hit.length === 0;
  };

  // project mouse position to world position
  public getRaycastHitFromScreen = (x: number, y: number): THREE.Intersection[] | undefined => {
    if (!this.cameraRaycaster || !this.camera || !this.screenPos) return;

    let screenPosX = (x / window.innerWidth) * 2 - 1;
    let screenPosY = (y / window.innerHeight) * 2 - 1;
    this.screenPos.set(screenPosX, screenPosY);

    this.cameraRaycaster.setFromCamera(this.screenPos, this.camera);
    this.cameraRaycaster.far = 100;
    const hit = this.cameraRaycaster.intersectObjects(this.collidables);
    return hit;
  };

  public screenPointToWorld = (x: number, y: number): THREE.Vector3 | undefined => {
    const hit = this.getRaycastHitFromScreen(x, y);
    if (!hit || !this.worldPoint) return;
    this.worldPoint.set(hit[0].point.x, hit[0].point.y, -hit[0].point.z);

    return this.worldPoint;
  };
};