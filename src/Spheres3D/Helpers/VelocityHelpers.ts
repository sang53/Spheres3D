import { Vector2, Vector3 } from "three";
import { SETTINGS } from "../Settings";
import { getPointerCoordsAtZ } from "./Vector3Helpers";

const difference = new Vector2();
const { mass, zAccel, friction, maxDeltaZ, minDeltaV } = SETTINGS.sphereMove;

export function updateVelocity(
  position: Vector3,
  velocity: Vector3,
  delta: number
) {
  // finds vector from sphere to pointer in 2D plane at z = sphere.z
  const pointerVector = getPointerCoordsAtZ(position.z);
  difference.subVectors(pointerVector, position);

  // uses gravitational acceleration formula
  const deltaV = (mass / difference.lengthSq()) * delta;
  const deltaZ = velocity.z >= maxDeltaZ ? 0 : zAccel;

  velocity.multiplyScalar(friction);

  // skip calculating velocity for insignificant numbers
  if (deltaV < minDeltaV) return velocity.setZ(velocity.z + deltaZ);

  // scale added velocity to deltaV & add to velocity after accounting for friction
  difference.normalize().multiplyScalar(deltaV);

  velocity.add({ x: difference.x, y: difference.y, z: deltaZ });
}
