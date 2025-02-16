import { useFrame, useThree } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { useRef } from "react";
import { Color, PerspectiveCamera } from "three";
import {
  getHexDiff,
  getRandomColor,
  getRandomCoordsInView,
  pointerWorld,
} from "../../utils/Helpers/Helpers";
import { damp3, dampC } from "maath/easing";
import { sphereType, Tuple } from "../Types";

const { sphereGen, sphereAnim, sphereMove } = SETTINGS;

export default function Sphere3D({
  initPos,
  initColour,
  sphereProps = sphereGen.sphereProps,
  wireframe = sphereGen.wireframe,
}: Props) {
  const sphereRef = useRef<sphereType>(null);
  const camera = useThree<PerspectiveCamera>();

  useFrame(({ viewport }, delta) => {
    // make sure spheres are typed correctly
    if (!sphereRef.current) return;
    const sphereMesh = sphereRef.current;

    // if sphere is too close to screen => reset position & colour
    if (sphereMesh.position.z >= sphereGen.zMinMax[0]) {
      sphereMesh.position.set(
        ...getRandomCoordsInView(sphereGen.zMinMax, camera.fov, viewport.aspect)
      );
      sphereMesh.material.color.set(getRandomColor());
      return;
    }

    // move sphere closer to cursor
    damp3(
      sphereMesh.position,
      pointerWorld,
      sphereMove.posDamp,
      delta,
      sphereMove.maxSpeed
    );

    // rotate sphere
    sphereMesh.rotateX(Math.random() * sphereAnim.rotateFactor);
    sphereMesh.rotateY(Math.random() * sphereAnim.rotateFactor);
    sphereMesh.rotateZ(Math.random() * sphereAnim.rotateFactor);

    // animate colour
    dampC(
      sphereMesh.material.color,
      sphereMesh.userData.destColour,
      sphereAnim.colourDamp,
      delta
    );

    // if close to border, change appearance to show that it is going to disappear soon
    if (sphereMesh.position.z >= sphereGen.zMinMax[0] - sphereMove.proxThresh)
      sphereMesh.material.color.lerp(
        sphereMesh.userData.destColour,
        sphereAnim.colourLerp
      );

    // set new colour destination if previous destination reached
    if (
      getHexDiff(sphereMesh.material.color, sphereMesh.userData.destColour) <
      sphereAnim.colourThresh
    )
      sphereMesh.userData.destColour = getRandomColor();
  });

  return (
    <mesh
      position={initPos}
      ref={sphereRef}
      userData={{ destColour: initColour }}
    >
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial color={getRandomColor()} wireframe={wireframe} />
    </mesh>
  );
}

interface Props {
  initPos: Readonly<Tuple<number>>;
  initColour: Color;
  sphereProps?: Readonly<Tuple<number>>;
  wireframe?: boolean;
}
