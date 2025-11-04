import { THREE } from "./three";

enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
};

export class GameInput {
  // Keyboard Controls
  private directions: number[] = [0, 0, 0, 0];
  private moveDir: THREE.Vector2 = new THREE.Vector2(0, 0);

  // Mouse Controls
  private _mousePos: THREE.Vector2 = new THREE.Vector2(9999, 9999);
  private _mouseDir: THREE.Vector2 = new THREE.Vector2(0, 0);
  private _isMouseMovingTimer: ReturnType<typeof setTimeout> = 0;
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

  private handleMouseClick = (event: MouseEvent): void => {
    this._mousePos.set(event.clientX, event.clientY);
  };

  private handleMouseDown = (event: MouseEvent): void => {
    if (this.isKeyboard) return;
    this._mouseDir.set(0, 0);
    this._mousePos.set(event.clientX, event.clientY);
    this._isMouse = true;
  };

  private handleMouseMove = (event: MouseEvent): void => {
    const x = event.clientX;
    const y = event.clientY;
    this._mouseDir.set(x - this._mousePos.x, y - this.mousePos.y);
    this._mousePos.set(x, y);
    clearTimeout(this._isMouseMovingTimer);
    this._isMouseMovingTimer = setTimeout(() => {
      this._mouseDir.set(0, 0);
    }, 50);
  };

  private handleMouseUp = (): void => {
    if (this.isKeyboard) return;
    this._mouseDir.set(0, 0);
    this._isMouse = false;
  };

  public addInputListener(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('click', this.handleMouseClick);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  public removeInputListener(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('click', this.handleMouseClick);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  public getMovementVectorNormalized(): THREE.Vector2 {
    return this.moveDir.normalize();
  };

  public get mousePos(): THREE.Vector2 {
    return this._mousePos;
  };

  public get mouseDir(): THREE.Vector2 {
    return this._mouseDir;
  };

  public get isMouse(): boolean {
    return this._isMouse;
  };

  public get isKeyboard(): boolean {
    return this.directions.includes(1);
  };
};