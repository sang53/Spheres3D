import { vi, afterAll, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});
