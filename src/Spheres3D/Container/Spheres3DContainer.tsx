import { useThree } from "@react-three/fiber";
import CursorSphere from "../../utils/CursorSphere/CursorSphere";
import { getRandomCoordsInView } from "../../utils/Helpers/Helpers";
import { SETTINGS } from "../Settings";
import Sphere3D from "../Sphere3D/Sphere3D";
import { useMemo } from "react";

export default function Spheres3DContainer() {
  const { camera, viewport } = useThree();

  const spherePos = useMemo(() => {
    return Array.from({ length: SETTINGS.sphereNum }, () =>
      getRandomCoordsInView(SETTINGS.zMinMax, camera.fov, viewport.aspect)
    );
  }, [camera.fov, viewport.aspect]);

  return (
    <group>
      {spherePos.map((position, idx) => {
        return <Sphere3D key={idx} initPos={position} initColour="white" />;
      })}
      <CursorSphere />
    </group>
  );
}
