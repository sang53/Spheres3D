import { useFrame } from "@react-three/fiber";
import CursorSpotlight from "../CursorSpotlight/CursorSpotlight";
import DirectLights from "../DirectLights/DirectLights";
import { updatePointerVector } from "../Helpers/Vector3Helpers";

export default function Targets({ darkTheme }: { darkTheme: boolean }) {
  useFrame(({ pointer }) => {
    updatePointerVector(pointer);
  });
  return (
    <group>
      <mesh
        position={[0, 0, darkTheme ? 0 : -500]}
        visible={false}
        name="target"
      />
      <DirectLights depth={darkTheme ? 1 : 0} />
      {darkTheme ? <CursorSpotlight /> : <ambientLight intensity={0.1} />}
    </group>
  );
}
