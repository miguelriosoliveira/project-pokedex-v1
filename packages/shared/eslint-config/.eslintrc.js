module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks', 'prettier', 'eslint-plugin-import-helpers'],
	rules: {
		'no-unused-expressions': 'off',

		'import-helpers/order-imports': [
			'error',
			{
				newlinesBetween: 'always',
				groups: ['module', 'parent', 'sibling', 'index'],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],

		'import/prefer-default-export': 'off',

		'prettier/prettier': 'error',

		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',

		'react/jsx-indent': ['error', 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
		'react/jsx-indent-props': ['warn', 'tab'],
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
	},
};
