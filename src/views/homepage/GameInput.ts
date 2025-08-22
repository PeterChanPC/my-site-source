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
  };

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.isMouse) return;
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
  };

  private handleKeyUp(event: KeyboardEvent): void {
    if (this.isMouse) return;
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
  };

  private isKeyboard(): boolean {
    if (this.moveUp || this.moveDown || this.moveLeft || this.moveRight) return true;
    return false;
  };

  private handleMouseDown(event: MouseEvent): void {
    if (this.isKeyboard()) return;
    const pointerPos = this.physics?.screenPointToWorld(event.clientX, event.clientY);
    if (pointerPos) {
      this.isMouse = true;
      this.pointerPos.set(pointerPos.x, 0, pointerPos.z);
    };
  };

  private handleMouseMove(event: MouseEvent): void {
    if (this.isKeyboard()) return;
    const pointerPos = this.physics?.screenPointToWorld(event.clientX, event.clientY);
    if (pointerPos) this.pointerPos.set(pointerPos.x, 0, pointerPos.z);
  };

  private handleMouseUp(): void {
    if (this.isKeyboard()) return;
    this.isMouse = false;
    this.moveDir.set(0, 0);
  };

  private boundHandleKeyDown = (event: KeyboardEvent): void => this.handleKeyDown(event);

  private boundHandleKeyUp = (event: KeyboardEvent): void => this.handleKeyUp(event);

  private boundHandleMouseDown = (event: MouseEvent): void => this.handleMouseDown(event);

  private boundHandleMouseMove = (event: MouseEvent): void => this.handleMouseMove(event);

  private boundHandleMouseUp = (): void => this.handleMouseUp();

  public addInputListener(): void {
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
    window.addEventListener('mousedown', this.boundHandleMouseDown);
    window.addEventListener('mousemove', this.boundHandleMouseMove);
    window.addEventListener('mouseup', this.boundHandleMouseUp);
  };

  public removeInputListener(): void {
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
    window.removeEventListener('mousedown', this.boundHandleMouseDown);
    window.removeEventListener('mousemove', this.boundHandleMouseMove);
    window.removeEventListener('mouseup', this.boundHandleMouseUp);
  };

  public handleMovementVector(playerPos?: THREE.Vector3): void {
    if (this.isMouse && !this.isKeyboard() && playerPos) {
      const pointerDir = this.pointerPos.clone().sub(playerPos);
      if (pointerDir.length() > 0.1) {
        this.moveDir.set(pointerDir.x, pointerDir.z)
      } else {
        this.moveDir.set(0, 0);
      };
      return;
    };
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

  public getMovementVectorNormalized(): THREE.Vector2 {
    let moveVecNorm = this.moveDir.clone().normalize();
    return moveVecNorm;
  };
}