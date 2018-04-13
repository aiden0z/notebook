#!/bin/bash
set -e

if (( $# != 1 )); then
    echo "invalid parameters"
    exit 1
fi

SRC_JS="notebook/static/shiyanlou/js/main.js"
SRC_CSS="notebook/static/shiyanlou/css/notebook.css"

[[ ! -f ${SRC_JS} ]] && SRC_JS="../${SRC_JS}"
[[ ! -f ${SRC_CSS} ]] && SRC_CSS="../${SRC_CSS}"

if [[ ! -f ${SRC_JS} ]]; then
    echo "source file do not exist!"
    exit 1
fi

# force sync css
qshell fput $1 jupyter/shiyanlou-notebook.css ${SRC_CSS} true
# force sync javascript
qshell fput $1 jupyter/shiyanlou-notebook.js ${SRC_JS} true

REFRESH_DIR_FILE=$(mktemp)
cat >  ${REFRESH_DIR_FILE} <<EOL
https://static.shiyanlou.com/jupyter/
EOL

# refresh cdn url
qshell cdnrefresh -dirs ${REFRESH_DIR_FILE}

rm -rf $REFRESH_DIR_FILE
