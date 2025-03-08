import { createContext } from "react";

interface BackgroundContext {
  three: boolean;
  toggleThree: () => void;
}

export const BackgroundContext = createContext<BackgroundContext>({
  three: true,
  toggleThree: () => undefined,
});
