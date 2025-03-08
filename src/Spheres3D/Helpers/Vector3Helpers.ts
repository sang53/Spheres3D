import {
  Frustum,
  Matrix4,
  Object3D,
  PerspectiveCamera,
  Vector2,
  Vector3,
} from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils.js";
import { sphereType } from "../Types";
import { getRandomColor } from "./ColourHelpers";
import { SETTINGS } from "../Settings";

let camera: PerspectiveCamera | undefined;
const cameraFrustum = new Frustum();
const cameraMatrix = new Matrix4();

const pointerVector = new Vector3();
const boundsVector = new Vector3();

const [zMin, zMax] = SETTINGS.sphereReset.zMinMax;
const [zMinInit, zMaxInit] = SETTINGS.sphereGen.zMinMax;

export function initVectorHelpers(initCam: PerspectiveCamera) {
  if (camera) return;
  camera = initCam;
  cameraMatrix.identity().multiply(camera.projectionMatrix);
  cameraFrustum.setFromProjectionMatrix(cameraMatrix);
}

export function resetCamera() {
  camera = undefined;
}

// updates current pointer position into world coordinates
export function updatePointerVector(pointer: Vector2) {
  if (!camera) throw new Error("Camera not initialised");
  pointerVector.set(pointer.x, pointer.y, 0);
  pointerVector.unproject(camera);
}

// converts pointer normalised coordinates to world coordinates at z
export function getPointerCoordsAtZ(z: number) {
  return pointerVector.multiplyScalar(z / pointerVector.z);
}

export function checkInBounds(object: Object3D) {
  if (!camera) throw new Error("Camera not set");

  return cameraFrustum.intersectsObject(object);
}

// gets random coordinates within frustum in world coordinates
export function getRandomInBounds(
  zMin: number = zMinInit,
  zMax: number = zMaxInit
) {
  if (!camera) throw new Error("Camera not set");
  if (zMin < 0.1 || zMax < 0.1 || zMax < zMin)
    throw new Error("z min/max not set correctly");
  boundsVector.set(
    randFloatSpread(2),
    randFloatSpread(2),
    randFloat(getNormZ(zMin), getNormZ(zMax))
  );
  boundsVector.unproject(camera);
  return [boundsVector.x, boundsVector.y, boundsVector.z] as const;
}

// resets sphere position, colour & velocity
export function resetSphere(sphereMesh: sphereType) {
  sphereMesh.position.set(...getRandomInBounds(zMin, zMax));
  sphereMesh.material.color.set(getRandomColor());
  sphereMesh.userData.velocity.set(0, 0, 0);
}

// gets normalised z coordinates (assumes camera is at [0, 0, 0] with no rotation)
function getNormZ(zDepth: number) {
  if (zDepth <= 0) throw new Error("z depth must be a positive value");
  return (1000.1 - 200 / zDepth) / 999.9;
}
