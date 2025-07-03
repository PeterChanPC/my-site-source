import * as THREE from 'three';
import GameInput from './GameInput';

export default class Player {
  player: THREE.Object3D;
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  gameInput?: GameInput;

  constructor(player: THREE.Object3D) {
    this.player = player;
  }

  applyForce(strength: number): void {
    if (!this.gameInput) return;
    let inputVector: THREE.Vector2 = this.gameInput.getMovementVectorNormalized();
    let moveDir: THREE.Vector3 = new THREE.Vector3(inputVector.x, 0, inputVector.y);
    this.force = moveDir.multiplyScalar(strength);
  }

  updateDrag() {
    this.drag.set(this.velocity.x, 0, this.velocity.z);
  }

  updateForce() {
    this.force.sub(this.drag);
  }

  updateVelocity() {
    
  }
}
