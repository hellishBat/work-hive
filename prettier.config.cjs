module.exports = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-css-order',
  ],
  importOrder: [
    '<BUILTIN_MODULES>',
    '^react(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  cssDeclarationSorterOrder: 'concentric-css',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
}
