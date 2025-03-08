import { useFrame } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { useRef } from "react";
import { Vector3 } from "three";
import { updateVelocity } from "../Helpers/VelocityHelpers";
import { sphereType, sphereUserData, Tuple } from "../Types";
import { getHexDiff, getRandomColor } from "../Helpers/ColourHelpers";
import {
  checkInBounds,
  getRandomInBounds,
  resetSphere,
} from "../Helpers/Vector3Helpers";
import { dampC } from "maath/easing";

const { sphereGen, sphereAnim, sphereReset } = SETTINGS;

export default function Sphere3D({
  sphereProps = sphereGen.sphereProps,
}: Props) {
  const sphereRef = useRef<sphereType>(null);
  const initUserData: sphereUserData = {
    destColour: getRandomColor(),
    velocity: new Vector3(),
  };

  useFrame((_state, delta) => {
    // make sure spheres are typed correctly
    if (!sphereRef.current) return;
    const sphereMesh = sphereRef.current;

    calcPosition(sphereMesh, delta);
    animateSphere(sphereMesh, delta);
  });

  return (
    <mesh
      position={getRandomInBounds()}
      ref={sphereRef}
      userData={initUserData}
      frustumCulled={false}
    >
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial color={getRandomColor()} wireframe />
    </mesh>
  );
}

function calcPosition(sphereMesh: sphereType, delta: number) {
  // reset position if out of frustum
  if (!checkInBounds(sphereMesh)) resetSphere(sphereMesh);

  // move sphere closer to cursor
  updateVelocity(sphereMesh.position, sphereMesh.userData.velocity, delta);
  sphereMesh.position.add(sphereMesh.userData.velocity);

  // if sphere is too close to screen => reset position & colour, invert velocity for bounce effect
  if (sphereMesh.position.z >= sphereReset.zMin) resetSphere(sphereMesh);
}

function animateSphere(sphereMesh: sphereType, delta: number) {
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
  if (sphereMesh.position.z >= sphereReset.zMin - sphereReset.proxThresh)
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
}

interface Props {
  sphereProps?: Readonly<Tuple<number>>;
  wireframe?: boolean;
}
