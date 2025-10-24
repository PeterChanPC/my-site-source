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