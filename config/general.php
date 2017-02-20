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
		'testToEmailAddress' => 'connor.baer@me.com',
		'userSessionDuration' => 'P2W',
		'siteUrl' => 'http://local.connorbaer',
	),
	'connorbaer.co' => array(
		'devMode' => false,
		'siteUrl' => 'https://connorbaer.co',
	),
];
