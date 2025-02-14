import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import eslintPrettier from "eslint-config-prettier";
import reactThree from "@react-three/eslint-plugin";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: "19" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      "@react-three": reactThree,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "@react-three/no-clone-in-loop": "error",
      "@react-three/no-new-in-loop": "error",
      "react/no-unknown-property": 0,
    },
  },
  eslintPrettier
);
