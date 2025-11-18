import { THREE } from "./d";

export abstract class MonoBehavior {
  public abstract start(): void;
  public abstract update(): void;
  public abstract end(): void;
};