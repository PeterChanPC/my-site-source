import { THREE } from "./three";

enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
};

export class GameInput {
  private directions: number[] = [0, 0, 0, 0];
  private moveDir: THREE.Vector2 = new THREE.Vector2(0, 0);
  private mousePos: THREE.Vector2 = new THREE.Vector2(0, 0);
  private isMouse: boolean = false;

  private isKeyboard = (): boolean => {
    return this.directions.includes(1);
  };

  private handleMovementVector = (): void => {
    this.moveDir.x = this.directions[Direction.Right] - this.directions[Direction.Left];
    this.moveDir.y = this.directions[Direction.Down] - this.directions[Direction.Up];
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.isMouse) return;
    switch (event.key) {
      case 'ArrowUp':
        this.directions[Direction.Up] = 1;
        break;
      case 'ArrowDown':
        this.directions[Direction.Down] = 1;
        break;
      case 'ArrowLeft':
        this.directions[Direction.Left] = 1;
        break;
      case 'ArrowRight':
        this.directions[Direction.Right] = 1;
        break;
    };
    this.handleMovementVector();
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    if (this.isMouse) return;
    switch (event.key) {
      case 'ArrowUp':
        this.directions[Direction.Up] = 0;
        break;
      case 'ArrowDown':
        this.directions[Direction.Down] = 0;
        break;
      case 'ArrowLeft':
        this.directions[Direction.Left] = 0;
        break;
      case 'ArrowRight':
        this.directions[Direction.Right] = 0;
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

  public addInputListener = (): void => {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  public removeInputListener = (): void => {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
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