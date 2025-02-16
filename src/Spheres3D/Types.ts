import { Color, Mesh, MeshStandardMaterial, SphereGeometry } from "three";

// mesh type of Sphere3D
export type sphereType = Mesh<SphereGeometry, MeshStandardMaterial> & {
  userData: { destColour: Color };
};

// returns tuple of [T], length: N
export type Tuple<
  T,
  N extends number = 3,
  R extends T[] = []
> = R["length"] extends N ? R : Tuple<T, N, [...R, T]>;

// converts keys of literal type to keys of primitive type
export type ConstToPrimitive<T, P = number> = T extends P
  ? P
  : {
      [K in keyof T]: T[K] extends P ? P : never;
    };
