import { useFrame } from "@react-three/fiber";
import { SETTINGS } from "../Settings";
import { sphereType } from "../Types";
import Sphere3D from "../Sphere3D/Sphere3D";
import { useContainerHook } from "./useContainerHook";
import { resetSphere } from "../Helpers/Vector3Helpers";
import { memo, useMemo } from "react";

const { sphereGen } = SETTINGS;

export default memo(Spheres3DContainer);
function Spheres3DContainer() {
  const [raycaster, groupRef] = useContainerHook();

  // memoise sphere to prevent re-render on theme toggle
  const spheres = useMemo(() => {
    return Array.from({ length: sphereGen.num }, (_v, idx) => {
      return <Sphere3D key={idx} />;
    });
  }, []);

  useFrame(({ pointer, camera }) => {
    if (!groupRef.current) return;

    // get all objects that intersects with pointer
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects<sphereType>(
      groupRef.current.children,
      true
    );

    // reset all spheres that are hovered
    intersects.forEach(({ object }) => {
      resetSphere(object);
    });
  });

  return <group ref={groupRef}>{spheres}</group>;
}
