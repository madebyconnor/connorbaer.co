<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the default settings in `vendor/craftcms/cms/src/config/defaults/general.php`.
 */


return [
	'*' => array(
		'devMode' => false,
		'defaultWeekStartDay' => 1,
		'omitScriptNameInUrls' => true,
		'generateTransformsBeforePageLoad' => true,
		'baseUrl'  => 'https://madebyconnor.co/',
		'siteUrl' => array(
			'madebyconnor' => 'https://madebyconnor.co/',
			'de' => 'https://madebyconnor.de/',
		),
	),
	'.dev' => array(
		'devMode' => true,
		'enableTemplateCaching' => false,
		'isSystemOn' => true,
		'testToEmailAddress' => 'connor.baer@me.com',
		'userSessionDuration' => 'P2W',
		'baseUrl'  => 'https://madebyconnor.dev/',
		'siteUrl' => array(
			'madebyconnor' => 'https://madebyconnor.dev',
			'de' => 'https://madebyconnor-de.dev',
		),
	),
];
