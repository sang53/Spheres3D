import { Canvas } from "@react-three/fiber";
import "./App.css";
import Spheres3DContainer from "./Spheres3D/Container/Spheres3DContainer";
import { SETTINGS } from "./Spheres3D/Settings";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: SETTINGS.fov }}>
      <Spheres3DContainer />
      <directionalLight color="blue" position={[0, -5, 0]} />
      <directionalLight color="purple" position={[0, 5, 0]} />
    </Canvas>
  );
}

export default App;
