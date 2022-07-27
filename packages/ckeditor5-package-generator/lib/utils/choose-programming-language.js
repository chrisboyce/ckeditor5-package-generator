/**
 * @license Copyright (c) 2020-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const { prompt } = require( 'inquirer' );

const PROGRAMMING_LANGUAGES = {
	JavaScript: 'js',
	TypeScript: 'ts'
};

/**
 * Chooses programming language. If --lang option us used, and it has valid value, that is returned.
 * Otherwise, ask user to choose from available programming languages.
 *
 * @param {Logger} logger
 * @param {CKeditor5PackageGeneratorOptions} options
 * @returns {string}
 */
module.exports = async function chooseProgrammingLanguage( logger, options ) {
	if ( options.lang ) {
		const langShorthands = Object.values( PROGRAMMING_LANGUAGES );

		if ( langShorthands.includes( options.lang ) ) {
			return options.lang;
		}

		logger.error( `--lang option has to be one of: ${ langShorthands.join( ', ' ) }. Falling back to manual choice.` );
	}

	const { programmingLanguage } = await prompt( [ {
		prefix: '📍',
		name: 'programmingLanguage',
		message: 'Choose your programming language:',
		type: 'list',
		choices: Object.keys( PROGRAMMING_LANGUAGES )
	} ] );

	// Full name to shorthand: "JavaScript" => "js"
	return PROGRAMMING_LANGUAGES[ programmingLanguage ];
};
