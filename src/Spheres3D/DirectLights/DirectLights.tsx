import { SETTINGS } from "../Settings";
import { ConstToPrimitive } from "../Types";

const { directLights } = SETTINGS;

export default function DirectLights({
  posOffset = directLights.posOffset,
  zDepth = directLights.zDepth,
  intensity = directLights.intensity,
}: Props = {}) {
  return (
    <group>
      <directionalLight
        position={[posOffset, 0, -zDepth]}
        intensity={intensity}
      />
      <directionalLight
        position={[-posOffset, 0, -zDepth]}
        intensity={intensity}
      />
      <directionalLight
        position={[0, posOffset, -zDepth]}
        intensity={intensity}
      />
      <directionalLight
        position={[0, -posOffset, -zDepth]}
        intensity={intensity}
      />
    </group>
  );
}

type Props = Partial<ConstToPrimitive<typeof directLights>>;
