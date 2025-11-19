import { THREE, MonoBehavior } from "./d";

enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
};

export class GameInput implements MonoBehavior {
  // Keyboard Controls
  private directions: number[] = [0, 0, 0, 0];
  private moveDir: THREE.Vector2 = new THREE.Vector2(0, 0);
  // Mouse Controls (Touch Controls will use the same properties here)
  private _mouseXSpeed: number;
  private _mouseYSpeed: number;
  private _isMouse: boolean = false;
  private _isMouseMovingTimer: ReturnType<typeof setTimeout> = setTimeout(() => { });
  private _mousePos: THREE.Vector2 = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
  private _mouseDir: THREE.Vector2 = new THREE.Vector2(0, 0);

  constructor(mouseXSpeed: number = 11000, mouseYSpeed: number = 9500) {
    this._mouseXSpeed = mouseXSpeed;
    this._mouseYSpeed = mouseYSpeed;
  };

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

  private handleStart = (event: MouseEvent | TouchEvent): void => {
    if (this.isKeyboard) return;
    this._mouseDir.set(0, 0);
    if (event.type === 'mousedown') {
      const mouseEvent = event as MouseEvent;
      this._mousePos.set(mouseEvent.clientX, mouseEvent.clientY);
    } else if (event.type === 'touchstart') {
      const touchEvent = event as TouchEvent;
      this._mousePos.set(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
    };
    this._isMouse = true;
  };

  private handleMove = (event: MouseEvent | TouchEvent): void => {
    let x = 0;
    let y = 0;
    if (event.type === 'mousemove') {
      const mouseEvent = event as MouseEvent;
      x = THREE.MathUtils.lerp(this.mousePos.x, mouseEvent.clientX, 0.5);
      y = THREE.MathUtils.lerp(this.mousePos.y, mouseEvent.clientY, 0.5);
    } else if (event.type === 'touchmove') {
      const touchEvent = event as TouchEvent
      x = THREE.MathUtils.lerp(this.mousePos.x, touchEvent.touches[0].clientX, 0.5);
      y = THREE.MathUtils.lerp(this.mousePos.y, touchEvent.touches[0].clientY, 0.5);
    };

    const dx = (x - this.mousePos.x) * this._mouseXSpeed / window.innerWidth / window.innerHeight;
    const dy = (y - this.mousePos.y) * this._mouseYSpeed / window.innerWidth / window.innerHeight;
    this._mouseDir.set(dx, dy);
    this._mousePos.set(x, y);
    clearTimeout(this._isMouseMovingTimer);
    this._isMouseMovingTimer = setTimeout(() => {
      this._mouseDir.set(0, 0);
    }, 50);
  };

  private handleEnd = (): void => {
    if (this.isKeyboard) return;
    this._mouseDir.set(0, 0);
    this._isMouse = false;
  };

  public start(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('click', this.handleMouseClick);
    window.addEventListener('mousedown', this.handleStart);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleEnd);
    window.addEventListener('touchstart', this.handleStart, { passive: false });
    window.addEventListener('touchmove', this.handleMove, { passive: false });
    window.addEventListener('touchend', this.handleEnd, { passive: false });
  };

  public update(): void {

  };

  public end(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('click', this.handleMouseClick);
    window.removeEventListener('mousedown', this.handleStart);
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleEnd);
    window.removeEventListener('touchstart', this.handleStart);
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('touchend', this.handleEnd);
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

  public set mouseHorizontalSpeed(speed: number) {
    this._mouseXSpeed = speed;
  };

  public set mouseVerticalSpeed(speed: number) {
    this._mouseYSpeed = speed;
  };
};
