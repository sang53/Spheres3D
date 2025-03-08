import { memo, useState } from "react";
import classes from "./Navbar.module.css";

export default memo(NavBar);

const { active, inactive } = classes;

function NavBar() {
  const [bg, setBg] = useState("sphere3d");

  return (
    <nav className={classes.navBar}>
      <a draggable="false" className={bg === "sphere3d" ? active : inactive}>
        Spheres3D
      </a>
    </nav>
  );
}
