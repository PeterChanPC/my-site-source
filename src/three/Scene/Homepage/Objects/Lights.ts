import { THREE, MonoBehavior, Themes } from "@/three/d";
import { homepageScene } from "../d";
import { useThemeStore } from "@/stores/theme.store";

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
  private alpha: number = 0.1;
  private themeStore = useThemeStore();

  public start(): void {
    this.spotlightPrimary.power = 50000;
    this.spotlightPrimary.penumbra = 0.8;
    this.spotlightPrimary.shadow.intensity = 0.8;
    this.spotlightPrimary.castShadow = true;

    this.spotlightSecondary.angle = 0.08;
    this.spotlightSecondary.penumbra = 0.8;
    this.spotlightSecondary.shadow.intensity = 0.8;
    this.spotlightSecondary.castShadow = true;

    if (this.themeStore.theme === Themes.Light) {
      this.spotlightPrimary.position.set(50, 50, 50);

      this.ambientLight.intensity = this.ambientLightIntensityLight;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleLight;
      this.spotlightSecondary.power = this.spotlightSecondaryPowLight;
    } else if (this.themeStore.theme === Themes.Dark) {
      this.spotlightPrimary.position.set(-50, 50, 50);

      this.ambientLight.intensity = this.ambientLightIntensityDark;
      this.spotlightPrimary.angle = this.spotlightPrimaryAngleDark;
      this.spotlightSecondary.power = this.spotlightSecondaryPowDark;
    };

    this.spotlightSecondary.position.set(-50, 50, 50);

    homepageScene.add(this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
  };

  public update(): void {
    if (this.themeStore.theme === 'light') {
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
    homepageScene.remove(this.ambientLight, this.spotlightPrimary, this.spotlightSecondary);
    this.ambientLight.dispose();
    this.spotlightPrimary.dispose();
    this.spotlightSecondary.dispose();
  };
};
