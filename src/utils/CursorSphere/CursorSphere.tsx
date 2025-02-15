import { Color, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { getPointerCoordsAtZ } from "../Helpers/Helpers";

export default function CursorSphere({
  depth = 50,
  colour = "white",
  wireframe = true,
  sphereProps = [1, 12, 5],
  visible = true,
}: Props) {
  const sphereRef = useRef<Mesh>(null);
  const cursorPos = new Vector3();
  const startState = useThree();

  useFrame(({ pointer, camera }) => {
    if (!sphereRef.current) return;

    cursorPos.set(pointer.x, pointer.y, 0);
    cursorPos.unproject(camera);
    getPointerCoordsAtZ(cursorPos, depth);

    sphereRef.current.position.set(cursorPos.x, cursorPos.y, -depth);
    if (visible) {
      sphereRef.current.rotateX(0.01);
      sphereRef.current.rotateY(0.01);
      sphereRef.current.rotateZ(0.01);
    }
  });

  return (
    <mesh
      ref={sphereRef}
      onClick={() => {
        console.log(sphereRef.current, startState);
      }}
      visible={visible}
      name="cursorSphere"
    >
      <sphereGeometry args={sphereProps} />
      <meshStandardMaterial color={colour} wireframe={wireframe} />
    </mesh>
  );
}

interface Props {
  depth?: number;
  colour?: Color;
  wireframe?: boolean;
  sphereProps?: readonly [number, number, number];
  visible?: boolean;
}
