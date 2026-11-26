import globals from "globals";
import eslint from "@eslint/js";
import neostandard from "neostandard";
import vitest from "@vitest/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  globalIgnores(["*/generated/**/*.[jt]s"]),
  ...neostandard({ noStyle: true }),
  pluginPromise.configs["flat/recommended"],
  nodePlugin.configs["flat/recommended-module"],
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      // emulate exempting _prefixed from the unused var rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ...vitest.configs.recommended,
    files: ["**/*.spec.[jt]s", "**/*.test.[jt]s"],
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/expect-expect": [
        "error",
        {
          assertFunctionNames: ["expect", "expectTemplate.*"],
        },
      ],
    },
  },
  { languageOptions: { globals: globals.node } },
  {
    // TS catches unused imports, and n flags false positives
    files: ["**/*.ts"],
    rules: {
      "n/no-extraneous-import": "off",
    },
  },
  { ignores: ["**/generated/**"] },
);
