import { Vector3 } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils.js";

export function getXYMaxAtZ(z: number, fov: number, aspect: number) {
  const yMax = z * Math.tan(fov / 2);
  return [yMax * aspect, yMax] as const;
}

export function getRandomCoordsInView(
  zMinMax: readonly [number, number],
  fov: number,
  aspect: number
) {
  const zDepth = randFloat(zMinMax[0], zMinMax[1]);
  const [xMax, yMax] = getXYMaxAtZ(zDepth, fov, aspect);
  return [
    randFloatSpread(2 * xMax),
    randFloatSpread(2 * yMax),
    zDepth,
  ] as const;
}

export function getPointerCoordsAtZ(cursorPos: Vector3, depth: number) {
  const scale = -depth / cursorPos.z;
  cursorPos.set(cursorPos.x * scale, cursorPos.y * scale, -depth);
  return cursorPos;
}
