import { ReactNode } from "react";
import { BackgroundContext } from "./BackgroundContext";
import { useToggle } from "../hooks/useToggle/useToggle";

export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [three, toggleThree] = useToggle("three", true, false);
  return (
    <BackgroundContext.Provider value={{ three, toggleThree }}>
      {children}
    </BackgroundContext.Provider>
  );
}
