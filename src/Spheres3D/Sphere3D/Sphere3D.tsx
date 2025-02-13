import { useFrame, ReactThreeFiber } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { getPointerCoordsAtZ } from "../../utils/Helpers/Helpers";

let pointerWorld = new Vector3();

function PointerUpdater() {
  useFrame(({ pointer, camera }) => {
    console.log("here");
    pointerWorld.set(pointer.x, pointer.y, 0);
    pointerWorld.unproject(camera);
    getPointerCoordsAtZ(pointerWorld, 50);
  });
  return null;
}

export default function Sphere3D({
  initPos,
  initColour = "white",
  sphereProps = SETTINGS.sphereProps,
}: Props) {
  const sphereRef = useRef<Mesh>(null);
  useFrame(() => {
    if (!sphereRef.current) return;

    sphereRef.current.position.lerp(pointerWorld, 0.00001);
  });

  return (
    <mesh position={initPos} ref={sphereRef}>
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial color={initColour} />
      <PointerUpdater />
    </mesh>
  );
}

interface Props {
  initPos: ReactThreeFiber.Vector3;
  initColour?: ReactThreeFiber.Color;
  sphereProps?: readonly [number, number, number];
}
