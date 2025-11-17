import { THREE, Physics, GameInput, MonoBehavior } from "@/three/d";
import texture from '@/assets/img/texture.webp';

export class Player implements MonoBehavior {
  // movements
  private readonly velocityGrounding: number = 0.5;
  private readonly maxForce: number = 100;
  private readonly bounciness: number = 1;
  private readonly forceCoe: number = 30;
  private readonly dragCoe: number = 3;
  private readonly gameInput: GameInput;
  private readonly physics: Physics;
  private readonly mousePosYOffset: number = 100;
  private moveVec: THREE.Vector2 = new THREE.Vector2(0, 0);
  private displacement: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityX: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocityZ: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _force: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private _drag: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  // player object
  private playerRadius: number = 1;
  private playerGeometry = new THREE.SphereGeometry(this.playerRadius, 32, 32);
  private playerTexture = new THREE.TextureLoader().load(texture);
  private playerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: this.playerTexture });
  private player = new THREE.Mesh(this.playerGeometry, this.playerMaterial);

  constructor(gameInput: GameInput, physics: Physics) {
    this.gameInput = gameInput;
    this.physics = physics;
  };

  private updateMoveVec(): void {
    if (this.gameInput.isKeyboard) {
      this.moveVec = this.gameInput.getMovementVectorNormalized();
    } else if (this.gameInput.isMouse) {
      const mousePos = this.gameInput.mousePos;
      const mouseWorldPos = this.physics.screenPointToWorld(mousePos.x, mousePos.y + this.mousePosYOffset);
      if (mouseWorldPos) {
        const moveDir = mouseWorldPos.sub(this.player.position).normalize();
        if (moveDir) this.moveVec.set(moveDir.x, moveDir.z);
      };
    } else {
      this.moveVec.set(0, 0);
    };
  };

  private updateForce(strength: number): void {
    if (strength > this.maxForce) throw new Error('Large force may result in object tunneling in this physics engine');
    this._force.set(this.moveVec.x, 0, this.moveVec.y).multiplyScalar(strength);
    this._force.z *= 2; // forward/backward compensation for user experience
  };

  private updateDrag(strength: number): void {
    if (strength > this.maxForce) throw new Error('Large force may result in object tunneling in this physics engine');
    this._drag.copy(this._velocity).multiplyScalar(-strength);
  };

  private updateVelocity(dt: number): void {
    let dv = this._force.add(this._drag).multiplyScalar(dt);
    // remove fluctuation due to decimal places
    if (this._velocity.length() < this.velocityGrounding && this._force.length() === 0) {
      this._velocity.set(0, 0, 0);
      dv.set(0, 0, 0);
    };
    this._velocity.add(dv);
  };

  private safeLinecast(origin: THREE.Vector3, dir: THREE.Vector3): boolean {
    return this.physics.linecast(origin, dir, this.playerRadius, this.playerRadius, this.playerRadius);
  };

  private checkCollision(): void {
    let canMove = this.safeLinecast(this.player.position, this._velocity) && this.safeLinecast(this.player.position, this._force); // check move direction

    if (!canMove) { // if move direction is blocked
      this.velocityX.set(this._velocity.x, 0, 0);
      this.velocityZ.set(0, 0, this._velocity.z);
      canMove = this.safeLinecast(this.player.position, this.velocityX); // check X
      if (canMove) { // if X can move
        canMove = this.safeLinecast(this.player.position, this.velocityZ); // check Z
        if (canMove) { // if Z can also move
          this._velocity.set(this.velocityX.x, 0, this.velocityZ.z); // move along X and Z
        } else { // if Z cannot move
          this._velocity.set(this.velocityX.x, 0, -this.velocityZ.z * this.bounciness); // move along X and bounce back along Z
        };
      } else { // if X cannot move
        canMove = this.safeLinecast(this.player.position, this.velocityZ); // check Z
        if (canMove) { // if Z can move
          this._velocity.set(-this.velocityX.x * this.bounciness, 0, this.velocityZ.z); // move along Z and bounce back along X
        } else { // if both X and Z cannot move
          this._velocity.set(0, 0, 0); // do not move at all
        };
      };
    };
  };

  private applyMovement(dt: number): void {
    this.updateMoveVec();
    this.updateForce(this.forceCoe);
    this.updateDrag(this.dragCoe);
    this.updateVelocity(dt);
    this.checkCollision();
    this.displacement.copy(this._velocity).multiplyScalar(dt)
    this.player.position.add(this.displacement);
  };

  public start(scene: THREE.Scene): void {
    this.playerTexture.wrapS = THREE.RepeatWrapping;
    this.playerTexture.wrapT = THREE.RepeatWrapping;
    this.playerTexture.repeat.set(3, 3);

    this.player.position.set(3, 0, -2);
    this.player.castShadow = true;

    scene.add(this.player);
  };

  public update(clock: THREE.Clock): void {
    const dt = clock.getDelta();
    this.applyMovement(dt);
  };

  public end(): void {
    this.playerMaterial.dispose();
    this.playerTexture.dispose();
    this.playerGeometry.dispose();
  };

  public get obj(): THREE.Mesh {
    return this.player;
  };

  public get force(): THREE.Vector3 {
    return this._force;
  };

  public get drag(): THREE.Vector3 {
    return this._drag;
  };

  public get velocity(): THREE.Vector3 {
    return this._velocity;
  };
};
