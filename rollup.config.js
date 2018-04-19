export default {
	input: './do-not-zip.js',
	external: name => /^[-a-z]+$/.test(name),
	output: [
		{
			file: './dist/do-not-zip.cjs.js',
			format: 'cjs',
			sourcemap: true,
			interop: false,
		},
	],
};
