import { useReducer } from "react";

export function useToggle<T extends validValues>(
  key: string,
  defaultVal: T,
  otherVal: T
) {
  // use stored value if exists => otherwise use default value
  const storedVal = localStorage.getItem(key);
  const initVal = storedVal ? (JSON.parse(storedVal) as T) : defaultVal;

  // toggle between default & other values & saves current choice into local storage
  const toggleAndSave = (state: T) => {
    const newVal = state === defaultVal ? otherVal : defaultVal;
    localStorage.setItem(key, JSON.stringify(newVal));
    return newVal;
  };

  // state & reducer to use as context
  const [curr, toggleCurr] = useReducer<T, []>(toggleAndSave, initVal);
  return [curr, toggleCurr] as const;
}

type validValues = "light" | "dark" | boolean;
