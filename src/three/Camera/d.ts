import { THREE } from "../three";

export enum CameraType {
  Orthographic = 'orthographic',
  Perspective = 'perspective'
};

export type CameraProperty =
  | OrthographicCameraProperty
  | PerspectiveCameraProperty;

export interface BaseCameraProperty {
  near?: number;
  far?: number;
};

export interface OrthographicCameraProperty extends BaseCameraProperty {
  type: 'orthographic';
  size?: number;
};

export interface PerspectiveCameraProperty extends BaseCameraProperty {
  type: 'perspective';
  fov?: number;
};

export interface ICameraController {
  setSize?(size: number): void;
  setFOV?(fov: number): void;
  setNear(near: number): void;
  setFar(far: number): void;
  setRange(near: number, far: number): void;
  move(dx: number, dy: number, dz: number, speed?: number): void;
  setPos(x: number, y: number, z: number): void;
  setLookAt(x: number, y: number, z: number): void;
  addResizeListener(): void;
  removeResizeListener(): void;
  camera: THREE.Camera;
};

export { CameraController } from './CameraController';
export { BaseCameraController } from './BaseCameraController';
export { OrthographicCameraController } from './OrthographicCameraController';
export { PerspectiveCameraController } from './PerspectiveCameraController';