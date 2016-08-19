import readline from 'readline';

export default function ask ( q, defaultAnswer ) {
	return new Promise( fulfil => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question( `\n${q}${defaultAnswer ? ` (${defaultAnswer})` : ''}\n> \x1b[s`, answer => {
			rl.close();

			if ( !answer ) {
				answer = defaultAnswer;
				process.stdout.write( `\x1b[u${defaultAnswer}\n` );
			}

			fulfil( answer );
		});
	});
}
