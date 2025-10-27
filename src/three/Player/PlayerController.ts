import { THREE, Physics, GameInput } from "../three";

export class PlayerController {
  private moveVec: THREE.Vector2 = new THREE.Vector2(0, 0);
  private displacement: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityX: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityZ: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private forceCoe: number = 30;
  private dragCoe: number = 3;
  private player: THREE.Object3D;
  private gameInput: GameInput;
  private physics: Physics;

  constructor(player: THREE.Object3D, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.gameInput = gameInput;
    this.physics = physics;
  };

  private updateMoveVec = (): void => {
    if (this.gameInput.getIsKeyboard) {
      this.moveVec = this.gameInput.getMovementVectorNormalized;
    } else if (this.gameInput.getIsMouse) {
      const mousePos = this.gameInput.getMousePos;
      const mouseWorldPos = this.physics.screenPointToWorld(mousePos.x, mousePos.y);
      const moveDir = mouseWorldPos?.sub(this.player.position).normalize();
      if (moveDir) this.moveVec.set(moveDir.x, moveDir.z);
    } else {
      this.moveVec.set(0, 0);
    };
  };

  private updateForce = (strength: number): void => {
    this.force.set(this.moveVec.x, 0, this.moveVec.y).multiplyScalar(strength);
    this.force.z *= 2; // vertical compensation for user experience
  };

  private updateDrag = (strength: number): void => {
    this.drag.copy(this.velocity).multiplyScalar(strength);
  };

  private updateVelocity = (dt: number): void => {
    let dv = this.force.sub(this.drag).multiplyScalar(dt);
    // remove fluctuation due to decimal places
    if (this.velocity.length() < 0.5 && this.force.length() === 0) {
      this.velocity.set(0, 0, 0);
      dv.set(0, 0, 0);
    };
    this.velocity.add(dv);
  };

  private checkCollision = (): void => {
    let canMove = this.physics.Linecast(this.player.position, this.velocity, 1, 1, 1) && this.physics.Linecast(this.player.position, this.force, 1, 1, 1); // check move direction

    if (!canMove) { // if move direction is blocked
      this.velocityX.setX(this.velocity.x);
      this.velocityZ.setZ(this.velocity.z);
      canMove = this.physics.Linecast(this.player.position, this.velocityX, 1, 1, 1); // check X
      if (canMove) { // if X can move
        canMove = this.physics.Linecast(this.player.position, this.velocityZ, 1, 1, 1); // check Z
        if (canMove) { // if Z can also move
          this.velocity.set(this.velocityX.x, 0, this.velocityZ.z); // move along X and Z
        } else { // if Z cannot move
          this.velocity.set(this.velocityX.x, 0, -this.velocityZ.z); // move along X and bounce back along Z
        };
      } else { // if X cannot move
        canMove = this.physics.Linecast(this.player.position, this.velocityZ, 1, 1, 1); // check Z
        if (canMove) { // if Z can move
          this.velocity.set(-this.velocityX.x, 0, this.velocityZ.z); // move along Z and bounce back along X
        } else { // if both X and Z cannot move
          this.velocity.multiplyScalar(0); // do not move at all
        };
      };
    };
  };

  public applyMovement = (dt: number): void => {
    this.updateMoveVec();
    this.updateForce(this.forceCoe);
    this.updateDrag(this.dragCoe);
    this.updateVelocity(dt);
    this.checkCollision();
    this.displacement.copy(this.velocity).multiplyScalar(dt)
    this.player.position.add(this.displacement);
  };

  get getForce(): THREE.Vector3 {
    return this.force;
  };

  get getDrag(): THREE.Vector3 {
    return this.drag;
  };

  get getVelocity(): THREE.Vector3 {
    return this.velocity;
  };
};
