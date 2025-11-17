import { THREE } from "./d";

export abstract class MonoBehavior {
  public abstract start(scene?: THREE.Scene): void;
  public abstract update(clock?: THREE.Clock): void;
  public abstract end(): void;
};