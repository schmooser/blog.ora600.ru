for file in *.markdown; do
    git mv "$file" "`basename $file .markdown`.md"
done
