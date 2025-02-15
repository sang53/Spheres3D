import { Canvas } from "@react-three/fiber";
import "./App.css";
import Spheres3DContainer from "./Spheres3D/Container/Spheres3DContainer";
import { SETTINGS } from "./Spheres3D/Settings";
import CursorSpotlight from "./utils/CursorSpotlight/CursorSpotlight";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: SETTINGS.fov }}>
      <Spheres3DContainer />
      <CursorSpotlight />
      <directionalLight position={[300, 0, -100]} intensity={0.2} />
      <directionalLight position={[-300, 0, -100]} intensity={0.2} />
      <directionalLight position={[0, 300, -100]} intensity={0.2} />
      <directionalLight position={[0, -300, -100]} intensity={0.2} />
    </Canvas>
  );
}

export default App;
