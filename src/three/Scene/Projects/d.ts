import { THREE } from "@/three/d";
export const projectScene = new THREE.Scene();

import { Camera } from "./Objects/Camera";
export const projectCamera = new Camera();

export { Font } from '@/assets/font/d';
export { Lights } from "./Objects/Lights";
export { Player } from "./Objects/Player";
export { Text } from "./Objects/Text";
export { TextLoader } from "./Objects/TextLoader";
export { Chunk } from "./Objects/Chunk";
export { ChunkLoader } from "./Objects/ChunkLoader";