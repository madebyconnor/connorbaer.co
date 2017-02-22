<?php
ignore_user_abort( true );
set_time_limit( 0 );

$repo          = '/srv/users/serverpilot/apps/madebyconnor';
$branch        = 'master';
$output        = array();

// Log the date and time.
$output[] = date( 'Y-m-d, H:i:s', time() ) . "\n";
// Update the repo.
$output[] = "GitHub Pull\n============================\n" . shell_exec( 'cd ' . $repo . ' && git pull origin ' . $branch ) . "\n";
// Update dependencies.
$output[] = "Composer Update\n============================\n" . shell_exec( 'cd ' . $repo . ' && composer update' );

// Redirect output to logs.
file_put_contents( rtrim( getcwd(), '/' ) . '/github-log.txt', implode( "\n", $output ) . "\n----------------------------\n", FILE_APPEND );
