import { THREE } from "@/three/d";
export const homepageScene = new THREE.Scene();

import { Camera } from "./Objects/Camera";
export const homepageCamera = new Camera();

export { Lights } from "./Objects/Lights";
export { Player } from "./Objects/Player";
export { Walls } from "./Objects/Walls";