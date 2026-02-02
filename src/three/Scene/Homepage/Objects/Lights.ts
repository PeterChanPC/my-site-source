import { THREE, MonoBehavior, Theme, useThemeStore } from "@/three/d";
import { homepageScene } from "../d";

export class Lights implements MonoBehavior {
  private theme: Theme | null = null;
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
  private alpha: number = 0.1;

  private updateTheme(): void {
    const themeStore = useThemeStore();

    if (themeStore.theme === Theme.Light) {
      if (this.theme) {
        console.log('hi')
        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, this.alpha);
        this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleLight, this.alpha);
        this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosLight, this.alpha);
        this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
        return;
      };

      this.spotlightPrimary.position.set(50, 50, 50);
      this.ambientLight.intensity = this.ambientLightIntensityLight;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleLight;
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else if (themeStore.theme === Theme.Dark) {
      if (this.theme) {
        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, this.alpha);
        this.spotlightPrimary.angle = THREE.MathUtils.lerp(this.spotlightPrimary.angle, this.spotlightPrimaryAngleDark, this.alpha);
        this.spotlightPrimary.position.lerp(this.spotlightPrimaryPosDark, this.alpha);
        this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
        return;
      };

      this.spotlightPrimary.position.set(-50, 50, 50);
      this.ambientLight.intensity = this.ambientLightIntensityDark;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleDark;
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };

    this.theme = themeStore.theme;
  };

  public start(): void {
    this.spotlightPrimary.power = 50000;
    this.spotlightPrimary.penumbra = 0.8;
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.castShadow = true;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.castShadow = true;

    this.spotlightSecondary.position.set(-50, 50, 50);

    this.updateTheme();

    homepageScene.add(this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
  };

  public update(): void {
    this.updateTheme();
  };

  public end(): void {
    homepageScene.remove(this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
    this.ambientLight.dispose();
    this.spotlightPrimary.dispose();
    this.spotlightSecondary.dispose();
  };
};
