import { THREE } from "../three";

export type SupportedCameraType = 'orthographic' | 'perspective';
export const SUPPORTED_CAMERA_TYPES: SupportedCameraType[] = ['orthographic', 'perspective'];
export enum CameraType {
  Orthographic = 0,
  Perspective = 1
};

export type CameraProperty = OrthographicCameraProperty | PerspectiveCameraProperty;

export interface BaseCameraProperty {
  near?: number;
  far?: number;
};

export interface OrthographicCameraProperty extends BaseCameraProperty {
  size?: number;
};

export interface PerspectiveCameraProperty extends BaseCameraProperty {
  fov?: number;
};

export interface ICameraController {
  setCameraNear(near: number): void;
  setCameraFar(far: number): void;
  setCameraRange(near: number, far: number): void;
  setCameraPos(x: number, y: number, z: number): void;
  setCameraLookAt(x: number, y: number, z: number): void;
  addResizeListener(): void;
  removeResizeListener(): void;
  camera: THREE.Camera;
};

export { OrthographicCameraController } from './OrthographicCameraController';
export { PerspectiveCameraController } from './PerspectiveCameraController';