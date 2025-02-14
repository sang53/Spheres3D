import { useFrame } from "@react-three/fiber";
import { getPointerCoordsAtZ, pointerWorld } from "../../utils/Helpers/Helpers";
import { Vector3 } from "three";

export function PointerUpdater({ baseVector = pointerWorld, zDepth }: Props) {
  if (baseVector instanceof Array) baseVector = new Vector3(...baseVector);

  useFrame(({ pointer, camera }) => {
    baseVector.set(pointer.x, pointer.y, 0);
    baseVector.unproject(camera);
    getPointerCoordsAtZ(pointerWorld, zDepth);
  });

  return baseVector;
}

interface Props {
  baseVector?: Vector3;
  zDepth: number;
}
