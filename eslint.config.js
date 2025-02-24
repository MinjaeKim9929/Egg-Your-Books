import globals from 'globals';
import pluginJs from '@eslint/js';
import js from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'ward',
		},
		files: ['*.js'],
	},
	pluginJs.configs.recommended,
];
