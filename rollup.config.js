export default {
	input: './src/index.js',
	output: [
		{
			file: './dist/index.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
	],
};
