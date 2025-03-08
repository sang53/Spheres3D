import { use } from "react";
import { BackgroundContext } from "../../contexts/Background/BackgroundContext";
import classes from "./Buttons.module.css";
import { settingIcons } from "../../utils/svgIcons/svgIcons";

export default function Buttons({ theme, toggleTheme }: Props) {
  const { three, toggleThree } = use(BackgroundContext);
  return (
    <div className={classes[theme]}>
      <button onClick={toggleTheme}>
        {theme === "dark" ? settingIcons.darkTheme : settingIcons.lightTheme}
      </button>
      <button onClick={toggleThree}>
        {three ? settingIcons.orbit : settingIcons.circle}
      </button>
    </div>
  );
}

type Props = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};
