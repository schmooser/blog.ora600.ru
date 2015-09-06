SRC_DIR=~/Projects/ora600.ru
TARGET_DIR=~/Sites/ora600.ru

/bin/rm -rf ${TARGET_DIR:-"NULL"}/*

hugo --source=$SRC_DIR --destination=$TARGET_DIR

if [ $? != 0 ]; then
    exit 1
fi

cd $TARGET_DIR

if [ -z "$(git status --porcelain)" ]; then
    # working directory clean
    exit 0
else
    # uncommited changes
    git add --all .
    git commit -m "Site generated at `date +\"%Y-%m-%d %H:%M:%S\"`"
    git push origin gh-pages
fi
