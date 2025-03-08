import {
  Color,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  Vector3,
} from "three";

// mesh type of Sphere3D
export type sphereType = Mesh<SphereGeometry, MeshStandardMaterial> & {
  userData: sphereUserData;
};

export type sphereUserData = {
  destColour: Color;
  velocity: Vector3;
};

// returns tuple of [T], length: N
export type Tuple<
  T,
  N extends number = 3,
  R extends T[] = []
> = R["length"] extends N ? R : Tuple<T, N, [...R, T]>;

// converts keys of literal values to keys of primitive type
export type ConstToPrimitive<T, P = number> = T extends P
  ? P
  : {
      [K in keyof T]: T[K] extends P ? P : never;
    };
