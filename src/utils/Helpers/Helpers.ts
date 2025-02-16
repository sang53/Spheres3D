import { Color, Vector3 } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils.js";
import { Tuple } from "../../Spheres3D/Types";
import { RootState } from "@react-three/fiber";

export function getXYMaxAtZ(z: number, fov: number, aspect: number) {
  const yMax = z * Math.tan(fov / 2);
  return [yMax * aspect, yMax] as const;
}

export function getRandomCoordsInView(
  zMinMax: Readonly<Tuple<number, 2>>,
  fov: number,
  aspect: number
): Tuple<number> {
  const zDepth = randFloat(zMinMax[0], zMinMax[1]);
  const [xMax, yMax] = getXYMaxAtZ(zDepth, fov, aspect);
  return [randFloatSpread(2 * xMax), randFloatSpread(2 * yMax), zDepth];
}

// converts pointer normalised coordinates to world coordinates at specific z depth
export function getPointerCoordsAtZ(
  state: RootState,
  cursorPos: Vector3,
  depth: number
) {
  const { pointer, camera } = state;
  cursorPos.set(pointer.x, pointer.y, 0);
  cursorPos.unproject(camera);
  const scale = -depth / cursorPos.z;
  cursorPos.set(cursorPos.x * scale, cursorPos.y * scale, -depth);
  return cursorPos;
}

// Vector3 for re-use for getPointerCoordsAtZ()
export const pointerWorld = new Vector3();

export function getRandomColor() {
  return new Color(Math.random(), Math.random(), Math.random());
}

export function getHexDiff(colour1: Color, colour2: Color) {
  return Math.abs(colour1.getHex() - colour2.getHex());
}
