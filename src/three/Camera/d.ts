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
  setCameraSize?(size: number): void;
  setCameraFOV?(fov: number): void;
  setCameraNear(near: number): void;
  setCameraFar(far: number): void;
  setCameraRange(near: number, far: number): void;
  moveCamera(x: number, y: number, z: number, speed?: number): void;
  setCameraPos(x: number, y: number, z: number): void;
  setCameraLookAt(x: number, y: number, z: number): void;
  addResizeListener(): void;
  removeResizeListener(): void;
  camera: THREE.Camera;
};
export { CameraController } from './CameraController';
export { BaseCameraController } from './BaseCameraController';
export { OrthographicCameraController } from './OrthographicCameraController';
export { PerspectiveCameraController } from './PerspectiveCameraController';