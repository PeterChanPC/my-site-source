import * as THREE from 'three';

export default class GameInput {
  private isMouse: boolean = false;
  private pointerPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private moveDir: THREE.Vector2 = new THREE.Vector2(0, 0);
  private moveUp: boolean = false;
  private moveDown: boolean = false;
  private moveLeft: boolean = false;
  private moveRight: boolean = false;

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

  public addInputListener(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event));
  };

  public removeInputListener(): void {
    window.removeEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
    window.removeEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event));
  };

  public getMovementVectorNormalized() {
    let moveVecNorm = this.moveDir.clone().normalize();
    return moveVecNorm;
  };
}