import { Group, SpotLight } from "three";
import CursorSphere from "../CursorSphere/CursorSphere";
import { useEffect, useRef } from "react";
import { SETTINGS } from "../Settings";
import { ConstToPrimitive } from "../Types";

const { cursorSpot } = SETTINGS;

export default function CursorSpotlight({
  colour = cursorSpot.colour,
  intensity = cursorSpot.intensity,
  angle = cursorSpot.angle,
  penumbra = cursorSpot.penumbra,
  decay = cursorSpot.decay,
  distance = cursorSpot.distance,
}: Props = {}) {
  const spotlightRef = useRef<SpotLight>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (!groupRef.current || !spotlightRef.current) return;

    // make spotlight target the cursorSphere & therefore pointer
    const cursorSphere = groupRef.current.getObjectByName("cursorSphere");
    if (!cursorSphere) throw new Error("Cursor Sphere Not Found");
    spotlightRef.current.target = cursorSphere;

    // set close to camera to avoid parallax
    spotlightRef.current.position.set(0, 0, -1);
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
        distance={distance}
        ref={spotlightRef}
      />
    </group>
  );
}

type Props = Partial<ConstToPrimitive<typeof cursorSpot>>;
