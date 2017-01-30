#!/bin/bash

# Craft-Install
# @author    connor-baer
# @copyright Copyright (c) 2017 connor-baer
# @link      https://connorbaer.co/
# @package   craft-install
# @since     1.0.2
# @license   MIT

cd ..

# Download and unzip the latest CraftCMS
mkdir craft-install
cd craft-install/
wget -O craft-install/latest.zip https://craftcms.com/latest.zip?accept_license=yes
unzip latest.zip

cd ..

# Move folders into place
mv craft-install/craft/app/ craft/app/
mv craft-install/craft/storage/ craft/storage/
mv craft-install/craft/config/db.php craft/config/db.php

# Clean up
rm -rf craft-install

./scripts/set_perms.sh
