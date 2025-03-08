import { Vector3 } from "three";
import { SETTINGS } from "../Settings";
import { ConstToPrimitive } from "../Types";
import { useThree } from "@react-three/fiber";

const { directLights } = SETTINGS;

export default function DirectLights({
  intensity = directLights.intensity,
  depth,
}: Props) {
  const { camera, scene } = useThree();
  const target = scene.getObjectByName("target");
  return (
    <group>
      {Array.from({ length: 4 }, (_v, k) => {
        const position = new Vector3(
          k < 2 ? 1 : -1,
          k % 2 === 0 ? 1 : -1,
          depth
        ).unproject(camera);
        return (
          <directionalLight
            key={k}
            position={position}
            intensity={intensity}
            target={target}
          />
        );
      })}
    </group>
  );
}

type Props = Partial<ConstToPrimitive<typeof directLights>> & { depth: number };
