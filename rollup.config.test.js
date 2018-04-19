import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
	input: `./test/test.browser.js`,
	output: [
		{
			format: `iife`,
			name: `tests`,
		},
	],
	plugins: [
		nodeResolve(),
		commonjs(),
	],
}
