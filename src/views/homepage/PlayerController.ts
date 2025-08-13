import * as THREE from 'three';
import GameInput from './GameInput';
import Raycast from './Raycast';

export default class Player {
  player: THREE.Object3D;
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  gameInput: GameInput;
  raycast: Raycast;

  constructor(player: THREE.Object3D, gameInput: GameInput, raycast: Raycast) {
    this.player = player;
    this.gameInput = gameInput;
    this.raycast = raycast;
  }

  updateVelocity() {
    const speed = 0.1;
    let moveVector = this.gameInput.getMovementVectorNormalized().multiplyScalar(speed);
    this.velocity.x = moveVector.x;
    this.velocity.z = moveVector.y;
  };
  
  applyMovement() {
    this.updateVelocity();

    // detect collision
    this.player.position.add(this.velocity);
  };
}
