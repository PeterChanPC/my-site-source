import * as THREE from 'three';
import texture from '@/assets/img/texture.webp';
import { SupportedTheme } from "@/stores/d";

export default class SceneController {
  private scene: THREE.Scene = new THREE.Scene();
  private theme: SupportedTheme = 'light';

  constructor(theme: SupportedTheme) {
    this.theme = theme;
  };

  // Texture
  private playerTexture = new THREE.TextureLoader().load(texture);

  // Materials
  private playerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: this.playerTexture });
  private wallMaterial_1 = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
  private wallMaterial_2 = new THREE.MeshBasicMaterial({ transparent: true });
  private floorMaterial = this.wallMaterial_1;

  // Geometry
  private playerGeometry = new THREE.SphereGeometry(1, 32, 32);
  private wallGeometry = new THREE.PlaneGeometry(20, 20);
  private floorGeometry = new THREE.PlaneGeometry(20, 100);

  // Player (Sphere)
  private playerMesh = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
  private player = new THREE.Object3D().attach(this.playerMesh);

  // Walls
  private wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_1);
  private wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);
  private wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial_2);

  // Floor
  private floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);

  // Ambient Light
  private ambientLight = new THREE.AmbientLight(0xcccccc);

  // Spotlights
  private spotlightPrimary = new THREE.SpotLight(0xffffff);
  private spotlightSecondary = new THREE.SpotLight(0xdddddd);
  private spotlightPrimaryPosLight = new THREE.Vector3(50, 50, 50);
  private spotlightPrimaryPosDark = new THREE.Vector3(-50, 50, 50);

  // Textures Setup
  private setTextures = (): void => {
    this.playerTexture.wrapS = THREE.RepeatWrapping;
    this.playerTexture.wrapT = THREE.RepeatWrapping;
    this.playerTexture.repeat.set(3, 3);
    this.playerMesh.frustumCulled = false;
  };

  // Positions Setup
  private setPositions = (): void => {
    this.player.position.set(3, 0, -2);

    this.wall_1.position.set(0, 0, -10);
    this.wall_2.position.set(-5, 0, 0);
    this.wall_3.position.set(5, 0, 0);
    this.wall_4.position.set(0, 0, 10);

    this.wall_2.rotation.set(0, Math.PI / 2, 0);
    this.wall_3.rotation.set(0, -Math.PI / 2, 0);
    this.wall_4.rotation.set(0, Math.PI, 0);

    this.floor.position.set(0, -1, 0);
    this.floor.rotation.set(-Math.PI / 2, 0, 0);

    this.theme === 'light' ?
      this.spotlightPrimary.position.set(50, 50, 50) :
      this.spotlightPrimary.position.set(-50, 50, 50);
    this.spotlightSecondary.position.set(-50, 50, 50);
  };

  // Lighting Setup
  private setLightings = (): void => {
    this.playerMesh.castShadow = true;
    this.wall_1.receiveShadow = true;
    this.floor.receiveShadow = true;

    this.spotlightPrimary.power = 50000;
    this.spotlightPrimary.penumbra = 0.8;
    this.spotlightPrimary.castShadow = true;
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.shadow.mapSize.width = 512;
    this.spotlightPrimary.shadow.mapSize.height = 512;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.castShadow = true;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.shadow.mapSize.width = 512;
    this.spotlightSecondary.shadow.mapSize.height = 512;

    if (this.theme === 'light') {
      this.ambientLight.intensity = 1;
      this.spotlightPrimary.angle = 0.1;
      this.spotlightSecondary.power = 0;
    } else {
      this.ambientLight.intensity = 0;
      this.spotlightPrimary.angle = 0.03;
      this.spotlightSecondary.power = 5000;
    };
  };

  // Scene Setup
  public createScene = (): void => {
    this.setTextures();
    this.setPositions();
    this.setLightings();
    this.scene.add(this.player, this.floor, this.wall_1, this.wall_2, this.wall_3, this.wall_4, this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
  };

  get getScene(): THREE.Scene {
    return this.scene;
  };

  get getPlayerObject(): THREE.Object3D {
    return this.player;
  };

  public changeTheme = (theme: SupportedTheme): void => {
    if (this.theme !== theme) this.theme = theme;
    if (this.theme === 'light') {
      if (this.ambientLight.intensity < 1) this.ambientLight.intensity += 0.05;
      if (this.spotlightPrimary.angle < 0.1) this.spotlightPrimary.angle += 0.005;
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosLight, 0.1);
      this.spotlightSecondary.power = 0;
    } else {
      if (this.ambientLight.intensity > 0) this.ambientLight.intensity -= 0.05;
      if (this.spotlightPrimary.angle > 0.03) this.spotlightPrimary.angle -= 0.005;
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosDark, 0.1);
      this.spotlightSecondary.power = 5000;
    };
  };
};