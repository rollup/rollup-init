function isYes ( answer ) {
	return /^y(?:es)?$/i.test( answer );
}

export default [
	{
		question: 'Where is the project entry file?',
		help: `Your bundle is generated from the entry file – all its dependencies will be included, along with their dependencies, and so on. The entry file's exports become the bundle's exports.`,
		answer ( answer, results ) {
			results.entry = answer;
		},
		default: 'src/index.js'
	},

	{
		question: 'Generate a UMD build?',
		help: `Universal Module Definition allows your bundle to run in browsers and in Node.js, and to work with AMD module loaders`,
		answer ( answer, results ) {
			results.umd = isYes( answer );
		},
		default: 'yes'
	},

	{
		condition ( results ) {
			return results.umd === true;
		},
		question: `Place to write UMD file`,
		answer ( answer, results ) {
			results.targets.push({ format: 'umd', dest: answer });
		},
		default () {
			return this.pkg.main || `dist/${this.name}.umd.js`;
		}
	},

	{
		condition ( results ) {
			return !results.umd;
		},
		question: 'Generate a CommonJS build?',
		help: `CommonJS allows your bundle to run in Node.js`,
		answer ( answer, results ) {
			results.cjs = isYes( answer );
		},
		default: 'yes'
	},

	{
		condition ( results ) {
			return results.cjs === true;
		},
		question: `Place to write CommonJS file`,
		answer ( answer, results ) {
			results.targets.push({ format: 'cjs', dest: answer });
		},
		default () {
			return this.pkg.main || `dist/${this.name}.cjs.js`;
		}
	},

	{
		question: 'Generate an ES module build?',
		help: `Creating an ES module build allows your bundle to be easily used by other people using Rollup and other ES module bundlers`,
		answer ( answer, results ) {
			results.es = isYes( answer );
		},
		default: 'yes'
	},

	{
		condition ( results ) {
			return results.es === true;
		},
		question: `Place to write ES module file`,
		answer ( answer, results ) {
			results.targets.push({ format: 'es', dest: answer });
		},
		default () {
			return this.pkg.module || this.pkg[ 'jsnext:main' ] || `dist/${this.name}.es.js`;
		}
	}
];
