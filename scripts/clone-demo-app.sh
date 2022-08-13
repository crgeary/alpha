#!/bin/sh

if [[ -z $1 ]]; then
    echo "Error: You must supply an application name as \$1"
    exit 1
fi

if [ ! -d ".git" ]; then
    echo "Error: You must be at the monorepo root"
    exit 1
fi

appName=$(echo $1 | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z)

if [ -d "apps/$appName" ]; then
    echo "Error: Application [$appName] already exits at apps/$appName"
    exit 1
fi

echo "Copying [apps/demo] to [apps/$1] ..."
rsync -av \
    --exclude='node_modules' \
    --exclude='.turbo' \
    --exclude='tsconfig.tsbuildinfo' \
    ./apps/demo/ ./apps/$appName

echo "Replacing references to [demo] with [$appName] ..."
find ./apps/$appName -type f -print0 | xargs -0 sed -i '' "s/demo/$appName/g"

echo "Complete!"
