import * as THREE from 'three';
import GameInput from './GameInput';
import Raycast from './Raycast';

export default class Player {
  player: THREE.Object3D;
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  gameInput?: GameInput;
  raycast?: Raycast;

  constructor(player: THREE.Object3D, gameInput: GameInput, raycast: Raycast) {
    this.player = player;
    this.gameInput = gameInput;
    this.raycast = raycast;
  }

  updateForce(strength: number): void {
    if (!this.gameInput) return;
    let inputVector: THREE.Vector2 = this.gameInput.getMovementVectorNormalized();
    let moveDir: THREE.Vector3 = new THREE.Vector3(inputVector.x, 0, inputVector.y);
    this.updateDrag(3);
    this.force = moveDir.multiplyScalar(strength).sub(this.drag);
    // add force if player is facing a wall
  }

  updateDrag(strength: number): void {
    this.drag.set(this.velocity.x, 0, this.velocity.z).multiplyScalar(strength);
  }

  updateVelocity(dt: number) {
    this.updateForce(5);
    let dv = this.force.clone().multiplyScalar(dt);
    
  }
}
