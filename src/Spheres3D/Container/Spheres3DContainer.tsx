import { RootState, useFrame, useThree } from "@react-three/fiber";
import {
  getRandomColor,
  getRandomCoordsInView,
} from "../../utils/Helpers/Helpers";
import { SETTINGS } from "../Settings";
import Sphere3D from "../Sphere3D/Sphere3D";
import { useMemo } from "react";
import { PointerUpdater } from "../PointerUpdater/PointerUpdater";
import {
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
} from "three";

export default function Spheres3DContainer() {
  const { camera, viewport, scene, raycaster } = useThree<
    RootState & { camera: PerspectiveCamera }
  >();
  let hovObjs: Array<Mesh<BufferGeometry, MeshStandardMaterial>> = [];

  const spherePos = useMemo(() => {
    return Array.from({ length: SETTINGS.sphereNum }, () =>
      getRandomCoordsInView(SETTINGS.zMinMax, camera.fov, viewport.aspect)
    );
  }, [camera.fov, viewport.aspect]);

  useFrame(({ pointer }) => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects<
      Mesh<BufferGeometry, MeshStandardMaterial>
    >(scene.children, true);

    // previously hovered object not hit => reset position && colour
    hovObjs.forEach((hovObj) => {
      if (intersects.some((hitObj) => hitObj.object === hovObj)) return;

      hovObj.position.set(
        ...getRandomCoordsInView(SETTINGS.zMinMax, camera.fov, viewport.aspect)
      );
      hovObj.material.color.set(getRandomColor());
    });

    // newly hovered objects => change colour
    intersects.forEach(({ object }) => {
      object.material.color.addScalar(0.1);
    });

    // reassign array of hovered objects
    hovObjs = intersects.map(({ object }) => object);
  });

  return (
    <group>
      {spherePos.map((position, idx) => {
        return (
          <Sphere3D
            key={idx}
            initPos={position}
            initColour={getRandomColor()}
          />
        );
      })}
      <PointerUpdater zDepth={50} />
    </group>
  );
}
