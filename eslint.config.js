import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }], 'no-console': 'off' },
  },
  { ignores: ['dist/**', 'node_modules/**'] },
];
