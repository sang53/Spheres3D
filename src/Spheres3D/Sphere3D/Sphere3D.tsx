import { useFrame, ReactThreeFiber, useThree } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { useRef } from "react";
import { BufferGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import {
  getRandomColor,
  getRandomCoordsInView,
  pointerWorld,
} from "../../utils/Helpers/Helpers";
import { damp3, dampC } from "maath/easing";

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

      dampC(
        sphereMesh.material.color,
        sphereMesh.userData.destColour,
        0.2,
        delta
      );
      if (
        Math.abs(
          sphereMesh.material.color.getHex() -
            sphereMesh.userData.destColour.getHex()
        ) < 10 ||
        sphereMesh.material.color.getHex() > 0xfefefe
      )
        sphereMesh.userData.destColour = getRandomColor();
      sphereMesh.rotateX(Math.random() / 50);
      sphereMesh.rotateY(Math.random() / 50);
      sphereMesh.rotateZ(Math.random() / 50);

      // if close to border, change appearance to show that it is going to disappear soon
      if (sphereMesh.position.z >= SETTINGS.zMinMax[0] - 50) {
        sphereMesh.material.color.lerp(sphereMesh.userData.destColour, 0.1);
      }
    }
  });

  return (
    <mesh
      position={initPos}
      ref={sphereRef}
      userData={{ destColour: initColour }}
      name="sphere"
    >
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
