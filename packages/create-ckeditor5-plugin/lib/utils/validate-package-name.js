/**
 * @license Copyright (c) 2020-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/**
 * Checks if the package name is valid for npm package, and if it follows the "@scope/ckeditor5-name" format.
 *
 * Returns a string containing the validation error, or `null` if no errors were found.
 *
 * @param {String} packageName
 * @returns {String|null}
 */
module.exports = function validatePackageName( packageName ) {
	const match = packageName.match( /^@([^/]+)\/ckeditor5-([^/]+)$/ );

	// NPM does not allow names longer than 214 characters (some legacy packages still can be longer)
	if ( packageName.length > 214 ) {
		return 'Name can not be longer than 214 characters.';
	}

	// Packages generated by the tool are required to follow the @scope/ckeditor5-name pattern
	if ( !match ) {
		return 'Name has to follow the correct pattern.';
	}

	// encodeURIComponent() will escape majority of characters not allowed for NPM package
	if ( match[ 1 ] !== encodeURIComponent( match[ 1 ] ) ||
		match[ 2 ] !== encodeURIComponent( match[ 2 ] ) ) {
		return 'Name contains invalid characters.';
	}

	// Characters ~'!()* are the only ones that will not be escaped by encodeURIComponent(), but are still not allowed for NPM package
	if ( /[~'!()*]/.test( packageName ) ) {
		return 'Name contains invalid characters.';
	}

	// NPM does not allow new packages to contain capital letters (some legacy packages still can contain them)
	if ( /[A-Z]/.test( packageName ) ) {
		return 'Capital letters are not allowed.';
	}

	return null;
};
