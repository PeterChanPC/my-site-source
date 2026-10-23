import { THREE } from "@/three/d";
import { Camera } from "./Objects/Camera";

export { Font } from "@/assets/font/d";

export const projectScene = new THREE.Scene();
export const projectCamera = new Camera();

export { Lights } from "./Objects/Lights";
export { Player } from "./Objects/Player";
export { Chunk } from "./Objects/Chunk";
export { ChunkLoader } from "./Objects/ChunkLoader";
export { Text } from "./Objects/Text";
export { TextLoader } from "./Objects/TextLoader";

export const Work = {
  Fourier: { name: "Fourier Drawer", url: "/fourier-drawer" },
};
export type Work = (typeof Work)[keyof typeof Work];
