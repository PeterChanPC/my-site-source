import * as THREE from 'three';
import GameInput from './GameInput';
import Physics from './Physics';

export default class Player {
  player: THREE.Object3D;
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  clock: THREE.Clock = new THREE.Clock();
  scene: THREE.Scene;
  gameInput: GameInput;
  physics: Physics;

  constructor(player: THREE.Object3D, scene: THREE.Scene, gameInput: GameInput, physics: Physics) {
    this.player = player;
    this.gameInput = gameInput;
    this.physics = physics;
    this.scene = scene;
  };

  updateForce(strength: number) {
    let moveVec = this.gameInput.getMovementVectorNormalized();
    this.force.set(moveVec.x, 0, moveVec.y).multiplyScalar(strength);
  }

  updateDrag(strength: number) {
    let dragDir = this.velocity.clone().normalize();
    this.drag.set(dragDir.x, 0, dragDir.z).multiplyScalar(strength);
  };

  updateVelocity(dt: number) {
    let dv = this.force.clone().sub(this.drag).multiplyScalar(dt);
    dv.z *= 2; // vertical velocity compensation for user experience
    // "damping"
    if (Math.abs(this.velocity.x) < Math.abs(dv.x)) this.velocity.x = 0;
    if (Math.abs(this.velocity.z) < Math.abs(dv.z)) this.velocity.z = 0;
    this.velocity.add(dv);
  };
  
  applyMovement() {
    let dt = this.clock.getDelta();
    this.updateForce(50);
    this.updateDrag(25);
    this.updateVelocity(dt);

    // detect collision
    let collidables = this.scene.children.filter(obj => obj !== this.player);

    let canMove = this.physics.raycast(collidables, this.player.position, this.velocity, 1).length === 0;

    if (!canMove) {
      let velocityX = new THREE.Vector3(this.velocity.x, 0, 0);
      canMove = this.physics.raycast(collidables, this.player.position, velocityX, 1).length === 0;
      if (canMove) {
        this.velocity = velocityX;
      } else {
        let velocityZ = new THREE.Vector3(0, 0, this.velocity.z);
        canMove = this.physics.raycast(collidables, this.player.position, velocityZ, 1).length === 0;
        if (canMove) {
          this.velocity = velocityZ;
        };
      };
    };

    this.player.position.add(this.velocity.clone().multiplyScalar(dt));
  };
}
