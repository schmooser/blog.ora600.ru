DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rm $DIR/main.css
sass $DIR/main.scss > $DIR/main.css
