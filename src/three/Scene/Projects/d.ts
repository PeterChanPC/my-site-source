import { THREE } from "@/three/d";
export const projectScene = new THREE.Scene();

import { Camera } from "./Objects/Camera";
export const projectCamera = new Camera();

export { Lights } from "./Objects/Lights";
export { Player } from "./Objects/Player";
export { Grid } from "./Objects/Grid";
export { ChunkLoader } from "./Objects/ChunkLoader";