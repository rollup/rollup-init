import { statSync } from 'fs';
import { dirname, join } from 'path';

export default function findDirWithPkg ( dir ) {
	try {
		statSync( join( dir, 'package.json' ) );
		return dir;
	} catch ( err ) {
		const parent = dirname( dir );

		if ( dir === parent ) return null; // we've hit root
		return findDirWithPkg( parent );
	}
}
