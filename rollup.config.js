import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	plugins: [
		buble({
			target: { node: 4 }
		})
	],
	targets: [
		{ format: 'cjs', dest: 'dist/rollup-init.cjs.js' },
		{ format: 'es', dest: 'dist/rollup-init.es.js' }
	],
	external: [ 'fs', 'path', 'readline' ]
};
