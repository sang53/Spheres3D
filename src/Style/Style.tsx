import { use } from "react";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import classes from "./Style.module.css";

export default function MainPage() {
  const { theme } = use(ThemeContext);

  return <div id="main" className={classes[theme]} />;
}
