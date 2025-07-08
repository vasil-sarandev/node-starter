import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  // Base JS/TS support
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      js,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // JSON support
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    rules: {
      'json/no-empty-keys': 'warn', // downgrade this to warning - new npm structure has an empty key for project root in package-lokc.json
    },
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  // CSS support
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },

  // Prettier integration
  eslintPluginPrettierRecommended,
]);
