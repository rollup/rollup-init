/*global process */
import { basename, join, resolve } from 'path';
import findDirWithPkg from './utils/findDirWithPkg.js';
import ask from './utils/ask.js';
import assign from './utils/assign.js';
import prompts from './prompts.js';

export default function init ( dir ) {
	dir = findDirWithPkg( dir );

	if ( !dir ) {
		console.error( `Could not find package.json. Please create one before running \`rollup init\`` ); // eslint-disable-line no-console
		process.exit( 1 );
	}

	const pkg = require( join( dir, 'package.json' ) );
	const name = pkg.name || basename( dir );

	console.error( `setting up Rollup for ${name}` ); // eslint-disable-line no-console

	const globalContext = {
		name,
		pkg,
		prompts
	};

	const results = {
		targets: []
	};

	function next () {
		const prompt = prompts.shift();
		if ( !prompt ) {
			// we're done!
			finish( results );
			return;
		}

		if ( prompt.condition && !prompt.condition( results ) ) {
			next();
			return;
		}

		const defaultAnswer = typeof prompt.default === 'function' ? prompt.default.call( assign( {}, globalContext ) ) : prompt.default;

		ask( prompt.question, defaultAnswer )
			.then( answer => {
				const context = assign( { default: defaultAnswer }, globalContext );
				prompt.answer.call( context, answer || prompt.default, results, prompts );

				next();
			});
	}

	next();
}

function finish ( results ) {
	console.log( `finishing!` )
	console.log( results )
}
