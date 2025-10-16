// // For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from "eslint-plugin-storybook";

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
//   ignores: [
//     "node_modules/**",
//     ".next/**",
//     "out/**",
//     "build/**",
//     "next-env.d.ts",
//   ],
// }, ...storybook.configs["flat/recommended"]];

// export default eslintConfig;
// ESLint config for Next.js + Deno Edge Functions + Storybook
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import storybook from 'eslint-plugin-storybook'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  // Next.js & TypeScript (keep for main app)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Ignore build/output folders and Supabase Edge Functions
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'supabase/functions/**', // Ignore Deno/Edge Functions to avoid ESLint conflicts
    ],
  },

  // Storybook recommended rules
  ...storybook.configs['flat/recommended'],
]

export default eslintConfig
