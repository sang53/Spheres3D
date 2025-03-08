import { render, screen } from "@testing-library/react";
import { useToggle } from "./useToggle";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

type validVal = "light" | "dark" | boolean;

function HookComponent({
  defVal,
  otherVal,
}: {
  defVal: validVal;
  otherVal: validVal;
}) {
  const [curr, toggleCurr] = useToggle("key", defVal, otherVal);

  return (
    <div>
      <div data-testid="hook">
        {typeof curr === "string" ? curr : JSON.stringify(curr)}
      </div>
      <button onClick={toggleCurr}>Button</button>
    </div>
  );
}

function setupTest(
  defVal: validVal,
  otherVal: validVal,
  storedVal: string | null = null
) {
  const mockGetItem = vi
    .spyOn(localStorage, "getItem")
    .mockImplementation(() => storedVal);
  const mockSetItem = vi
    .spyOn(localStorage, "setItem")
    .mockImplementation(() => undefined);
  render(<HookComponent defVal={defVal} otherVal={otherVal} />);
  const user = userEvent.setup();
  return { mockGetItem, mockSetItem, user };
}

describe("initial value set correctly", () => {
  test.for([
    { def: true, other: false, expected: true },

    { def: "light", other: "dark", expected: "light" } as const,
  ])("default: $def, other: $other", ({ def, other, expected }) => {
    const { mockGetItem } = setupTest(def, other);
    expect(screen.getByTestId("hook")).toHaveTextContent(String(expected));
    expect(mockGetItem).toHaveBeenCalledExactlyOnceWith("key");
  });
  test.for([
    { def: false, other: true, stored: String(true), expected: true },
    { def: false, other: true, stored: String(false), expected: false },
    {
      def: "dark",
      other: "light",
      stored: JSON.stringify("dark"),
      expected: "dark",
    } as const,
  ])(
    "default: $def, other: $other, stored: $stored",
    ({ def, other, stored, expected }) => {
      const { mockGetItem } = setupTest(def, other, stored);
      expect(screen.getByTestId("hook")).toHaveTextContent(String(expected));
      expect(mockGetItem).toHaveBeenCalledExactlyOnceWith("key");
    }
  );
});

describe("toggle value correctly", () => {
  test.for([
    { def: true, other: false },
    { def: "light", other: "dark" } as const,
  ])("toggles value between $def & $other", async ({ def, other }) => {
    const { user } = setupTest(def, other);
    expect(screen.getByTestId("hook")).toHaveTextContent(String(def));
    await user.click(screen.getByRole("button"));
    expect(screen.getByTestId("hook")).toHaveTextContent(String(other));
    await user.click(screen.getByRole("button"));
    expect(screen.getByTestId("hook")).toHaveTextContent(String(def));
  });
});

describe("sets local storage", () => {
  test.for([
    { def: true, other: false },
    { def: "light", other: "dark" } as const,
  ])("saves $other", async ({ def, other }) => {
    const { user, mockSetItem } = setupTest(def, other);
    await user.click(screen.getByRole("button"));
    expect(mockSetItem).toHaveBeenCalledExactlyOnceWith(
      "key",
      JSON.stringify(other)
    );
  });
});
