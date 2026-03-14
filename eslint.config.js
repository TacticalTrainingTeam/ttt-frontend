// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

/** @type {any} */
const tsExtends = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
    eslintConfigPrettier,
];

/** @type {any} */
const htmlExtends = [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility];

module.exports = defineConfig(
    {
        files: ['**/*.ts'],
        extends: tsExtends,
        processor: angular.processInlineTemplates,
        rules: {
            // Security rules
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-new-func': 'error',
            'no-script-url': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',

            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'ttt',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'ttt',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: htmlExtends,
        rules: {},
    }
);
