import * as THREE from 'three';
export { THREE };

export type { MonoBehavior } from './MonoBehavior';

export { RendererController } from './RendererController';
import { GameInput } from './GameInput';
import { Physics } from './Physics';
export { Themes } from '@/stores/d';

export const gameInput = new GameInput();
export const physics = new Physics();
export const clock = new THREE.Clock();

export { HomepageGame } from './Scene/Homepage/HomepageGame';
export { ProjectGame } from './Scene/Projects/ProjectGame';