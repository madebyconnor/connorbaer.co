<?php
/**
 * Craft web bootstrap file
 */

// Project root path.
$root = dirname( __DIR__ );

// Composer autoloader.
require_once $root . '/vendor/autoload.php';

// dotenv?
if ( file_exists( $root . '/.env' ) ) {
	$dotenv = new Dotenv\Dotenv( $root );
	$dotenv->load();
}

// Craft.
define( 'CRAFT_BASE_PATH', $root );

// Get the site domain (without the domain extension).
$site_handle = current( explode( '.', $_SERVER['HTTP_HOST'] ) );

// Tell Craft to use the domain as the site name.
define( 'CRAFT_SITE', $site_handle );

/* ?> <h1><?php echo $site_handle; ?></h1><?php */

$app = require $root . '/vendor/craftcms/cms/bootstrap/web.php';
$app->run();
