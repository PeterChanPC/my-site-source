import { THREE, Physics, GameInput } from "../three";

export class Player {
  private static readonly FORCE_COE: number = 30;
  private static readonly DRAG_COE: number = 3;
  private static readonly VELOCITY_THRESHOLD: number = 0.5;
  private moveVec: THREE.Vector2 = new THREE.Vector2(0, 0);
  private displacement: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityX: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityZ: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private readonly player: THREE.Object3D;
  private readonly gameInput: GameInput;
  private readonly physics: Physics;

  constructor(player: THREE.Object3D, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.gameInput = gameInput;
    this.physics = physics;
  };

  private updateMoveVec = (): void => {
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

  private updateForce = (strength: number): void => {
    this._force.set(this.moveVec.x, 0, this.moveVec.y).multiplyScalar(strength);
    this._force.z *= 2; // forward/backward compensation for user experience
  };

  private updateDrag = (strength: number): void => {
    this._drag.copy(this._velocity).multiplyScalar(-strength);
  };

  private updateVelocity = (dt: number): void => {
    let dv = this._force.add(this._drag).multiplyScalar(dt);
    // remove fluctuation due to decimal places
    if (this._velocity.length() < Player.VELOCITY_THRESHOLD && this._force.length() === 0) {
      this._velocity.set(0, 0, 0);
      dv.set(0, 0, 0);
    };
    this._velocity.add(dv);
  };

  private checkCollision = (): void => {
    let canMove = this.physics.Linecast(this.player.position, this._velocity, 1, 1, 1) && this.physics.Linecast(this.player.position, this._force, 1, 1, 1); // check move direction

    if (!canMove) { // if move direction is blocked
      this.velocityX.set(this._velocity.x, 0, 0);
      this.velocityZ.set(0, 0, this._velocity.z);
      canMove = this.physics.Linecast(this.player.position, this.velocityX, 1, 1, 1); // check X
      if (canMove) { // if X can move
        canMove = this.physics.Linecast(this.player.position, this.velocityZ, 1, 1, 1); // check Z
        if (canMove) { // if Z can also move
          this._velocity.set(this.velocityX.x, 0, this.velocityZ.z); // move along X and Z
        } else { // if Z cannot move
          this._velocity.set(this.velocityX.x, 0, -this.velocityZ.z); // move along X and bounce back along Z
        };
      } else { // if X cannot move
        canMove = this.physics.Linecast(this.player.position, this.velocityZ, 1, 1, 1); // check Z
        if (canMove) { // if Z can move
          this._velocity.set(-this.velocityX.x, 0, this.velocityZ.z); // move along Z and bounce back along X
        } else { // if both X and Z cannot move
          this._velocity.multiplyScalar(0); // do not move at all
        };
      };
    };
  };

  public applyMovement = (dt: number): void => {
    this.updateMoveVec();
    this.updateForce(Player.FORCE_COE);
    this.updateDrag(Player.DRAG_COE);
    this.updateVelocity(dt);
    this.checkCollision();
    this.displacement.copy(this._velocity).multiplyScalar(dt)
    this.player.position.add(this.displacement);
  };

  public get force(): THREE.Vector3 {
    return this._force;
  };

  public get getDrag(): THREE.Vector3 {
    return this._drag;
  };

  public get velocity(): THREE.Vector3 {
    return this._velocity;
  };
};
