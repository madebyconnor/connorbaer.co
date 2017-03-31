#!/bin/bash

# Sync Backups to Dropbox
#
# Sync local backups to a Dropbox account
#
# @author    nystudio107
# @copyright Copyright (c) 2017 nystudio107
# @link      https://nystudio107.com/
# @package   craft-scripts
# @since     1.1.2
# @license   MIT

# Get the directory of the currently executing script
DIR="$(dirname "${BASH_SOURCE[0]}")"

# Include files
INCLUDE_FILES=(
            "common/defaults.sh"
            ".env.sh"
            "common/common_env.sh"
            )
for INCLUDE_FILE in "${INCLUDE_FILES[@]}"
do
    if [ -f "${DIR}/${INCLUDE_FILE}" ]
    then
        source "${DIR}/${INCLUDE_FILE}"
    else
        echo 'File "${DIR}/${INCLUDE_FILE}" is missing, aborting.'
        exit 1
    fi
done

# Make sure the local backup directory exists
if [[ ! -d "${LOCAL_BACKUPS_PATH}" ]] ; then
    echo "Creating backup directory ${LOCAL_BACKUPS_PATH}"
    mkdir -p "${LOCAL_BACKUPS_PATH}"
fi

# Wipe the Dropbox backup directory
dbxcli rm -f ${REMOTE_DROPBOX_PATH}
dbxcli mkdir ${REMOTE_DROPBOX_PATH}

# Sync the local backups to the Dropbox backup directory
for FILE in ${LOCAL_BACKUPS_PATH}*
    do
        dbxcli put ${FILE} ${REMOTE_DROPBOX_PATH}
    done

echo "*** Synced backups to ${REMOTE_DROPBOX_PATH}"

# Normal exit
exit 0
