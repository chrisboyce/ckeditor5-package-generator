#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

const validateNpmPackageName = require( 'validate-npm-package-name' );

/**
  * @param {String} directory
  */
module.exports = function validatePackageName( directory ) {
	const validateResult = validateNpmPackageName( directory );

	if ( !validateResult.validForNewPackages ) {
		console.log( 'Provided <packageName> is not valid name for a npm package.' );

		for ( const error of ( validateResult.errors || [] ) ) {
			console.log( '  * ' + error );
		}

		for ( const warning of ( validateResult.warnings || [] ) ) {
			console.log( '  * ' + warning );
		}

		return false;
	}

	if ( !directory.match( /^ckeditor5-./ ) ) {
		console.log( 'Package name should follow the "ckeditor5-" prefix.' );
		return false;
	}

	return true;
};
