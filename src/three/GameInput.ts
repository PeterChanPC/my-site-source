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
  private _mousePos: THREE.Vector2 = new THREE.Vector2(0, 0);
  private _isMouse: boolean = false;

  private handleMovementVector = (): void => {
    this.moveDir.x = this.directions[Direction.Right] - this.directions[Direction.Left];
    this.moveDir.y = this.directions[Direction.Down] - this.directions[Direction.Up];
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this._isMouse) return;
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
    if (this._isMouse) return;
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
    if (this.isKeyboard) return;
    this._isMouse = true;
    this._mousePos.set(event.clientX, event.clientY);
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this._mousePos.set(event.clientX, event.clientY);
  };

  private handleMouseUp = (): void => {
    if (this.isKeyboard) return;
    this._isMouse = false;
    this._mousePos.set(0, 0);
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

  public getMovementVectorNormalized(): THREE.Vector2 {
    return this.moveDir.normalize();
  };

  public get isMouse(): boolean {
    return this._isMouse;
  };

  public get isKeyboard(): boolean {
    return this.directions.includes(1);
  };

  public get mousePos(): THREE.Vector2 {
    return this._mousePos;
  };
};