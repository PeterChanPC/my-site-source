import * as THREE from 'three';
export { THREE };

export type { MonoBehavior } from './MonoBehavior';

export type { CameraType } from './Camera/d';
export type { CameraProperty } from './Camera/d';
export type { BaseCameraProperty } from './Camera/d';
export type { OrthographicCameraProperty } from './Camera/d';
export type { PerspectiveCameraProperty } from './Camera/d';
export type { ICameraController } from './Camera/d';
export { CameraController } from './Camera/d';
export { OrthographicCameraController } from './Camera/d';
export { PerspectiveCameraController } from './Camera/d';

export { RendererController } from './RendererController';
import { GameInput } from './GameInput';
import { Physics } from './Physics';
export { Themes } from '@/stores/d';

export const gameInput = new GameInput();
export const physics = new Physics();
export const clock = new THREE.Clock();

export { HomepageGame } from './Scene/Homepage/HomepageGame';
export { ProjectGame } from './Scene/Projects/ProjectGame';