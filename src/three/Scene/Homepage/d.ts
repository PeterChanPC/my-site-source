import { THREE } from "@/three/d";
import { Camera } from "./Objects/Camera";

export { texture } from '@/assets/img/d';

export const homepageScene = new THREE.Scene();
export const homepageCamera = new Camera();

export { Lights } from "./Objects/Lights";
export { Player } from "./Objects/Player";
export { Walls } from "./Objects/Walls";