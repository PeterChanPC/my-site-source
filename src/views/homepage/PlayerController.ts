import * as THREE from 'three';
import GameInput from './GameInput';
import Physics from './Physics';

export default class PlayerController {
  private player: THREE.Object3D;
  private force: THREE.Vector3;
  private drag: THREE.Vector3;
  private velocity: THREE.Vector3;
  private velocityX: THREE.Vector3;
  private velocityZ: THREE.Vector3;
  private displacement: THREE.Vector3;
  private clock: THREE.Clock;
  private gameInput: GameInput;
  private physics: Physics;

  constructor(player: THREE.Object3D, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.force = new THREE.Vector3(0, 0, 0);
    this.drag = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.velocityX = new THREE.Vector3(0, 0, 0);
    this.velocityZ = new THREE.Vector3(0, 0, 0);
    this.displacement = new THREE.Vector3(0, 0, 0);
    this.clock = new THREE.Clock();
    this.gameInput = gameInput;
    this.physics = physics;
  };

  private updateForce(strength: number) {
    let moveVec = this.gameInput.getMovementVectorNormalized;
    this.force.set(moveVec.x, 0, moveVec.y).multiplyScalar(strength);
    this.force.z *= 2; // vertical compensation for user experience
  };

  private updateDrag(strength: number) {
    this.drag.copy(this.velocity).multiplyScalar(strength);
  };

  private updateVelocity(dt: number) {
    let dv = this.force.sub(this.drag).multiplyScalar(dt);
    // remove fluctuation due to decimal places
    if (this.velocity.length() < 0.5 && this.force.length() === 0) {
      this.velocity.multiplyScalar(0);
      dv.multiplyScalar(0)
    };
    this.velocity.add(dv);
  };

  public applyMovement() {
    let dt = this.clock.getDelta();
    this.gameInput.handleMovementVector(this.player.position);
    this.updateForce(30);
    this.updateDrag(3);
    this.updateVelocity(dt);

    // detect collision
    let canMove = this.physics.lineCast(this.player.position, this.velocity, 1).length === 0 && this.physics.lineCast(this.player.position, this.force, 1).length === 0; // check move direction

    if (!canMove) { // if move direction is blocked
      this.velocityX.setX(this.velocity.x);
      this.velocityZ.setZ(this.velocity.z);
      canMove = this.physics.lineCast(this.player.position, this.velocityX, 1).length === 0; // check X
      if (canMove) { // if X can move
        canMove = this.physics.lineCast(this.player.position, this.velocityZ, 1).length === 0; // check Z
        if (canMove) { // if X can move and Z can move
          this.velocity.set(this.velocityX.x, 0, this.velocityZ.z);
        } else { // if X can move and Z cannot move
          // move along X and bounce back along Z
          this.velocity.set(this.velocityX.x, 0, -this.velocityZ.z);
        }
      } else { // if X cannot move
        canMove = this.physics.lineCast(this.player.position, this.velocityZ, 1).length === 0; // check Z
        if (canMove) { // if X cannot move and Z can move
          // move along Z and bounce back along X
          this.velocity.set(-this.velocityX.x, 0, this.velocityZ.z);
        } else { // if X cannot move and Z cannot move
          // do not move at all
          this.velocity.multiplyScalar(0);
        };
      };
    };

    this.displacement.copy(this.velocity).multiplyScalar(dt)
    this.player.position.add(this.displacement);
  };

  get getForce() {
    return [this.force.x, this.force.y, this.force.z];
  };

  get getDrag() {
    return [this.drag.x, this.drag.y, this.drag.z];
  };

  get getVelocity() {
    return [this.velocity.x, this.velocity.y, this.velocity.z];
  };
};
