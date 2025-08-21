import * as THREE from 'three';
import Physics from './Physics';

export default class GameInput {
  private isMouse: boolean = false;
  private pointerPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private moveDir: THREE.Vector2 = new THREE.Vector2(0, 0);
  private moveUp: boolean = false;
  private moveDown: boolean = false;
  private moveLeft: boolean = false;
  private moveRight: boolean = false;
  private physics?: Physics;

  constructor(physics?: Physics) {
    this.physics = physics;
  }

  private handleMovementVector() {
    if (this.moveUp) {
      this.moveDir.y = -1;
      if (this.moveDown) this.moveDir.y = 0;
    } else if (this.moveDown) {
      this.moveDir.y = 1;
      if (this.moveUp) this.moveDir.y = 0;
    } else {
      this.moveDir.y = 0;
    };
    if (this.moveLeft) {
      this.moveDir.x = -1;
      if (this.moveRight) this.moveDir.x = 0;
    } else if (this.moveRight) {
      this.moveDir.x = 1;
      if (this.moveLeft) this.moveDir.x = 0;
    } else {
      this.moveDir.x = 0;
    };
  };

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveUp = true;
        break;
      case 'ArrowDown':
        this.moveDown = true;
        break;
      case 'ArrowLeft':
        this.moveLeft = true;
        break;
      case 'ArrowRight':
        this.moveRight = true;
        break;
    };
    this.handleMovementVector();
  };

  private handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveUp = false;
        break;
      case 'ArrowDown':
        this.moveDown = false;
        break;
      case 'ArrowLeft':
        this.moveLeft = false;
        break;
      case 'ArrowRight':
        this.moveRight = false;
        break;
    };
    this.handleMovementVector();
  };

  private handleMouseDown(): void {
    
  };

  private handleMouseUp(): void {

  };

  private boundHandleKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);

  private boundHandleKeyUp = (event: KeyboardEvent) => this.handleKeyUp(event);

  public addInputListener(): void {
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
  };

  public removeInputListener(): void {
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
  };

  public getMovementVectorNormalized() {
    let moveVecNorm = this.moveDir.clone().normalize();
    return moveVecNorm;
  };
}