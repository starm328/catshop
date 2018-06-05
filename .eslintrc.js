// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	// extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html',
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-tabs': 0,
		'semi': [ 0, 'always' ],
		'indent': [ 0, 'tab', ],
		'comma-spacing': [ 0, { 'before': false, 'after': true, }, ],
		'comma-dangle': [ 0, 'always', ],
		'comma-style': [ 0, 'last', ],
		'space-in-parens': [ 0, 'always', ],
		'space-before-function-paren': [ 0, 'never', ],
		'arrow-spacing': [ 0, { 'before': false, 'after': true, },
		],
	},
}
