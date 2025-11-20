import { THREE, MonoBehavior, Themes } from "@/three/d";
import { projectScene } from "../d";
import { useThemeStore } from "@/stores/theme.store";

export class Lights implements MonoBehavior {
  private alpha: number = 0.1;
  private ambientLightIntensityLight: number = 0.7;
  private ambientLightIntensityDark: number = 0.1;
  private ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
  private themeStore: ReturnType<typeof useThemeStore> = useThemeStore();

  public start(): void {
    if (this.themeStore.theme === Themes.Light) {
      this.ambientLight.intensity = this.ambientLightIntensityLight;
    } else if (this.themeStore.theme === Themes.Dark) {
      this.ambientLight.intensity = this.ambientLightIntensityDark;
    };

    projectScene.add(this.ambientLight);
  };

  public update(): void {
    if (this.themeStore.theme === Themes.Light) {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityLight, this.alpha);
    } else if (this.themeStore.theme === Themes.Dark) {
      this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, this.ambientLightIntensityDark, this.alpha);
    };
  };

  public end(): void {
    this.ambientLight.dispose();
  };
};
