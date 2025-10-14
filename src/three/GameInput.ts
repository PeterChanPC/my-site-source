import * as THREE from 'three';
import Physics from './Physics';

export default class GameInput {
  private isMouse: boolean;
  private mousePos: THREE.Vector2;
  private moveDir: THREE.Vector2;
  private moveUp: boolean;
  private moveDown: boolean;
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor() {
    this.isMouse = false;
    this.mousePos = new THREE.Vector2(0, 0);
    this.moveDir = new THREE.Vector2(0, 0);
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  };

  private isKeyboard = (): boolean => {
    if (this.moveUp || this.moveRight || this.moveDown || this.moveLeft) return true;
    return false;
  };

  private handleMovementVector = (): void => {
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

  private handleKeyDown = (event: KeyboardEvent): void => {
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
    this.handleMovementVector();
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
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
    this.handleMovementVector();
  };

  private handleMouseDown = (event: MouseEvent): void => {
    if (this.isKeyboard()) return;
    this.isMouse = true;
    this.mousePos.set(event.clientX, event.clientY);
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this.mousePos.set(event.clientX, event.clientY);
  };

  private handleMouseUp = (): void => {
    if (this.isKeyboard()) return;
    this.isMouse = false;
    this.mousePos.set(0, 0);
  };

  private boundHandleKeyDown = (event: KeyboardEvent): void => this.handleKeyDown(event);

  private boundHandleKeyUp = (event: KeyboardEvent): void => this.handleKeyUp(event);

  private boundHandleMouseDown = (event: MouseEvent): void => this.handleMouseDown(event);

  private boundHandleMouseMove = (event: MouseEvent): void => this.handleMouseMove(event);

  private boundHandleMouseUp = (): void => this.handleMouseUp();

  public addInputListener = (): void => {
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
    window.addEventListener('mousedown', this.boundHandleMouseDown);
    window.addEventListener('mousemove', this.boundHandleMouseMove);
    window.addEventListener('mouseup', this.boundHandleMouseUp);
  };

  public removeInputListener = (): void => {
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
    window.removeEventListener('mousedown', this.boundHandleMouseDown);
    window.removeEventListener('mousemove', this.boundHandleMouseMove);
    window.removeEventListener('mouseup', this.boundHandleMouseUp);
  };

  get getIsMouse(): boolean {
    return this.isMouse;
  };

  get getIsKeyboard(): boolean {
    return this.isKeyboard();
  };

  get getMousePos(): THREE.Vector2 {
    return this.mousePos;
  };

  get getMovementVectorNormalized(): THREE.Vector2 {
    return this.moveDir.normalize();
  };
};