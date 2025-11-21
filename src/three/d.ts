import * as THREE from 'three';
import { GameInput } from './GameInput';
import { Physics } from './Physics';

export { THREE };

export type { MonoBehavior } from './MonoBehavior';

export { RendererController } from './RendererController';
export { Themes } from '@/stores/d';
export const gameInput = new GameInput();
export const physics = new Physics();
export const clock = new THREE.Clock();

export { HomepageGame } from './Scene/Homepage/HomepageGame';
export { ProjectGame } from './Scene/Projects/ProjectGame';