#!/bin/sh

set -o errexit

output() {
    echo "\033[1;35m${1}\033[0m"
}

error() {
    echo "\033[1;31m${1}\033[0m"
}

# --

url="?"

while getopts i:u: o; do
    case $o in
        (i) image=$OPTARG ;;
        (u) url=$OPTARG ;;
    esac
done

shift "$((OPTIND - 1))"

if [[ -z $image ]]; then
    error "Validation error!"
    echo "Container image was not provided"
    exit 1
fi

# todo: add k8s deployment

echo ""
output "Deployed image [$image] to $url"
