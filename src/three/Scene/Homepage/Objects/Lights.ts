import { Themes } from "@/stores/d";
import { THREE, MonoBehavior } from "@/three/d";

export class Lights implements MonoBehavior {
  private ambientLightIntensityLight = 1;
  private ambientLightIntensityDark = 0;
  private spotlightPrimaryPosLight = new THREE.Vector3(50, 50, 50);
  private spotlightPrimaryPosDark = new THREE.Vector3(-50, 50, 50);
  private spotlightPrimaryAngleLight = 0.1;
  private spotlightPrimaryAngleDark = 0.03;
  private spotlightSecondaryPowLight = 0;
  private spotlightSecondaryPowDark = 5000;
  private ambientLight = new THREE.AmbientLight(0xcccccc);
  private spotlightPrimary = new THREE.SpotLight(0xffffff);
  private spotlightSecondary = new THREE.SpotLight(0xdddddd);
  private theme: Themes = Themes.Light;
  private alpha: number = 0.1;

  constructor(theme: Themes) {
    if (theme) this.theme = theme;
  };

  public setTheme(theme: Themes) {
    this.theme = theme;
  };

  public start(scene: THREE.Scene): void {
    this.spotlightPrimary.power = 50000;
    this.spotlightPrimary.penumbra = 0.8;
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.castShadow = true;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.castShadow = true;

    if (this.theme === Themes.Light) {
      this.spotlightPrimary.position.set(50, 50, 50);

      this.ambientLight.intensity = this.ambientLightIntensityLight;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleLight;
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else if (this.theme === Themes.Dark) {
      this.spotlightPrimary.position.set(-50, 50, 50);

      this.ambientLight.intensity = this.ambientLightIntensityDark;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleDark;
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };

    this.spotlightSecondary.position.set(-50, 50, 50);

    scene.add(this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
  };

  public update(): void {
    if (this.theme === 'light') {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, this.alpha);
      this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleLight, this.alpha);
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosLight, this.alpha);
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, this.alpha);
      this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleDark, this.alpha);
      this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosDark, this.alpha);
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };
  };

  public end(): void {
    this.ambientLight.dispose();
    this.spotlightPrimary.dispose();
    this.spotlightSecondary.dispose();
  };
};