import { Canvas } from "@react-three/fiber";
import Spheres3DContainer from "../Spheres3D/Container/Spheres3DContainer";
import { SETTINGS } from "../Spheres3D/Settings";
import classes from "./Background.module.css";
import { use } from "react";
import { BackgroundContext } from "../contexts/Background/BackgroundContext";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import LightsContainer from "../Spheres3D/LightsContainer/LightsContainer";

const { camera } = SETTINGS;

export default function Background() {
  const { three } = use(BackgroundContext);
  const { theme } = use(ThemeContext);

  const background = (
    <Canvas
      camera={{
        position: camera.position,
        fov: camera.fov,
        far: camera.far,
      }}
    >
      <LightsContainer darkTheme={theme === "dark"} />
      <Spheres3DContainer />
    </Canvas>
  );

  return (
    <div id="background-container" className={classes.container}>
      {three && background}
    </div>
  );
}
