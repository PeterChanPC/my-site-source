import { THREE, MonoBehavior, Themes, useThemeStore } from "@/three/d";
import { projectScene } from "../d";

export class Lights implements MonoBehavior {
  private theme: Themes | null = null;
  private alpha: number = 0.1;
  private ambientLightIntensityLight: number = 0.7;
  private ambientLightIntensityDark: number = 0.1;
  private ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);

  private updateTheme(): void {
    const themeStore = useThemeStore();

    if (themeStore.theme === Themes.Light) {
      if (this.theme) {
        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, this.alpha);
        return;
      };

      this.ambientLight.intensity = this.ambientLightIntensityLight;
    } else if (themeStore.theme === Themes.Dark) {
      if (this.theme) {
        this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, this.alpha);
        return;
      };

      this.ambientLight.intensity = this.ambientLightIntensityDark;
    };

    this.theme = themeStore.theme;
  };

  public start(): void {
    this.updateTheme();

    projectScene.add(this.ambientLight);
  };

  public update(): void {
    this.updateTheme();
  };

  public end(): void {
    projectScene.remove(this.ambientLight);
    this.ambientLight.dispose();
  };
};
