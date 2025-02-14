import { useFrame, ReactThreeFiber, useThree } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { useRef } from "react";
import { BufferGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import {
  getRandomColor,
  getRandomCoordsInView,
  pointerWorld,
} from "../../utils/Helpers/Helpers";
import { damp3 } from "maath/easing";

export default function Sphere3D({
  initPos,
  initColour,
  sphereProps = SETTINGS.sphereProps,
  wireframe = true,
}: Props) {
  const sphereRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null);
  const aspect = useThree((state) => state.viewport.aspect);

  useFrame((_state, delta) => {
    if (!sphereRef.current) return;
    const sphereMesh = sphereRef.current;

    if (sphereMesh.position.z >= SETTINGS.zMinMax[0]) {
      // case: sphere is too close to screen => reset position
      sphereMesh.position.set(
        ...getRandomCoordsInView(SETTINGS.zMinMax, SETTINGS.fov, aspect)
      );
      sphereMesh.material.color.set(getRandomColor());
    } else {
      damp3(sphereMesh.position, pointerWorld, 50, delta, 2);

      // case: sphere is getting closer to screen => change appearance to show it will disappear soon

      sphereMesh.material.color.lerp(initColour, 0.05);
      if (
        Math.abs(sphereMesh.material.color.getHex() - initColour.getHex()) < 10
      )
        initColour = getRandomColor();
      sphereMesh.rotateX(0.01);
      sphereMesh.rotateY(0.01);
      sphereMesh.rotateZ(0.01);
    }
  });

  return (
    <mesh position={initPos} ref={sphereRef}>
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial color={getRandomColor()} wireframe={wireframe} />
    </mesh>
  );
}

interface Props {
  initPos: ReactThreeFiber.Vector3 | readonly [number, number, number];
  initColour: Color;
  sphereProps?: readonly [number, number, number];
  wireframe?: boolean;
}
