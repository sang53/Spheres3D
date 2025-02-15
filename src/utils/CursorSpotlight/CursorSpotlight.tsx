import { Group, SpotLight } from "three";
import CursorSphere from "../CursorSphere/CursorSphere";
import { useEffect, useRef } from "react";
import { ReactThreeFiber } from "@react-three/fiber";

export default function CursorSpotlight({
  colour = 0xffffff,
  intensity = 20000,
  angle = 0.3,
  penumbra = 1,
  decay = 2,
}: Props) {
  const spotlightRef = useRef<SpotLight>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current && spotlightRef.current) {
      spotlightRef.current.target =
        groupRef.current.getObjectByName("cursorSphere");
      spotlightRef.current.position.set(0, 0, -1);
    }
  }, []);

  return (
    <group ref={groupRef}>
      <CursorSphere visible={false} />
      <spotLight
        color={colour}
        intensity={intensity}
        angle={angle}
        penumbra={penumbra}
        decay={decay}
        distance={0}
        ref={spotlightRef}
      />
    </group>
  );
}

interface Props {
  colour?: ReactThreeFiber.Color;
  intensity?: number;
  angle?: number;
  penumbra?: number;
  decay?: number;
}
