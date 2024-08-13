#!/bin/sh

PUBLIC_DIR=/usr/share/nginx/html
ENV_HASH=$(env | grep ^VITE_ | md5sum | head -c3)

# Replace all VITE_ variables in JS and CSS files
for var in $(env | grep ^VITE_);
do
    # Separate key and value
    key=$(echo $var | cut -d '=' -f 1)
    value=$(echo $var | cut -d '=' -f 2-)

    # Find and replace all occurrences of the variable in JS and CSS files
    find $PUBLIC_DIR -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|__P_VAR__${key}__P_VAR__|${value}|g" '{}' +
done

# Rename all JS and CSS files with hash of environment variables
for file in $(find $PUBLIC_DIR -type f \( -name '*.js' -o -name '*.css' \));
do
    # Separate directory and filename
    dir=$(dirname $file)
    old_filename=$(basename $file)

    # Separate filename and extension
    ext="${old_filename##*.}"
    name="${old_filename%.*}"

    # Append hash to filename
    new_filename="${name}${ENV_HASH}.${ext}"
    mv $file $dir/$new_filename

    # Replace old filename with new filename in all HTML files
    find $PUBLIC_DIR -type f -name '*.html' -exec sed -i "s|${old_filename}|${new_filename}|g" '{}' +
done
