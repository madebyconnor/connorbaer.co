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
	),
	'.dev' => array(
		'devMode' => true,
		'enableTemplateCaching' => false,
		'testToEmailAddress' => 'connor.baer@me.com',
		'userSessionDuration' => 'P2W',
		'baseUrl' => 'https://connorbaer.dev/',
		'siteUrl' => array(
			'connorbaer' => 'https://connorbaer.dev/',
			'madebyconnor' => 'https://madebyconnor.dev/',
			'madebyconnor_de' => 'https://madebyconnor-de.dev/',
		),
	),
	'connorbaer' => array(
		'baseUrl' => 'https://connorbaer.co/',
		'siteUrl' => array(
			'connorbaer' => 'https://connorbaer.co/',
		),
	),
	'madebyconnor' => array(
		'baseUrl' => 'https://connorbaer.co/',
		'siteUrl' => array(
			'madebyconnor' => 'https://madebyconnor.co/',
			'madebyconnor_de' => 'https://madebyconnor.de/',
		),
	),
];
