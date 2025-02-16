import { Color, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { getPointerCoordsAtZ, pointerWorld } from "../Helpers/Helpers";
import { SETTINGS } from "../../Spheres3D/Settings";
import { sphereType, Tuple } from "../../Spheres3D/Types";

export default function CursorSphere({
  depth = SETTINGS.sphereMove.zDepthFocus,
  sphereProps = SETTINGS.sphereGen.sphereProps,
}: Props) {
  const sphereRef = useRef<sphereType>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;

    // update pointerWorld Vector3 to line up with pointer at z = -depth
    getPointerCoordsAtZ(state, pointerWorld, depth);
    sphereRef.current.position.set(pointerWorld.x, pointerWorld.y, -depth);
  });

  return (
    <mesh ref={sphereRef} visible={false} name="cursorSphere">
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial />
    </mesh>
  );
}

interface Props {
  depth?: number;
  colour?: Color;
  wireframe?: boolean;
  sphereProps?: Readonly<Tuple<number>>;
  visible?: boolean;
}
