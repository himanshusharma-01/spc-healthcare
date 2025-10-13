import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Allow apostrophes/quotes in JSX text content without needing HTML entities
      "react/no-unescaped-entities": "off",
      // Optional: relax this rule to avoid warnings during build; you can remove later if you prefer using next/image
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
