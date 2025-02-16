import { RootState, useFrame, useThree } from "@react-three/fiber";
import {
  getRandomColor,
  getRandomCoordsInView,
} from "../../utils/Helpers/Helpers";
import { SETTINGS } from "../Settings";
import Sphere3D from "../Sphere3D/Sphere3D";
import { useRef } from "react";
import { Color, Group, PerspectiveCamera } from "three";
import { sphereType } from "../Types";

const { sphereGen, sphereAnim } = SETTINGS;

export default function Spheres3DContainer() {
  const { camera, viewport, raycaster } = useThree<
    RootState & { camera: PerspectiveCamera }
  >();
  const groupRef = useRef<Group>(null);
  let hovObjs: Array<sphereType> = [];

  const spherePos = Array.from({ length: sphereGen.num }, () =>
    getRandomCoordsInView(sphereGen.zMinMax, camera.fov, viewport.aspect)
  );

  useFrame(({ pointer, viewport }) => {
    if (!groupRef.current) return;

    // get all objects that intersects with pointer
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects<sphereType>(
      groupRef.current.children,
      true
    );

    // previously hovered object not hit => reset position && colour
    hovObjs.forEach((hovObj) => {
      if (intersects.some((hitObj) => hitObj.object === hovObj)) return;

      // if previously hovered object not hovered anymore => reset position & colour
      hovObj.position.set(
        ...getRandomCoordsInView(sphereGen.zMinMax, camera.fov, viewport.aspect)
      );
      hovObj.material.color.set(getRandomColor());
    });

    // all hovered objects => speed up colour change
    intersects.forEach(({ object }) => {
      if (object.userData.destColour instanceof Color)
        object.material.color.lerp(
          object.userData.destColour,
          sphereAnim.colourLerp
        );
    });

    // reassign array of hovered objects for next frame
    hovObjs = intersects.map(({ object }) => object);
  });

  return (
    <group ref={groupRef}>
      {spherePos.map((position, idx) => {
        return (
          <Sphere3D
            key={idx}
            initPos={position}
            initColour={getRandomColor()}
          />
        );
      })}
    </group>
  );
}
