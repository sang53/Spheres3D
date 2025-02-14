import { Canvas } from "@react-three/fiber";
import "./App.css";
import Spheres3DContainer from "./Spheres3D/Container/Spheres3DContainer";
import { SETTINGS } from "./Spheres3D/Settings";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: SETTINGS.fov }}>
      <Spheres3DContainer />
      <ambientLight />
    </Canvas>
  );
}

export default App;
