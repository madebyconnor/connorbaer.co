<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the default settings in `vendor/craftcms/cms/src/config/defaults/general.php`.
 */

return [
	'*' => array(
		'defaultWeekStartDay' => 1,
		'omitScriptNameInUrls' => true,
		'generateTransformsBeforePageLoad' => true,
	),
	'local' => array(
		'devMode' => true,
		'enableTemplateCaching' => false,
		'isSystemOn' => true,
		'testToEmailAddress' => 'connor.baer@me.com',
		'userSessionDuration' => 'P2W',
		'siteUrl' => array(
			'default' => 'http://local.madebyconnor',
			'de' => 'http://local.madebyconnorde',
		),
	),
	'madebyconnor.*' => array(
		'devMode' => false,
		'siteUrl' => array(
			'default' => 'https://madebyconnor.co/',
			'de' => 'https://madebyconnor.de/',
		),
	),
];
