import { THREE, Physics, GameInput } from "../three";

export class Player {
  private readonly VELOCITY_THRESHOLD: number = 0.5;
  private readonly FORCE_THRESHOLD: number = 100;
  private readonly BOUNCINESS: number = 1;
  private readonly FORCE_COE: number = 30;
  private readonly DRAG_COE: number = 3;
  private readonly gameInput: GameInput;
  private readonly physics: Physics;
  private moveVec: THREE.Vector2 = new THREE.Vector2(0, 0);
  private displacement: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityX: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityZ: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private playerRadius: number = 1;
  private player: THREE.Object3D;

  constructor(player: THREE.Object3D, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.gameInput = gameInput;
    this.physics = physics;
  };

  private updateMoveVec(): void {
    if (this.gameInput.isKeyboard) {
      this.moveVec = this.gameInput.getMovementVectorNormalized();
    } else if (this.gameInput.isMouse) {
      const mousePos = this.gameInput.mousePos;
      const mouseWorldPos = this.physics.screenPointToWorld(mousePos.x, mousePos.y);
      if (mouseWorldPos) {
        const moveDir = mouseWorldPos.sub(this.player.position).normalize();
        if (moveDir) this.moveVec.set(moveDir.x, moveDir.z);
      };
    } else {
      this.moveVec.set(0, 0);
    };
  };

  private updateForce(strength: number): void {
    if (strength > this.FORCE_THRESHOLD) throw new Error('Large force may result in object tunneling in this physics engine');
    this._force.set(this.moveVec.x, 0, this.moveVec.y).multiplyScalar(strength);
    this._force.z *= 2; // forward/backward compensation for user experience
  };

  private updateDrag(strength: number): void {
    if (strength > this.FORCE_THRESHOLD) throw new Error('Large force may result in object tunneling in this physics engine');
    this._drag.copy(this._velocity).multiplyScalar(-strength);
  };

  private updateVelocity(dt: number): void {
    let dv = this._force.add(this._drag).multiplyScalar(dt);
    // remove fluctuation due to decimal places
    if (this._velocity.length() < this.VELOCITY_THRESHOLD && this._force.length() === 0) {
      this._velocity.set(0, 0, 0);
      dv.set(0, 0, 0);
    };
    this._velocity.add(dv);
  };

  private safeLinecast(origin: THREE.Vector3, dir: THREE.Vector3): boolean {
    return this.physics.linecast(origin, dir, this.playerRadius, this.playerRadius, this.playerRadius);
  };

  private checkCollision(): void {
    let canMove = this.safeLinecast(this.player.position, this._velocity) && this.safeLinecast(this.player.position, this._force); // check move direction

    if (!canMove) { // if move direction is blocked
      this.velocityX.set(this._velocity.x, 0, 0);
      this.velocityZ.set(0, 0, this._velocity.z);
      canMove = this.safeLinecast(this.player.position, this.velocityX); // check X
      if (canMove) { // if X can move
        canMove = this.safeLinecast(this.player.position, this.velocityZ); // check Z
        if (canMove) { // if Z can also move
          this._velocity.set(this.velocityX.x, 0, this.velocityZ.z); // move along X and Z
        } else { // if Z cannot move
          this._velocity.set(this.velocityX.x, 0, -this.velocityZ.z * this.BOUNCINESS); // move along X and bounce back along Z
        };
      } else { // if X cannot move
        canMove = this.safeLinecast(this.player.position, this.velocityZ); // check Z
        if (canMove) { // if Z can move
          this._velocity.set(-this.velocityX.x * this.BOUNCINESS, 0, this.velocityZ.z); // move along Z and bounce back along X
        } else { // if both X and Z cannot move
          this._velocity.set(0, 0, 0); // do not move at all
        };
      };
    };
  };

  public applyMovement(dt: number): void {
    this.updateMoveVec();
    this.updateForce(this.FORCE_COE);
    this.updateDrag(this.DRAG_COE);
    this.updateVelocity(dt);
    this.checkCollision();
    this.displacement.copy(this._velocity).multiplyScalar(dt)
    this.player.position.add(this.displacement);
  };

  public get force(): THREE.Vector3 {
    return this._force;
  };

  public get drag(): THREE.Vector3 {
    return this._drag;
  };

  public get velocity(): THREE.Vector3 {
    return this._velocity;
  };
};
