import { THREE } from "./d";

export class Physics {
  // general
  private collidables: THREE.Object3D[] = [];
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private cameraRaycaster: THREE.Raycaster = new THREE.Raycaster();
  // screenPointToWorld variables
  private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
  private screenWorldPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  // linecast variables
  private angle: number = Math.PI / 2;
  private axis: THREE.Vector3 = new THREE.Vector3(0, 1, 0);
  private temp: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private dir: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  public setCollidables(collidables: THREE.Object3D[]) {
    this.collidables = collidables;
  };

  // casting a ray from a Origin with Direction and Max Distance
  public getRaycastHit(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    far: number = 50,
    collidables: THREE.Object3D[] = this.collidables,
    layer: number = 0
  ): THREE.Intersection[] {
    this.raycaster.ray.origin = origin;
    this.raycaster.ray.direction = dir;
    this.raycaster.far = far;
    this.raycaster.layers.set(layer);
    const hit = this.raycaster.intersectObjects(collidables);
    return hit;
  };

  // casting a ray from origin
  // then cast 2 more rays parallel to the 1st ray
  // with left/right Width away and Max Distance
  public getLinecastHit(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    far: number = 1,
    width: number = 0,
    collidables: THREE.Object3D[] = this.collidables,
    layer: number = 0
  ): THREE.Intersection[] {
    const hit = this.getRaycastHit(origin, dir, far, collidables, layer);
    // left
    this.temp.copy(origin).add(this.dir.copy(dir).applyAxisAngle(this.axis, this.angle).normalize().multiplyScalar(width));
    this.getRaycastHit(this.temp, dir, far, collidables, layer).forEach(obj => {
      hit.indexOf(obj) === -1 ? hit.push(obj) : {};
    });
    // right
    this.temp.copy(origin).add(this.dir.copy(dir).applyAxisAngle(this.axis, -this.angle).normalize().multiplyScalar(width));
    this.getRaycastHit(this.temp, dir, far, collidables, layer).forEach(obj => {
      hit.indexOf(obj) === -1 ? hit.push(obj) : {};
    });
    return hit;
  };

  public raycast(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    far: number,
    collidables: THREE.Object3D[] = this.collidables,
    layer: number = 0
  ): boolean {
    const hit = this.getRaycastHit(origin, dir, far, collidables, layer);
    return hit.length === 0;
  };

  public linecast(origin: THREE.Vector3, dir: THREE.Vector3, far: number, width: number, collidables: THREE.Object3D[] = this.collidables, layer: number = 0): boolean {
    const hit = this.getLinecastHit(origin, dir, far, width, collidables, layer);
    return hit.length === 0;
  };

  // project mouse position to world position
  public getRaycastHitFromScreen = (
    camera: THREE.Camera,
    x: number,
    y: number,
    collidables: THREE.Object3D[] = this.collidables,
    layer: number = 0
  ): THREE.Intersection[] | undefined => {
    const screenPosX = (x / window.innerWidth) * 2 - 1;
    const screenPosY = -(y / window.innerHeight) * 2 + 1;
    this.cameraRaycaster.layers.set(layer);
    camera.layers.set(layer);
    this.screenPoint.set(screenPosX, screenPosY);
    this.cameraRaycaster.setFromCamera(this.screenPoint, camera);
    const hit = this.cameraRaycaster.intersectObjects(collidables);
    return hit;
  };

  public screenPointToWorld = (
    camera: THREE.Camera,
    x: number,
    y: number,
    collidables: THREE.Object3D[] = this.collidables,
    layer: number = 0
  ): THREE.Vector3 | undefined => {
    const hits = this.getRaycastHitFromScreen(camera, x, y, collidables, layer);
    if (!hits || !hits[0]) return undefined;
    this.screenWorldPos.set(hits[0].point.x, hits[0].point.y, hits[0].point.z);
    return this.screenWorldPos;
  };
};
