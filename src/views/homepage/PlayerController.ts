import * as THREE from 'three';
import GameInput from './GameInput';
import Physics from './Physics';

export default class Player {
  player: THREE.Object3D;
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  clock: THREE.Clock = new THREE.Clock();
  gameInput: GameInput;
  physics: Physics;

  constructor(player: THREE.Object3D, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.gameInput = gameInput;
    this.physics = physics;
  };

  updateForce(strength: number) {
    let moveVec = this.gameInput.getMovementVectorNormalized();
    this.force.set(moveVec.x, 0, moveVec.y).multiplyScalar(strength);
    this.force.z *= 2; // vertical compensation for user experience
  }

  updateDrag(strength: number) {
    this.drag.set(this.velocity.x, 0, this.velocity.z).multiplyScalar(strength);
  };

  updateVelocity(dt: number) {
    let dv = this.force.clone().sub(this.drag).multiplyScalar(dt);
    // remove fluctuation due to decimals places
    if (this.velocity.length() < 0.5 && this.force.length() === 0) {
      this.velocity.multiplyScalar(0);
      dv.multiplyScalar(0)
    };
    this.velocity.add(dv);
  };

  applyMovement() {
    let dt = this.clock.getDelta();
    this.updateForce(30);
    this.updateDrag(3);
    this.updateVelocity(dt);

    // detect collision
    let canMove = this.physics.lineCast(this.player.position, this.velocity, 1).length === 0 && this.physics.lineCast(this.player.position, this.force, 1).length === 0; // check move direction

    if (!canMove) { // if move direction is blocked
      const velocityX = new THREE.Vector3(this.velocity.x, 0, 0);
      const velocityZ = new THREE.Vector3(0, 0, this.velocity.z);
      canMove = this.physics.lineCast(this.player.position, velocityX, 1).length === 0; // check X
      if (canMove) { // if X can move
        // move along X
        canMove = this.physics.lineCast(this.player.position, velocityZ, 1).length === 0; // check Z
        if (canMove) { // if X can move and Z can move
          this.velocity.set(velocityX.x, 0, velocityZ.z);
        } else {
          this.velocity.set(velocityX.x, 0, -velocityZ.z);
        }
      } else { // if X cannot move
        canMove = this.physics.lineCast(this.player.position, velocityZ, 1).length === 0; // check Z
        if (canMove) { // if X cannot move and Z can move
          // move along Z
          this.velocity.set(-velocityX.x, 0, velocityZ.z);
        } else { // if X cannot move and Z cannot move
          // do not move at all
          this.velocity.multiplyScalar(0);
        };
      };
    };

    this.player.position.add(this.velocity.clone().multiplyScalar(dt));
  };

  getForce() {
    return [this.force.x, this.force.y, this.force.z];
  }

  getDrag() {
    return [this.drag.x, this.drag.y, this.drag.z];
  }

  getVelocity() {
    return [this.velocity.x, this.velocity.y, this.velocity.z];
  }
};
