import { Canvas } from "@react-three/fiber";
import "./App.css";
import Spheres3DContainer from "./Spheres3D/Container/Spheres3DContainer";
import { SETTINGS } from "./Spheres3D/Settings";
import CursorSpotlight from "./utils/CursorSpotlight/CursorSpotlight";
import DirectLights from "./Spheres3D/DirectLights/DirectLights";

const { camera } = SETTINGS;

function App() {
  return (
    <Canvas camera={{ position: camera.position, fov: camera.fov }}>
      <Spheres3DContainer />
      <CursorSpotlight />
      <DirectLights />
    </Canvas>
  );
}

export default App;
